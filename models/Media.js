const db = require("../database/dbConfig.js");

module.exports = {
  create,
  read,
  readByID,
  update,
  del
};

function create(insert) {
    return db("Media").insert(insert);
}

function read(insert) {
    return db("Media").select("*").where("Company", insert).orderBy('id', 'desc');
}

function readByID(insert) {
    return db("Media").select("*").where("id", insert);
}

function update(insert) {
    return db("Media").update(insert).where("id", insert.id);
}

function del(insert) {
    return db("Media").del().where("id", parseInt(insert.id));
}