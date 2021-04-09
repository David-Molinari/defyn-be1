const db = require("../database/dbConfig.js");

module.exports = {
  create,
  read,
  readStripeIDByEmail,
  update,
  del
};

function create(insert) {
    return db("Companies").insert(insert);
}

function read(insert) {
    return db("Companies").select("*").where("URL", insert);
}

function readStripeIDByEmail(insert) {
    console.log(insert)
    return db("Companies").select("StripeID").where("Email", insert);
}

function update(insert) {
    return db("Companies").insert(insert).where("id", insert);
}

function del(insert) {
    return db("Companies").del().where("id", insert);
}