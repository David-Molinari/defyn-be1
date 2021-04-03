const db = require("../database/dbConfig.js");

module.exports = {
  create,
  readAvailable,
  readBooked,
  readByID,
  update,
  del
};

function create(insert) {
    return db("Meetings").insert(insert);
}

function readAvailable(insert) {
    return db("Meetings").select("*").where("Company", insert).andWhere("LeadEmail", "");
}

function readBooked(insert) {
    return db("Meetings").select("*").where("Company", insert).andWhereNot("LeadEmail", "");;
}

function readByID(insert) {
    return db("Meetings").select("*").where("id", insert)
}

function update(insert) {
    return db("Meetings").update(insert.update).where("id", insert.id);
}

function del(insert) {
    return db("Meetings").del().where("id", insert);
}