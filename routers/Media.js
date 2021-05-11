const router = require("express").Router();
const jwt = require("jsonwebtoken");
const secrets = require("../secrets");
const model0 = require("../models/Media");

router.post("/", (req, res) => {
    jwt.verify(req.headers.authorization, secrets.jwtSecret, (error) => {
        if (error) {
          res.status(401).json({ message: "you cannot pass!" });
        } else {
            model0.create(req.body.form)
            .then((response0) => {
                res.status(200).json({id: response0})
            })
            .catch((err) => res.send(err))
        }
      });
})

router.get("/:Company", (req, res) => {
    model0.read(req.params.Company)
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((err) => res.send(err));
});

router.get("/options/not-admin/:Company", (req, res) => {
    model0.read(req.params.Company)
    .then((response1) => {
        let medOptions0 = []
        response1.forEach((med) => {
            medOptions0.push({label: med.Name, rating: 'safe', value: med.Name})
        })
        res.status(200).json(medOptions0)
    })
    .catch((err) => res.send(err));
});

router.get("/options/admin/:Company", (req, res) => {
    model0.read(req.params.Company)
    .then((response1) => {
        let medOptions0 = []
        response1.forEach((med) => {
            medOptions0.push({label: med.Name, rating: 'safe', value: med.Name})
        })
        medOptions0.push({label: "Add audio", rating: 'safe', value: "Add audio"})
        res.status(200).json(medOptions0)
    })
    .catch((err) => res.send(err));
});

router.patch("/:company", (req, res) => {
    jwt.verify(req.headers.authorization, secrets.jwtSecret, (error) => {
        if (error) {
          res.status(401).json({ message: "you cannot pass!" });
        } else {
            model0.update(req.body.form)
            .then((response) => {
                res.status(200).json(response);
            })
            .catch((err) => res.send(err));
        }
    })
  });

router.delete("/:mediaID/:company", (req, res) => {
    jwt.verify(req.headers.authorization, secrets.jwtSecret, (error) => {
        if (error) {
          res.status(401).json({ message: "you cannot pass!" });
        } else {
            model0.del({id: req.params.mediaID})
            .then((response0) => {
                res.status(200).json(response0)
            })
            .catch((err) => res.send(err))
        }
    });
})

module.exports = router;