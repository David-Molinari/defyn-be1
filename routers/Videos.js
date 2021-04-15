const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secrets = require("../secrets");

const model = require("../models/Videos");

router.post("/:token", (req, res) => {
    jwt.verify(req.params.token, secrets.jwtSecret, (error) => {
        if (error) {
          res.status(401).json({ message: "you cannot pass!" });
        } else {
            model.create(req.body)
            .then((response) => {
                res.status(200).json(response)
            })
            .catch((err) => res.send(err))
        }
      });
})

router.get("/:Company", (req, res) => {
    model.read(req.params.Company)
        .then((response) => {
            res.json(response);
        })
        .catch((err) => res.send(err));
});

router.get("/options/:Company/:allOptions/:Type", (req, res) => {
    model.read(req.params.Company)
    .then((response) => {
        let vidOptions = []
            if (req.params.allOptions == "false") {
                response.forEach((vid) => {
                    vidOptions.push({label: vid.Name, rating: 'not safe', value: vid.Name}) 
                })
                vidOptions[0].rating = 'safe'
            } else {
                response.forEach((vid) => {
                    vidOptions.push({label: vid.Name, rating: 'safe', value: vid.Name})
                })
            }
        res.json(vidOptions)
    })
    .catch((err) => res.send(err));
});

router.get("/options/admin/:Company", (req, res) => {
    model.read(req.params.Company)
    .then((response) => {
        let vidOptions = [{label: "Add video", rating: 'safe', value: "Add video"}]
        response.forEach((vid) => {
            vidOptions.push({label: vid.Name, rating: 'safe', value: vid.Name})
        })
        res.json(vidOptions)
    })
    .catch((err) => res.send(err));
});

router.patch("/:token", (req, res) => {
    jwt.verify(req.params.token, secrets.jwtSecret, (error) => {
        if (error) {
          res.status(401).json({ message: "you cannot pass!" });
        } else {
            model.update(req.body)
            .then((response) => {
                res.status(200).json(response);
            })
            .catch((err) => res.send(err));
        }
      });
  });

router.delete("/:token/:Name/:id", (req, res) => {
    jwt.verify(req.params.token, secrets.jwtSecret, (error) => {
        if (error) {
          res.status(401).json({ message: "you cannot pass!" });
        } else {
            model.del({Name: req.params.Name, id: req.params.id})
            .then((response) => {
                res.json(response)
            })
            .catch((err) => res.send(err))
        }
      });
})

module.exports = router;
