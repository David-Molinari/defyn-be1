const router = require("express").Router();
const model = require("../models/Users");
const jwt = require("jsonwebtoken");
const secrets = require("../secrets")

router.post("/checkifli", (req, res) => {
    const token = req.headers.authorization;
    const secret = secrets.jwtSecret;
  
    if (token) {
      jwt.verify(token, secret, (error, decodedToken) => {
        if (error) {
          res.status(200).json({ error: error, loggedIn: false });
        } else {
            res.status(200).json({ loggedIn: true, decodedToken: decodedToken })
        }
      });
    } else {
      res.status(200).json({ loggedIn: false });
    }
})

router.post("/", (req, res) => {
  model.add(req.body)
  .then((response)=> {
    res.status(200).json(response)
  })
  .catch((err)=> res.status(400).json(err))
})

module.exports = router;