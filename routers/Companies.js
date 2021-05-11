const router = require("express").Router();
const model = require("../models/Companies");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secrets = require("../secrets");

router.post("/", (req, res) => {
    model.create(req.body)
        .then((response) => {
            res.status(200).json(response)
        })
        .catch((err) => res.send(err))
})

router.get("/:URL", (req, res) => {
    model.read(req.params.URL)
        .then((response) => {
            res.json(response);
        })
        .catch((err) => res.send(err));
});

router.patch("/", (req, res) => {
    model.update(req.body)
      .then((response) => {
          res.json(response);
      })
      .catch((err) => res.send(err));
  });

router.delete("/", (req, res) => {
    model.del(req.body)
        .then((response) => {
            res.json(response)
        })
        .catch((err) => res.send(err))
})

router.post("/admin/add-code", (req, res) => {
    const rounds = process.env.HASH_ROUNDS || 14;
    const hash = bcrypt.hashSync(req.body.Code, rounds);
    const encryptedCode = hash;

    model.addCode({Code: encryptedCode, Email: req.body.Email})
    .then((response)=> {
        res.status(200).json(response)
    })
    .catch((err)=> {
        res.status(400).json(err)
    })
})

router.post("/admin/check-code/:companyUrl/:companyID", (req, res) => {
    model.getCodeInfo(req.body.Email)
    .then((response0)=> {
        if (bcrypt.compareSync(req.body.Code, response0[0].Code)) {
            res.status(200).json({auth: true, token: generateToken(req.params.companyID)})
        } else {
            res.status(400).json({auth: false})
        }
    })
    .catch((err)=> res.status(400).json(err))
})

router.delete("/admin/delete-code", (req, res) => {
    model.getCodeInfo(req.body.Email)
    .then((response0)=> {
        if (bcrypt.compareSync(req.body.Code, response0[0].Code)) {
            model.deleteCode(req.body.Email)
            .then((response1)=> {
                res.status(200).json(response1)
            })
        } else {
            res.status(400).json("Invalid code")
        }
    })
    .catch((err)=> res.status(400).json(err))
})

module.exports = router;

function generateToken(company) {
    const payload = {
      CompanyID: company
    };
    const secret = secrets.jwtSecret;
    let options = {expiresIn: ""}
    options.expiresIn = "5h"
    return jwt.sign(payload, secret, options);
  }