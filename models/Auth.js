const db = require("../database/dbConfig.js");

module.exports = {
  add,
  checkAttempt,
  setAsLoggedIn,
  setAttemptExpired,
  addCode,
  getCodeInfo,
  deleteCode
};

function add(insert) {
    return db("Logins").insert(insert);
}

function checkAttempt(insert) {
    return db("Logins").where("id", insert).select("StartTime", "User");
}

function setAsLoggedIn(insert) {
    return db("Logins").where("id", insert).update("StartTime", Date.now().toString());
}

function setAttemptExpired(insert) {
    return db("Logins").where("id", insert).update("StartTime", "expired");
}

function addCode(insert) {
    return db("Codes").insert(insert);
}

function getCodeInfo(insert) {
    return db("Codes").select("*").where("Codes.Email", insert)
}

function deleteCode(insert) {
    return db("Codes").where("Codes.Email", insert).delete();
}