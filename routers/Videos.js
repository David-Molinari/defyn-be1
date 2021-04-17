const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secrets = require("../secrets");

const model0 = require("../models/Videos");
const model1 = require("../models/Companies")

router.post("/:token", (req, res) => {
    jwt.verify(req.params.token, secrets.jwtSecret, (error) => {
        if (error) {
          res.status(401).json({ message: "you cannot pass!" });
        } else {
            model0.create(req.body)
            .then((response) => {
                res.status(200).json(response)
            })
            .catch((err) => res.send(err))
        }
      });
})



router.get("/:Company", (req, res) => {
    model0.read(req.params.Company)
        .then((response) => {
            res.json(response);
        })
        .catch((err) => res.send(err));
});

router.get("/options/:Company/:allOptions/:Type", (req, res) => {
    model1.readVideoOrder(req.params.Company)
    .then((response0)=> {
        let VideoOrder = response0[0].VideoOrder
        model0.read(req.params.Company)
        .then((response1) => {
            let vidOptions0 = {}
            let vidOptions1 = []
            for (let i = 0; i < VideoOrder.length; i++) {
                if (VideoOrder[i-1] === " ") {
                    let VOSlice = VideoOrder.slice(i)
                    let VONum = VOSlice.slice(0, VOSlice.search(" "))
                    vidOptions0[VONum] = ""
                } 
            }
            if (req.params.allOptions == "false") {
                response1.forEach((vid) => {
                    vidOptions0[vid.id.toString()] = vid.Name
                })
                vidOptions0.values(vidOptions0).forEach((value) => {
                    vidOptions1.push({label: value, rating: 'not safe', value: value})
                })
                vidOptions1[0].rating = 'safe'
            } else {
                response1.forEach((vid) => {
                    vidOptions0[vid.id.toString()] = vid.Name
                })
                Object.values(vidOptions0).forEach((value) => {
                    vidOptions1.push({label: value, rating: 'safe', value: value})
                })
            }
            res.json(vidOptions1)
        })
        .catch((err) => res.send(err));
    })
    .catch((err) => res.send(err))
});

router.get("/options/admin/:Company", (req, res) => {
    model1.readVideoOrder(req.params.Company)
    .then((response0)=> {
        let VideoOrder = response0[0].VideoOrder
        model0.read(req.params.Company)
        .then((response1) => {
            let vidOptions0 = {}
            let vidOptions1 = []
            for (let i = 0; i < VideoOrder.length; i++) {
                if (VideoOrder[i-1] === " ") {
                    let VOSlice = VideoOrder.slice(i)
                    let VONum = VOSlice.slice(0, VOSlice.search(" "))
                    vidOptions0[VONum] = ""
                } 
            }
            response1.forEach((vid) => {
                vidOptions0[vid.id.toString()] = vid.Name
            })
            Object.values(vidOptions0).forEach((value) => {
                vidOptions1.push({label: value, rating: 'safe', value: value})
            })
            console.log(vidOptions1)
            res.json(vidOptions1)
        })
        .catch((err) => res.send(err));
    })
});

router.patch("/:token", (req, res) => {
    jwt.verify(req.params.token, secrets.jwtSecret, (error) => {
        if (error) {
          res.status(401).json({ message: "you cannot pass!" });
        } else {
            model0.update(req.body)
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
            model0.del({Name: req.params.Name, id: req.params.id})
            .then((response) => {
                res.json(response)
            })
            .catch((err) => res.send(err))
        }
      });
})

module.exports = router;
