# CyberVolunteers.org.uk website v1
This is the first version of the code and the web pages for the [CyberVolunteers](http://cybervolunteers.org.uk/) website. The latest version of the website can be found [here](https://github.com/CyberVolunteers/Website-v2).

CyberVolunteers was a project aimed at connecting lesser-known charities with the enthusiastic volunteers.

## The software used
- Node.js
- Express.js
- Handlebars (for templating, mainly to include csrf tokens in the page)
- JQuery
- MySql

## The folder structure
The `code/` folder contains all the main code. The `popCornWebsite/` folder contains some react files that have been copied over to replace some of the pages to give them a new look.

## Running the code
Run `npm i` in the `code` folder to install the dependencies. 
Make sure that MySql has been installed. There should be a user called `serverQueryManager` with a password copied to `./data/serverQueryManagerPass`. We called the database `cybervolunteers`.
Unfortunately, you will have to set up the database schema yourself (we no longer have the backups of this old schema).
After that, start the server with `node index.js` or `nodemon index.js` if you want to live-refresh the code as you are editing it.
