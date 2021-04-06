const db = require("../database/dbConfig.js");

module.exports = {
  find,
  add,
//   changeEm,
//   changePw,
//   changeUn,
//   del
};

function find(insert) {
    return db("Users").where(insert).select("*");
}

function add(insert) {
    return db("Users").insert(insert);
}

// function changeEm(insert) {
//     return db("Users").where({Email: insert.Email, Company: insert.Company})
//         .update({ Email: insert.NewEmail })
// }

// function changePw(insert) {
//     return db("Users").where({Company: insert.Company, Email: insert.Email})
//         .update({ Password: insert.hash })
// }

// function changeUn(insert) {
//     return db("Users").where({Email: insert.Email, Company: insert.Company})
//         .update({ Username: insert.Username })
// }

// function del(insert) {
//     return db("Users").where("id", insert).del();
// }