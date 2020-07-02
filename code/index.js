const express = require('express');
const bcrypt = require('bcrypt');
const path = require('path');
const mysql = require('mysql')
const bodyParser = require("body-parser");
const passport = require('passport');
const expressSession = require('express-session');
const LocalStrategy = require('passport-local').Strategy;


const app = express();

const settings = require("./settings")

const port = process.env.PORT || 1234;

// connect to the mysql db
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'serverQueryManager',
  password: require("./data/serverQueryManagerPass"),
  database: 'cybervolunteers'
})
connection.connect()

//passport
passport.use(new LocalStrategy({usernameField: 'email'},function(email, password, done) {
  const badCredentialsMessage = "We could not find a user with this username and password.";

  // find the password hash by the email
  connection.query('SELECT * FROM `volunteers` WHERE `email`=?;', [email], function(err, results, fields){
    if(err) return done(err);

    if(results.length == 0){
      //compare a dummy password to prevent timing attacks
      bcrypt.compare("a dummy password", "$2b$12$6VcZHuw9wxuspyuTio3Yd.E1Il2rwwGzzRDiaffcucukfvNW7r4rC", function(err, result) {
        if(err) return done(err);
        // has not been verified
        return done(null, false, {message: badCredentialsMessage});
      });
    }else if (results.length == 1){
      bcrypt.compare(password, results[0].passwordHash, function(err, result) {
        if (err) return done(err);

        if(result === true){
          //log in
          // TODO: serialise and de-serialise
          return done(null, results[0]);
        }else{
          //has not been authenticated
          return done(null, false, {message: badCredentialsMessage});
        }
      });
    }
  });
}));

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
  console.log(user);
  done(null, user.id); 
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
  connection.query('SELECT * FROM `volunteers` WHERE `id`=?;', [id], function(err, results, fields){
    if(err) return done(err);
    console.log(results);
    //TODO: cache?
    done(err, results[0]);
  });
});





// connections
app.set("views", path.join(__dirname, 'public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(require('cookie-parser')());
app.use(expressSession({
  secret: require("./data/cookieSecret"),
  resave: false,//TODO: should i change this one?
  saveUninitialized: true//TODO: should i change this one?
})); // TODO: research the params, esp. maxAge
app.use(passport.initialize());
app.use(passport.session());

// public pages

//sign up post
app.post("/signup", function(req, res, next){
  // TODO: checks
  //check if any of the required fields are missing
  const requiredFields = [req.body.firstName, req.body.lastName, req.body.email, req.body.password, req.body.gender, req.body.salutation, req.body.nationality, req.body.address, req.body.postcode, req.body.city, req.body.country, req.body.phoneNumber];
  for(let i = 0; i < requiredFields.length; i++){
    if(!(typeof requiredFields[i] === 'string' || requiredFields[i] instanceof String)){
      //one of the feilds is not a string
      res.statusMessage = "You have not filled in all the required fields";
      return res.status(400).end();
    }
  }

  // check if the email is already used
  connection.query('SELECT `email` FROM `volunteers` WHERE `email`=?;', [req.body.email], function(err, results, fields){
    if (err) return next(err);

    // if email is already used
    if(results.length != 0){
      res.statusMessage = "This email is already used";
      return res.status(400).end();
    }
    bcrypt.hash(req.body.password, settings.bcryptRounds, function(err, hash) {
      if (err) return next(err);
      // Store hash in your password DB.
      // TODO: insert more values
      connection.query('INSERT INTO `volunteers`(firstName, lastName, email, passwordHash, gender, salutation, nationality, address, postcode, city, country, phoneNumber) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', [req.body.firstName, req.body.lastName, req.body.email, hash, req.body.gender, req.body.salutation, req.body.nationality, req.body.address, req.body.postcode, req.body.city, req.body.country, req.body.phoneNumber], function (err, results, fields) {
        if (err) return next(err);
        return res.sendStatus(200);
      });
    });
  });
})

// TODO: check if already logged in
app.post("/login", function(req, res, next){
  passport.authenticate('local', (err, user, info) => {
    if(info){
      res.statusMessage = info.message;
      return res.status(400).end();
    }
    if(err) return next(err);
    // TODO: if (!user) { return res.redirect('/login'); }
    req.login(user, (err) => {
      if (err) return next(err);
      return res.sendStatus(200);
    })

  })(req, res, next);
})

// TODO: do not serve html here, serve it depending on whether the page is private or public
app.use(express.static(path.join(__dirname, 'public'))); // to serve js, html, css

// private pages and requests

//redirect to login if not authenticated
// app.use(function(req, res, next){
//   // let through if authenticated
//   if (req.isAuthenticated()) return next();
//   // if ajax, set send error code
//   if (req.xhr) {
//     return res.sendStatus(401).end();
//   }
//   // otherwise, return login page code
//   return res.redirect("/login");
// });

// TODO: logout function
// TODO: do not send the error message to the client

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));