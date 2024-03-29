const validator = require("validator");
const xss = require("xss");

module.exports = class Validator {
  constructor() {}

  applyForListingValidate(params) {
    return this.checkIfUndefinedAndConvertToStrings(params, [
      "volunteerId",
      "listingUUID",
    ]);
  }

  verifyEmailTokenValidate(params) {
    return this.checkIfUndefinedAndConvertToStrings(params, ["uuid", "email"]);
  }

  passwordReset(params) {
    return (
      this.checkIfUndefinedAndConvertToStrings(params, ["email"]) &&
      validator.isEmail(params["email"])
    );
  }

  passwordResetVerify(params) {
    return this.checkIfUndefinedAndConvertToStrings(params, [
      "email",
      "uuid",
      "password",
      "isVolunteer",
    ]);
  }

  passwordResetVerifyPage(params) {
    return this.checkIfUndefinedAndConvertToStrings(params, [
      "email",
      "uuid",
      "isVolunteer",
    ]);
  }

  signUpValidateVolunteer(params) {
    return (
      this.checkIfUndefinedAndConvertToStrings(params, [
        "firstName",
        "lastName",
        "email",
        "password",
        "gender",
        "salutation",
        "nationality",
        "address",
        "postcode",
        "city",
        "country",
        "phoneNumber",
        "languages",
        "skillsAndInterests",
      ]) &&
      this.isSuitableLength(params["firstName"], 30) &&
      this.isSuitableLength(params["lastName"], 30) &&
      this.isSuitableLength(params["email"], 320) &&
      this.isSuitableLength(params["gender"], 1) &&
      this.isSuitableLength(params["salutation"], 5) &&
      this.isSuitableLength(params["nationality"], 56) &&
      this.isSuitableLength(params["address"], 150) &&
      this.isSuitableLength(params["postcode"], 12) &&
      this.isSuitableLength(params["city"], 85) &&
      this.isSuitableLength(params["country"], 56) &&
      this.isSuitableLength(params["phoneNumber"], 16) &&
      this.isSuitableLength(params["occupation"], 30) &&
      this.isSuitableLength(params["state"], 50) &&
      this.isSuitableLength(params["linkedIn"], 75) &&
      this.isSuitableLength(params["languages"], 200) &&
      this.isSuitableLength(params["skillsAndInterests"], 400) &&
      validator.isEmail(params["email"]) &&
      this.filterXSS(params, [
        "firstName",
        "lastName",
        "email",
        "gender",
        "salutation",
        "nationality",
        "address",
        "postcode",
        "city",
        "country",
        "phoneNumber",
        "occupation",
        "state",
        "linkedIn",
        "languages",
        "skillsAndInterests",
      ])
    );
  }

  signUpValidateCharity(params) {
    return (
      this.checkIfUndefinedAndConvertToStrings(params, [
        "email",
        "password",
        "charityType",
        "charityName",
        "charityDesc",
        "phoneNumber",
        "charityLocation",
        "sendHelpEmailsPeopleInGroups",
      ]) &&
      this.isSuitableLength(params["email"], 320) &&
      this.isSuitableLength(params["charityType"], 30) &&
      this.isSuitableLength(params["charityName"], 100) &&
      this.isSuitableLength(params["charityDesc"], 1000) &&
      this.isSuitableLength(params["phoneNumber"], 16) &&
      this.isSuitableLength(params["charityLocation"], 150) &&
      this.isSuitableLength(params["websiteURL"], 50) &&
      (params["websiteURL"] === "" || validator.isURL(params["websiteURL"])) &&
      this.filterXSS(params, [
        "email",
        "password",
        "charityType",
        "charityName",
        "charityDesc",
        "phoneNumber",
        "charityLocation",
        "websiteURL",
      ])
    );
  }

  createListingValidate(params) {
    return (
      this.checkIfUndefinedAndConvertToStrings(params, [
        "timeForVolunteering",
        "placeForVolunteering",
        "targetAudience",
        "skills",
        "requirements",
        "opportunityDesc",
        "opportunityCategory",
        "opportunityTitle",
        "numOfvolunteers",
        "minHoursPerWeek",
        "maxHoursPerWeek",
        "duration",
        "isFlexible",
      ]) &&
      this.isSuitableLength(params["timeForVolunteering"], 200) &&
      this.isSuitableLength(params["placeForVolunteering"], 200) &&
      this.isSuitableLength(params["targetAudience"], 100) &&
      this.isSuitableLength(params["skills"], 1000) &&
      this.isSuitableLength(params["requirements"], 500) &&
      this.isSuitableLength(params["opportunityDesc"], 1250) &&
      this.isSuitableLength(params["opportunityCategory"], 50) &&
      this.isSuitableLength(params["opportunityTitle"], 50) &&
      this.isSuitableLength(params["duration"], 15) &&
      validator.isInt(params["numOfvolunteers"], { min: 0 }) &&
      validator.isFloat(params["minHoursPerWeek"], { min: 0 }) &&
      validator.isFloat(params["maxHoursPerWeek"], { min: 0 }) &&
      parseFloat(params["minHoursPerWeek"]) <=
        parseFloat(params["maxHoursPerWeek"]) &&
      this.filterXSS(params, [
        "timeForVolunteering",
        "placeForVolunteering",
        "targetAudience",
        "skills",
        "requirements",
        "opportunityDesc",
        "opportunityCategory",
        "opportunityTitle",
        "numOfvolunteers",
        "minHoursPerWeek",
        "maxHoursPerWeek",
        "duration",
      ])
    );
  }

  editListingValidate(params) {
    return (
      this.checkIfUndefinedAndConvertToStrings(params, [
        "uuid",
        "timeForVolunteering",
        "placeForVolunteering",
        "targetAudience",
        "skills",
        "requirements",
        "opportunityDesc",
        "opportunityCategory",
        "opportunityTitle",
        "numOfvolunteers",
        "minHoursPerWeek",
        "maxHoursPerWeek",
        "duration",
        "isFlexible",
      ]) &&
      this.isSuitableLength(params["timeForVolunteering"], 200) &&
      this.isSuitableLength(params["placeForVolunteering"], 200) &&
      this.isSuitableLength(params["targetAudience"], 100) &&
      this.isSuitableLength(params["skills"], 1000) &&
      this.isSuitableLength(params["requirements"], 500) &&
      this.isSuitableLength(params["opportunityDesc"], 1250) &&
      this.isSuitableLength(params["opportunityCategory"], 50) &&
      this.isSuitableLength(params["opportunityTitle"], 50) &&
      this.isSuitableLength(params["duration"], 15) &&
      validator.isInt(params["numOfvolunteers"], { min: 0 }) &&
      validator.isFloat(params["minHoursPerWeek"], { min: 0 }) &&
      validator.isFloat(params["maxHoursPerWeek"], { min: 0 }) &&
      parseFloat(params["minHoursPerWeek"]) <=
        parseFloat(params["maxHoursPerWeek"]) &&
      this.filterXSS(params, [
        "timeForVolunteering",
        "placeForVolunteering",
        "targetAudience",
        "skills",
        "requirements",
        "opportunityDesc",
        "opportunityCategory",
        "opportunityTitle",
        "numOfvolunteers",
        "minHoursPerWeek",
        "maxHoursPerWeek",
        "duration",
      ])
    );
  }

  searchListingsValidate(params) {
    return (
      this.checkIfUndefinedAndConvertToStrings(params, ["terms"]) &&
      Array.isArray(params.terms)
    );
  }

  isSuitableLength(string, maxLen) {
    if (string === undefined || string === "") return true;
    return string.length <= maxLen;
  }

  checkIfUndefinedAndConvertToStrings(params, reqParams) {
    for (let i = 0; i < reqParams.length; i++) {
      const param = params[reqParams[i]];
      if (param === undefined || param === "" || param === null) return false;

      //convert to a string
      if (!Array.isArray(param))
        params[reqParams[i]] = params[reqParams[i]] + "";
    }
    return true;
  }

  filterXSS(params, reqParams) {
    for (let i = 0; i < reqParams.length; i++) {
      params[reqParams[i]] = xss(params[reqParams[i]]);
    }

    return true;
  }

  getListingValidate(uuid) {
    return uuid != undefined && validator.isUUID(uuid);
  }
};
