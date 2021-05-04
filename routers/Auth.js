const router = require("express").Router();
const model0 = require("../models/Auth");
const model2 = require("../models/Users")
const model3 = require("../models/Companies")
const nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secrets = require("../secrets");
const stripe = require("stripe")("sk_test_51HjAGuFGKxXMH4MkpB3JUiorRLmlnTWODuPMv1AfzjE0V77LrBmAneZbghxxBOd49Tt4NepOpYz9asB4ekL7lwxP00aBCUD0rl")

router.get("/login-check0/:company/:token", (req, res) => {
    const token = req.params.token
    const secret = secrets.jwtSecret;
  
    if (token) {
      jwt.verify(token, secret, (error, decodedToken) => {
        if (error) {
          res.status(200).json({ error: error, loggedIn: false });
        } else {

            // get bought videos and pass
            // model1.readBought({
            //     Company: req.params.company,
            //     User: decodedToken.UserID
            //   })
            // .then((response)=> {
                res.status(200).json({ 
                    loggedIn: true, 
                    decodedToken: decodedToken, 
                    // boughtVideos: response
                })
            // })
            // .catch((err)=> res.status(400).json({loggedIn: false, err}))
        }
      });
    } else {
      res.status(200).json({ loggedIn: false });
    }
})

router.get("/login-check1/:attemptID/:loginTries/:company", (req, res) => {
    if (req.params.loginTries <= 14) {
        model0.checkAttempt(req.params.attemptID)
        .then((response0)=> {
            if(response0[0].StartTime.length !== 0) {
                // model1.readBought({
                //     Company: parseInt(req.params.company),
                //     User: response0[0].User
                // })
                // .then((response1)=> {
                    let token = generateToken(response0[0].User, req.params.company)
                    res.status(200).json({ 
                        loggedIn: true, 
                        token: token, 
                        // boughtVideos: response1
                    })
                // })
                // .catch((err)=> res.status(400).json({loggedIn: false, err}))
            } else {
                res.status(200).json({loggedIn: false, expired: false})
            }
        })
        .catch((err)=> res.status(400).json({loggedIn: false, err}))
    } else {
        model0.setAttemptExpired(req.params.attemptID)
        .then((response2)=> {
            res.status(200).json({loggedIn: false, expired: true})
        })
        .catch((err)=> res.status(400).json(err))
    }
})

// router.post("/login-attempt/:company", (req, res0) => {
//     model2.find({Email: req.body.Email, Company: req.params.company})
//     .then((response0)=> {
//         model0.add({User: response0[0].id, StartTime: ""})
//         .then((response1)=> {
//             loginEmailer(response1[0], req.body.Email, res0)
//         })
//         .catch((err)=> res0.status(400).json(err))
//     })
//     .catch((err)=> res0.status(400).json(err))
// })

router.post("/login-setter/:attemptID", (req, res) => {
    model0.setAsLoggedIn(req.params.attemptID)
    .then((response)=> {
        if (response == true) {
            res.status(200).json({h1: "Logged in!", h3: "Enjoy!"})
        } else {
            res.status(200).json({h1: "Login failed..", h3: "Try again"})
        }
    })
})

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
            // model3.readStripeIDByEmail(req.body.Email)
            // .then(async (response1)=> {
                // if (response1[0].StripeID.length > 1) {
                //     const account = await stripe.accounts.retrieve(response1[0].StripeID)
                //     try{
                //         if (account.charges_enabled == true) {
                //             res.status(200).json({auth: true, token: generateToken(-1, req.params.companyID, true)})
                //         }
                //         else {
                //             const accountLinks = await stripe.accountLinks.create({
                //                 account: account.id,
                //                 refresh_url: `http://${req.params.companyUrl}/admin`,
                //                 return_url: `http://${req.params.companyUrl}/admin`,
                //                 type: 'account_onboarding',
                //             });
                //             try {
                //                 res.status(200).json({auth: true, url: accountLinks.url})
                //             }
                //             catch {
                //                 res.status(400).json({auth: false})
                //             }
                //         }
                //     }
                //     catch {
                //         res.status(400).json({auth: false})
                //     }
                // } else if (response1[0].StripeID == " ") {
                //     const account = await stripe.accounts.create({
                //         type: "standard",
                //         email: req.body.Email
                //     })
                //     try {
                //         model3.update({id: account.id, email: req.body.Email})
                //         .then(async (response2)=> {
                //             if (response2) {
                //                 const accountLinks = await stripe.accountLinks.create({
                //                     account: account.id,
                //                     refresh_url: `http://localhost:3000/admin`,
                //                     return_url: 'http://localhost:3000/admin',
                //                     type: 'account_onboarding',
                //                 });
                //                 try {
                //                     res.status(200).json({auth: true, url: accountLinks.url})
                //                 }
                //                 catch {
                //                     res.status(400).json({auth: false})
                //                 }
                //             } else {
                //                 res.status(400).json({auth: false})
                //             }
                //         })
                //         .catch(()=> res.status(400).json({auth: false}))
                //     }
                //     catch {
                //         res.status(400).json({auth: false})
                //     }
                // } else {
                    res.status(200).json({auth: true, token: generateToken(-1, req.params.companyID, true)})
            // })
            // .catch(()=> res.status(200).json(false))
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

// function loginEmailer(attemptID, email, res0) {
//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//           user: 'david.m.molinari@gmail.com',
//           pass: secrets.mailPassword
//         }
//       });

//       const mailOptions = {
//         from: 'david.m.molinari@gmail.com',
//         to: email,
//         subject: 'Click "login" to login',
//         html: 
//         // `
//         //     <form action="http://localhost:5001/api/auth/login-setter/${attemptID}"
//         //         method="POST">
//         //         <button> Login </button>
//         //     </form>
//         //     <h3> After 5 min, link invalid </h3>
//         //     `
//         `
//             <form action="http://localhost:5001/api/auth/login-setter/${attemptID}" id="idForm"
//                 method="POST">
//                 <button type="submit"> Login </button>
//             </form>
//             <script>
//                 var my_func = function(event) {
//                     event.preventDefault();

//                 };
//                 var form = document.getElementById("idForm");
//                 form.addEventListener("submit", my_func, true);
//             </script>`
//       }
      
//       transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             res0.status(400).json(error)
//         } else {
//             res0.status(200).json({message: "email is a member", attemptID: attemptID})
//         }
//       })
// }