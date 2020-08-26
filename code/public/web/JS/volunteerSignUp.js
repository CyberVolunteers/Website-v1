$(function(){
    const csrfToken = $("meta[name=\"csrf-token\"]").attr("content");

    $("form").submit(function(){
        const options = {
            email: $("#username").val(),
            password: $("#password").val(),
            gender: $("#gender").val(),
            salutation: $("#Sal").val(),
            firstName: $("#fname").val(),
            lastName: $("#lname").val(),
            phoneNumber: $("#num").val(),
            nationality: $("#nation").val(),
            occupation: $("#occ").val(),
            address: $("#address").val(),
            postcode: $("#pc").val(),
            birthDate: $("#bday").val(),
            country: $("#country").val(),
            city: $("#city").val(),
            state: $("#state").val(),
            languages: $("#lang").val(),
            skillsAndInterests: $("#subject").val(),
            linkedIn: $("#linkedIn").val(),
            isVolunteer: true,

            _csrf: csrfToken
        };

        //checks
        
        $.post("/signup", options)
		.done(function(data, textStatus){
			window.location.href = `${window.location.protocol}//${window.location.host}/formComplete`;
		})
		.fail(function(jqXHR){
            let errorText = jqXHR.statusText;
            $(".errorMessage").text(errorText);
            $(".errorMessage").show(500);
        });
        
        return false;
    })
})