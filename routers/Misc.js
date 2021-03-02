const router = require("express").Router();

const model = require("../models/Misc");

router.get("/options/:URL", (req, res) => {
    model.readCompanies(req.params.URL)
        .then((response) => {
            model.readVideos(response[0].id)
                .then((response1) => {
                    let vidOptions = []
                    response1.forEach((vid) => {
                        vidOptions.push({label: vid.Name, value: vid.Name})
                    })
                    res.json(vidOptions)
                })
        })
        .catch((err) => res.send(err));
});

module.exports = router;
