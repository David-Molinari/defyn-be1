const router = require("express").Router();

const { response } = require("express");
const model = require("../models/UsersVideos.js");

router.get("/:company/:user", (req, res) => {
    model.readBought({
        Company = req.params.company, 
        User = req.params.user
    })
    .then((response) => {
        res.json(response)
    })
    .catch((err) => res.send(err))
})

module.exports = router;