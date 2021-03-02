const db = require("../database/dbConfig.js");

module.exports = {
  readCompanies,
  readVideos
};

function readCompanies(insert) {
    return db("Companies").select("*").where("URL", insert);
}

function readVideos(insert) {
    return db("Videos").select("*").where("Company", insert);
}