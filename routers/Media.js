const router = require("express").Router();
const jwt = require("jsonwebtoken");
const secrets = require("../secrets");
const model0 = require("../models/Media");
const model1 = require("../models/Companies")

router.post("/", (req, res) => {
    jwt.verify(req.headers.authorization, secrets.jwtSecret, (error) => {
        if (error) {
          res.status(401).json({ message: "you cannot pass!" });
        } else {
            model0.create(req.body.form)
            .then((response0) => {
                let orderUpdated = ""
                if (req.body.idAbove === -1) {
                    orderUpdated = req.body.order + response0[0].toString() + ' '
                } else {
                    for (let i = 0; i < req.body.order.length; i++) {
                        if (req.body.order[i-1] === " ") {
                            let OrderSlice = req.body.order.slice(i)
                            let OrderNum = OrderSlice.slice(0, OrderSlice.search(" "))
                            if (OrderNum == req.body.idAbove) {
                                let insert = response0[0].toString() + ' ' + OrderNum
                                orderUpdated = req.body.order.slice(0, i) + insert + req.body.order.slice(i + OrderNum.length)
                                break
                            }
                        }
                    }
                }
                model1.updateOrder({company: req.body.form.Company, mUpdated: orderUpdated})
                .then(()=> {
                    res.status(200).json({id: response0, mUpdated: orderUpdated})
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
    model1.readOrder(req.params.Company)
    .then((response0)=> {
        let Order = response0[0].Order
        model0.read(req.params.Company)
        .then((response1) => {
            let medOptions0 = new Map()
            let medOptions1 = []
            for (let i = 0; i < Order.length; i++) {
                if (Order[i-1] === " ") {
                    let OrderSlice = Order.slice(i)
                    let OrderNum = OrderSlice.slice(0, OrderSlice.search(" "))
                    medOptions0.set(OrderNum, "")
                } 
            }
            if (req.params.allOptions == "false") {
                response1.forEach((med) => {
                    medOptions0.set(med.id.toString(), med.Name)
                })
                medOptions0.forEach((value, key) => {
                    medOptions1.push({label: value, rating: 'not safe', value: value})
                })
                medOptions1[0].rating = 'safe'
            } else {
                response1.forEach((med) => {
                    medOptions0.set(med.id.toString(), med.Name)
                })
                medOptions0.forEach((value, key) => {
                    medOptions1.push({label: value, rating: 'safe', value: value})
                })
            }
            res.json(medOptions1)
        })
        .catch((err) => res.send(err));
    })
    .catch((err) => res.send(err))
});

router.get("/options/admin/:Company", (req, res) => {
    model1.readOrder(req.params.Company)
    .then((response0)=> {
        let Order = response0[0].Order
        model0.read(req.params.Company)
        .then((response1) => {
            let medOptions0 = new Map()
            let medOptions1 = []
            for (let i = 0; i < Order.length; i++) {
                if (Order[i-1] === " ") {
                    let OrderSlice = Order.slice(i)
                    let OrderNum = OrderSlice.slice(0, OrderSlice.search(" "))
                    medOptions0.set(OrderNum, "")
                } 
            }
            response1.forEach((med) => {
                medOptions0.set(med.id.toString(), med.Name)
            })
            medOptions0.forEach((value, key) => {
                medOptions1.push({label: value, rating: 'safe', value: value})
            })
            medOptions1.push({label: "Add audio", rating: 'safe', value: "Add audio"})
            res.json(medOptions1)
        })
        .catch((err) => res.send(err));
    })
});

router.patch("/:company", (req, res) => {
    jwt.verify(req.headers.authorization, secrets.jwtSecret, (error) => {
        if (error) {
          res.status(401).json({ message: "you cannot pass!" });
        } else {
            if (req.body.mediaIDAbove) {
                model1.readOrder(req.params.company)
                .then((response0) => {
                    let mUpdated
                    let index0 = response0[0].Order.search(req.body.form.id.toString())
                    let slice0 = response0[0].Order.slice(0, index0 - 1)
                    let slice1 = response0[0].Order.slice(index0)
                    let index1 = slice1.search(" ")
                    let mUpdatedTemp = slice0 + slice1.slice(index1)
                    if (req.body.mediaIDAbove === -1) {
                        mUpdated = mUpdatedTemp + req.body.form.id.toString() + ' '
                    } else {
                        let addPlace = mUpdatedTemp.search(req.body.mediaIDAbove)
                        slice0 = mUpdatedTemp.slice(0, addPlace)
                        slice1 = mUpdatedTemp.slice(addPlace)
                        mUpdated = slice0 + req.body.form.id.toString() + ' ' + slice1
                    }
                    model1.updateOrder({mediaUpdated: mUpdated, company: req.params.company})
                    .then(() => {
                        if (req.body.form.Name || req.body.form.Link) {
                            model0.update(req.body.form)
                            .then(() => {
                                res.status(200).json({mUpdated: mUpdated});
                            })
                            .catch((err) => res.send(err));
                        } else {
                            res.status(200).json({mUpdated: mUpdated});
                        }
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

router.delete("/:mediaID/:company", (req, res) => {
    jwt.verify(req.headers.authorization, secrets.jwtSecret, (error) => {
        if (error) {
          res.status(401).json({ message: "you cannot pass!" });
        } else {
            model0.del({id: req.params.mediaID})
            .then((response0) => {
                if (response0) {
                    model1.readOrder(req.params.company)
                    .then((response1) => {
                        let mUpdated = ""
                        for (let i = 0; i < response1[0].Order.length; i++) {
                            if (response1[0].Order[i-1] === " ") {
                                let OrderSlice = response1[0].Order.slice(i)
                                let OrderNum = OrderSlice.slice(0, OrderSlice.search(" "))
                                if (OrderNum == req.params.mediaID) {
                                    let mUpdatedTemp0 = response1[0].Order.slice(0, i)
                                    mUpdated = mUpdatedTemp0 + response1[0].Order.slice(i + OrderNum.length + 1)
                                    break
                                }
                            } 
                        }
                        model1.updateOrder({mUpdated: mUpdated, company: req.params.company})
                        .then(() => {
                            res.status(200).json({mUpdated: mUpdated})
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
