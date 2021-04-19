const router = require("express").Router();
const stripe = require("stripe")("sk_test_51HjAGuFGKxXMH4MkpB3JUiorRLmlnTWODuPMv1AfzjE0V77LrBmAneZbghxxBOd49Tt4NepOpYz9asB4ekL7lwxP00aBCUD0rl")
const model0 = require("../models/videos")
const model1 = require("../models/users")
const model2 = require("../models/usersvideos")
const model3 = require("../models/companies")

router.get("/payment-intent/:videoName/:company", (req, res) => {
    model0.readByNameCompany({Name: req.params.videoName, Company: req.params.company})
    .then((response0)=> {
        model3.readByID(req.params.company)
        .then(async (response1) => {
            console.log(response1[0].StripeID)
            const paymentIntent = await stripe.paymentIntents.create({
                amount: parseInt(response0[0].Price),
                currency: 'usd',
                application_fee_amount: parseInt(response0[0].Price) * .05,
                payment_method_types: ['card'],
                on_behalf_of: response1[0].StripeID,
                transfer_data: {
                    destination: response1[0].StripeID,
                }
            });
            try {
                res.status(200).json(paymentIntent.client_secret)
            }
            catch {
                res.status(400).json('error')
            }
        })
        .catch((err)=> res.status(400).json(err))
    })
    .catch((err)=> res.status(400).json(err))
})

router.post("/handle-payment/:company", (req, res) => {
    // check if email is a user
    model1.find({Email: req.body.Email})
    .then((response0)=> {
        model0.readByNameCompany({Name: Video, Company: req.params.company})
        .then((response1)=> {
            if(response0) {
                // add to users videos userID and videoID
                model2.create({Video: response1.id, User: response0.id})
                .then((response2)=> {
                    res.status(200).json({alreadyUser: "true", response: response2})
                })
                .catch((err)=> res.status(400).json(err))
            } else {
                // add user
                // send user a valid token
                // add to users videos userID and videoID
                // send user bought video info
            }
        })
        .catch((err)=> res.status(400).json(err))
    })
    .catch((err)=> res.status(400).json(err))
})

module.exports = router