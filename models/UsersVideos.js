const db = require("../database/dbConfig.js");

module.exports = {
  create,
  readBought,
  update,
  del
};

function create() {
    return db("UsersVideos").insert(insert);
}

function readBought(insert) {
    return db("UsersVideos").join("Videos", "UsersVideos.Video", "=", "Videos.id")
        .select("Videos.Name").where("Videos.Company", insert.Company)
        .andWhere("UsersVideos.User", insert.User);
}

function readUnbought(insert) {}

function update(insert) {
    return db("UsersVideos").insert(insert).where("id", insert);
}

function del(insert) {
    return db("UsersVideos").del().where("id", insert);
}