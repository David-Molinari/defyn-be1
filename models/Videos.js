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
    return db("Videos").insert(insert);
}

function read(insert) {
    return db("Videos").select("*").where("Company", insert);
}

function readByID(insert) {
    return db("Videos").select("*").where("id", insert);
}

function readByNameCompany(insert) {
    return db("Videos").select("*").where("Name", insert.Name).andWhere("Company", insert.Company);
}

function update(insert) {
    return db("Videos").update(insert).where("id", insert.id);
}

function del(insert) {
    return db("Videos").del().where({id: insert.id, Name: insert.Name});
}