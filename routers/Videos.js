const router = require("express").Router();

const model = require("../models/Videos");

router.post("/", (req, res) => {
    model.create(req.body)
        .then((response) => {
            res.status(200).json(response)
        })
        .catch((err) => res.send(err))
})

router.get("/:Company", (req, res) => {
    model.read(req.params.Company)
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

module.exports = router;
