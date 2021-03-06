const router = require("express").Router();
const jwt = require("jsonwebtoken");
const secrets = require("../secrets");
const model0 = require("../models/Media");

router.post("/", (req, res) => {
    jwt.verify(req.headers.authorization, 
        secrets.jwtSecret, (error) => {
        if (error) {
          res.status(401).json({ 
              message: "you cannot pass!" });
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
            medOptions0.push({label: med.Name, 
                rating: 'safe', value: med.Name})
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
            medOptions0.push({label: med.Name, 
                rating: 'safe', value: med.Name})
        })
        medOptions0.push({label: "Add audio", 
            rating: 'safe', value: "Add audio"})
        res.status(200).json(medOptions0)
    })
    .catch((err) => res.send(err));
});

router.get("/opens/:mediaID", (req, res) => {
    model0.readByID(req.params.mediaID)
    .then((response)=> {
        if (response[0].Opens == null) {
            res.status(200).send("0,0")
        }
        let opensArr = response[0].Opens.split(',')
        let opensByIp = {}
        opensArr.forEach((open)=> {
            let ip = open.slice(0, open.indexOf(" "))
            if (typeof opensByIp[ip] == Number) {
                    opensByIp[ip] = opensByIp[ip]++
            } else {
                if (ip.length > 4) {
                    opensByIp[ip] = 1
                }
            }
        })
        let numOfIps = Object.keys(opensByIp).length
        let totalOpens = opensArr.length - 1
        res.status(200).send(`${numOfIps},${totalOpens}`)
    })
    .catch((err)=> err)
})

router.patch("/:company", (req, res) => {
    jwt.verify(req.headers.authorization, 
        secrets.jwtSecret, (error) => {
        if (error) {
          res.status(401).json({ 
              message: "you cannot pass!" });
        } else {
            model0.update(req.body.form)
            .then((response) => {
                res.status(200).json(response);
            })
            .catch((err) => res.send(err));
        }
    })
  });

router.patch("/add-open/:mediaID", (req, res) => {
    model0.readByID(req.params.mediaID)
    .then((response) => {
        let opens = `${response[0].Opens},${req.body.ipDate}`
        model0.update({id: req.params.mediaID, Opens: opens})
        .then(() => {
            res.status(200).send({message: 'success'})
        })
        .catch((err) => res.send(err));
    })
    .catch((err) => res.send(err));
})

router.delete("/:mediaID/:company", (req, res) => {
    jwt.verify(req.headers.authorization, 
        secrets.jwtSecret, (error) => {
        if (error) {
          res.status(401).json({ 
              message: "you cannot pass!" });
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