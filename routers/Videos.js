const router = require("express").Router();
const jwt = require("jsonwebtoken");
const secrets = require("../secrets");
const model0 = require("../models/Videos");
const model1 = require("../models/Companies")

router.post("/", (req, res) => {
    jwt.verify(req.headers.authorization, secrets.jwtSecret, (error) => {
        if (error) {
          res.status(401).json({ message: "you cannot pass!" });
        } else {
            model0.create(req.body.form)
            .then((response0) => {
                let videoOrderUpdated = ""
                if (req.body.idAbove === -1) {
                    videoOrderUpdated = req.body.videoOrder + response0[0].toString() + ' '
                } else {
                    for (let i = 0; i < req.body.videoOrder.length; i++) {
                        if (req.body.videoOrder[i-1] === " ") {
                            let VOSlice = req.body.videoOrder.slice(i)
                            let VONum = VOSlice.slice(0, VOSlice.search(" "))
                            if (VONum == req.body.idAbove) {
                                let insert = response0[0].toString() + ' ' + VONum
                                videoOrderUpdated = req.body.videoOrder.slice(0, i) + insert + req.body.videoOrder.slice(i + VONum.length)
                                break
                            }
                        }
                    }
                }
                model1.updateVideoOrder({company: req.body.form.Company, voUpdated: videoOrderUpdated})
                .then((response1)=> {
                    res.status(200).json({id: response0, voUpdated: videoOrderUpdated})
                })
                .catch((err) => res.send(err))
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

router.get("/options/not-admin/:Company/:allOptions", (req, res) => {
    model1.readVideoOrder(req.params.Company)
    .then((response0)=> {
        let VideoOrder = response0[0].VideoOrder
        model0.read(req.params.Company)
        .then((response1) => {
            let vidOptions0 = new Map()
            let vidOptions1 = []
            for (let i = 0; i < VideoOrder.length; i++) {
                if (VideoOrder[i-1] === " ") {
                    let VOSlice = VideoOrder.slice(i)
                    let VONum = VOSlice.slice(0, VOSlice.search(" "))
                    vidOptions0.set(VONum, "")
                } 
            }
            if (req.params.allOptions == "false") {
                response1.forEach((vid) => {
                    vidOptions0.set(vid.id.toString(), vid.Name)
                })
                vidOptions0.forEach((value, key) => {
                    vidOptions1.push({label: value, rating: 'not safe', value: value})
                })
                vidOptions1[0].rating = 'safe'
            } else {
                response1.forEach((vid) => {
                    vidOptions0.set(vid.id.toString(), vid.Name)
                })
                vidOptions0.forEach((value, key) => {
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
            let vidOptions0 = new Map()
            let vidOptions1 = []
            for (let i = 0; i < VideoOrder.length; i++) {
                if (VideoOrder[i-1] === " ") {
                    let VOSlice = VideoOrder.slice(i)
                    let VONum = VOSlice.slice(0, VOSlice.search(" "))
                    vidOptions0.set(VONum, "")
                } 
            }
            response1.forEach((vid) => {
                vidOptions0.set(vid.id.toString(), vid.Name)
            })
            vidOptions0.forEach((value, key) => {
                vidOptions1.push({label: value, rating: 'safe', value: value})
            })
            vidOptions1.push({label: "Add video", rating: 'safe', value: "Add video"})
            res.json(vidOptions1)
        })
        .catch((err) => res.send(err));
    })
});

router.patch("/:company", (req, res) => {
    jwt.verify(req.headers.authorization, secrets.jwtSecret, (error) => {
        if (error) {
          res.status(401).json({ message: "you cannot pass!" });
        } else {
            if (req.body.videoIDAbove) {
                console.log('here', req.params.company)
                model1.readVideoOrder(req.params.company)
                .then((response0) => {
                    console.log(response0)
                    let voUpdated
                    let index0 = response0[0].VideoOrder.search(req.body.form.id.toString())
                    console.log(`-${index0}-`)
                    let slice0 = response0[0].VideoOrder.slice(0, index0 - 1)
                    console.log(`-${slice0}-`)
                    let slice1 = response0[0].VideoOrder.slice(index0)
                    console.log(`-${slice1}-`)
                    let index1 = slice1.search(" ")
                    console.log(`-${index1}-`)
                    let voUpdatedTemp = slice0 + slice1.slice(index1)
                    console.log(`-${voUpdatedTemp}-`, req.body.videoIDAbove)
                    if (req.body.videoIDAbove === -1) {
                        voUpdated = voUpdatedTemp + req.body.form.id.toString() + ' '
                        console.log(`-${voUpdated}-`)
                    } else {
                        let addPlace = voUpdatedTemp.search(req.body.videoIDAbove)
                        slice0 = voUpdatedTemp.slice(0, addPlace)
                        slice1 = voUpdatedTemp.slice(addPlace)
                        voUpdated = slice0 + req.body.form.id.toString() + ' ' + slice1
                    }
                    console.log(`-${voUpdated}-`, 'voUpdated')
                    model1.updateVideoOrder({voUpdated: voUpdated, company: req.params.company})
                    .then(() => {
                        if (req.body.form.Name || req.body.form.Link) {
                            model0.update(req.body.form)
                            .then(() => {
                                res.status(200).json({voUpdated: voUpdated});
                            })
                            .catch((err) => res.send(err));
                        }
                        res.status(200).json({voUpdated: voUpdated});
                    })
                    .catch((err)=> res.send(err))
                })
                .catch((err)=> res.send(err))
            } else {
                model0.update(req.body.form)
                .then((response) => {
                    res.status(200).json(response);
                })
                .catch((err) => res.send(err));
            }
        }
      });
  });

router.delete("/:videoID/:company", (req, res) => {
    jwt.verify(req.headers.authorization, secrets.jwtSecret, (error) => {
        if (error) {
          res.status(401).json({ message: "you cannot pass!" });
        } else {
            model0.del({id: req.params.videoID})
            .then((response0) => {
                if (response0) {
                    model1.readVideoOrder(req.params.company)
                    .then((response1) => {
                        let voUpdated = ""
                        for (let i = 0; i < response1[0].VideoOrder.length; i++) {
                            if (response1[0].VideoOrder[i-1] === " ") {
                                let VOSlice = response1[0].VideoOrder.slice(i)
                                let VONum = VOSlice.slice(0, VOSlice.search(" "))
                                if (VONum == req.params.videoID) {
                                    let voUpdatedTemp0 = response1[0].VideoOrder.slice(0, i)
                                    voUpdated = voUpdatedTemp0 + response1[0].VideoOrder.slice(i + VONum.length + 1)
                                    break
                                }
                            } 
                        }
                        model1.updateVideoOrder({voUpdated: voUpdated, company: req.params.company})
                        .then(() => {
                            res.status(200).json({voUpdated: voUpdated})
                        })
                        .catch((err) => res.send(err))
                    })
                    .catch((err) => res.send(err))
                }
            })
            .catch((err) => res.send(err))
        }
      });
})

module.exports = router;
