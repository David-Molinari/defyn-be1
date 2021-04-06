const db = require("../database/dbConfig.js");

module.exports = {
  add,
  checkAttempt,
  setAsLoggedIn,
  setAttemptExpired
};

function add(insert) {
    return db("Logins").insert(insert);
}

function checkAttempt(insert) {
    return db("Logins").where("id", insert).select("StartTime", "User");
}

function setAsLoggedIn(insert) {
    console.log(Date(), typeof Date())
    return db("Logins").where("id", insert).insert("StartTime", Date())
}

function setAttemptExpired(insert) {
    return db("Logins").where("id", insert).update("StartTime", "expired")
}