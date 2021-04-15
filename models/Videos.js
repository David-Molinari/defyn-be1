const db = require("../database/dbConfig.js");

module.exports = {
  create,
  read,
  update,
  del
};

function create(insert) {
    return db("Videos").insert(insert);
}

function read(insert) {
    return db("Videos").select("*").where("Company", insert);
}

function update(insert) {
    return db("Videos").update(insert).where("id", insert.id);
}

function del(insert) {
    return db("Videos").del().where({id: insert.id, Name: insert.Name});
}