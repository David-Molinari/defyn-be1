const router = require("express").Router();

const model = require("../models/Misc");

router.post("/options/:URL", (req, res) => {
    model.readCompanies(req.params.URL)
    .then((response) => {
        model.readVideos(response[0].id)
            .then((response1) => {
                let vidOptions = []
                if (req.body.loggedIn == false) {
                    response1.forEach((vid) => {
                        vidOptions.push({label: vid.Name, rating: 'not safe', value: vid.Name}) 
                    })
                    vidOptions[0].rating = 'safe'
                } else {
                    response1.forEach((vid) => {
                        vidOptions.push({label: vid.Name, rating: 'safe', value: vid.Name})
                    })
                }
                res.json(vidOptions)
            })
            .catch((err) => res.send(err));
    })
    .catch((err) => res.send(err));
});

module.exports = router;