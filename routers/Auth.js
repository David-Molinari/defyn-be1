const router = require("express").Router();
const model0 = require("../models/auth");
const model1 = require("../models/usersvideos")
const model2 = require("../models/users")
const nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secrets = require("../secrets");

router.get("/login-check0/:company", (req, res) => {
    const token = req.headers.authorization;
    const secret = secrets.jwtSecret;
  
    if (token) {
      jwt.verify(token, secret, (error, decodedToken) => {
        if (error) {
          res.status(200).json({ error: error, loggedIn: false });
        } else {
            // get bought videos and pass
            model1.readBought({
                Company: req.params.company,
                User: decodedToken.UserID
              })
            .then((response)=> {
                res.status(200).json({ 
                    loggedIn: true, 
                    decodedToken: decodedToken, 
                    boughtVideos: response
                })
            })
            .catch((err)=> res.status(400).json({loggedIn: false, err}))
        }
      });
    } else {
      res.status(200).json({ loggedIn: false });
    }
})

router.get("/login-check1/:attemptID/:loginTries", (req, res) => {
    if (req.params.loginTries <= 14) {
        model0.checkAttempt(req.params.attemptID)
        .then((response0)=> {
            if(response0[0].StartTime == true) {
                model1.readBought({
                    Company: req.params.company,
                    User: response0[0].User
                })
                .then((response1)=> {
                    let token = generateToken(response0[0].User)
                    res.status(200).json({ 
                        loggedIn: true, 
                        token: token, 
                        boughtVideos: response1
                    })
                })
                .catch((err)=> res.status(400).json({loggedIn: false, err}))
            } else {
                res.status(200).json({loggedIn: false, expired: false})
            }
        })
        .catch((err)=> res.status(400).json({loggedIn: false, err}))
    } else {
        model0.setAttemptExpired(req.params.attemptID)
        .then((response2)=> {
            console.log(response2)
            res.status(200).json({loggedIn: false, expired: true})
        })
        .catch((err)=> res.status(400).json(err))
    }
})

router.post("/login-attempt/:company", (req, res0) => {
    model2.find({Email: req.body.Email, Company: req.params.company})
    .then((response0)=> {
        model0.add({User: response0[0].id, StartTime: ""})
        .then((response1)=> {
            loginEmailer(response1[0], req.body.Email, res0)
        })
        .catch((err)=> res0.status(400).json(err))
    })
    .catch((err)=> res0.status(400).json(err))
})

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

module.exports = router

function generateToken(user) {
    const payload = {
      UserID: user
    };
    const secret = secrets.jwtSecret;
    const options = {
      expiresIn: "5d",
    };
  
    return jwt.sign(payload, secret, options);
  }

function loginEmailer(attemptID, email, res0) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'david.m.molinari@gmail.com',
          pass: secrets.mailPassword
        }
      });

      const mailOptions = {
        from: 'david.m.molinari@gmail.com',
        to: email,
        subject: 'Click "login" to login',
        html: 
        // `
        //     <form action="http://localhost:5001/api/auth/login-setter/${attemptID}"
        //         method="POST">
        //         <button> Login </button>
        //     </form>
        //     <h3> After 5 min, link invalid </h3>
        //     `
        `
            <form action="http://localhost:5001/api/auth/login-setter/${attemptID}" id="idForm">
                <button type="submit"> Login </button>
            </form>
            <script>
                var my_func = function(event) {
                    event.preventDefault();
                    
                };
                var form = document.getElementById("idForm");
                form.addEventListener("submit", my_func, true);
            </script>`
      }
      
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res0.status(400).json(error)
        } else {
            res0.status(200).json({message: "email is a member", attemptID: attemptID})
        }
      })
}