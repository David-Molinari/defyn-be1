const db = require("../database/dbConfig.js");

module.exports = {
  create,
  read,
  readByID,
  readByNameCompany,
  update,
  del
};

function create(insert) {
    return db("Media").insert(insert).returning('id');
}

function read(insert) {
    return db("Media").select("*").where("Company", insert);
}

function readByID(insert) {
    return db("Media").select("*").where("id", insert);
}

function readByNameCompany(insert) {
    return db("Media").select("*").where("Name", insert.Name).andWhere("Company", insert.Company);
}

function update(insert) {
    return db("Media").update(insert).where("id", insert.id);
}

function del(insert) {
    return db("Media").del().where("id", insert.id);
}