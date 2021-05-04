const db = require("../database/dbConfig.js");

module.exports = {
  create,
  read,
  readByID,
  readStripeIDByEmail,
  readOrder,
  update,
  updateOrder,
  del
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

function readStripeIDByEmail(insert) {
    return db("Companies").select("StripeID").where("Email", insert);
}

function readOrder(insert) {
    return db("Companies").select("Order").where("id", insert)
}

function update(insert) {
    return db("Companies").update("StripeID", insert.id).where("Email", insert.email);
}

function updateOrder(insert) {
    return db("Companies").update("Order", insert.voUpdated).where("id", insert.company);
}

function del(insert) {
    return db("Companies").del().where("id", insert);
}