const router = require("express").Router();
const model0 = require("../models/UsersVideos.js");
const model1 = require("../models/Videos.js");
const secrets = require("../secrets");


router.get("/:company/:user", (req, res) => {
    model0.readBought({
        Company: req.params.company, 
        User: req.params.user
    })
    .then((response) => {
        res.json(response)
    })
    .catch((err) => res.send(err))
})

router.post("/:company/:token", (req, res) => {
    model1.readByNameCompany({Name: req.body.Video, Company: req.params.company})
    .then((response0)=> {
        jwt.verify(req.params.token, secrets.jwtSecret, (error, decodedToken) => {
            if (error) {
                res.status(200).json({ error: error, loggedIn: false });
              } else {
                model0.create({
                    Video: response0.id, 
                    User: decodedToken.UserID
                })
                .then((response) => {
                    res.json(response)
                })
                .catch((err) => res.send(err))
              }
        })
    })
    .catch((err) => res.send(err))
})

module.exports = router;