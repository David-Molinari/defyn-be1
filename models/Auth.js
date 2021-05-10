const db = require("../database/dbConfig.js");

module.exports = {
  addCode,
  getCodeInfo,
  deleteCode
};

function addCode(insert) {
    return db("Codes").insert(insert);
}

function getCodeInfo(insert) {
    return db("Codes").select("*").where("Codes.Email", insert)
}

function deleteCode(insert) {
    return db("Codes").where("Codes.Email", insert).delete();
}