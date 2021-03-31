const db = require("../database/dbConfig.js");

module.exports = {
  create,
  readAvailable,
  readBooked,
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

function update(insert) {
    return db("Meetings").insert(insert).where("id", insert);
}

function del(insert) {
    return db("Meetings").del().where("id", insert);
}