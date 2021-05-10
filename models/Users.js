const db = require("../database/dbConfig.js");

module.exports = {
  find,
  add,
  del
};

function find(insert) {
    return db("Users").where(insert).select("*");
}

function add(insert) {
    return db("Users").insert(insert);
}

function del(insert) {
    return db("Users").where("id", insert).del();
}