const router = require("express").Router();
const model0 = require("../models/Auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secrets = require("../secrets");

router.post("/admin/add-code", (req, res) => {
    const rounds = process.env.HASH_ROUNDS || 14;
    const hash = bcrypt.hashSync(req.body.Code, rounds);
    const encryptedCode = hash;

    model0.addCode({Code: encryptedCode, Email: req.body.Email})
    .then((response)=> {
        res.status(200).json(response)
    })
    .catch((err)=> {
        res.status(400).json(err)
    })
})

router.post("/admin/check-code/:companyUrl/:companyID", async (req, res) => {
    model0.getCodeInfo(req.body.Email)
    .then((response0)=> {
        if (bcrypt.compareSync(req.body.Code, response0[0].Code)) {
            res.status(200).json({auth: true, token: generateToken(-1, req.params.companyID, true)})
        } else {
            res.status(400).json({auth: false})
        }
    })
    .catch((err)=> res.status(400).json(err))
})

router.delete("/admin/delete-code", (req, res) => {
    model0.getCodeInfo(req.body.Email)
    .then((response0)=> {
        if (bcrypt.compareSync(req.body.Code, response0[0].Code)) {
            model0.deleteCode(req.body.Email)
            .then((response1)=> {
                res.status(200).json(response1)
            })
        } else {
            res.status(400).json("Invalid code")
        }
    })
    .catch((err)=> res.status(400).json(err))
})

module.exports = router

function generateToken(user, company, admin) {
    const payload = {
      UserID: user,
      CompanyID: company
    };
    const secret = secrets.jwtSecret;
    let options = {expiresIn: ""}
    if (admin) {
      options.expiresIn = "5h"
    } else {
      options.expiresIn = "5d"
    }
    return jwt.sign(payload, secret, options);
  }