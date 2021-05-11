const db = require("../database/dbConfig.js");

module.exports = {
  create,
  read,
  readByID,
  del,
  getCodeInfo,
  deleteCode
};

function create(insert) {
    return db("Companies").insert(insert);
}

function read(insert) {
    return db("Companies").select("*").where("URL", insert);
}

function readByID(insert) {
    return db("Companies").select("*").where("id", insert);
}

function del(insert) {
    return db("Companies").del().where("id", insert);
}

function getCodeInfo(insert) {
    return db("Companies").select("*").where("Email", insert)
}

function deleteCode(insert) {
    return db("Companies").where("Email", insert).update("Code", "");
}