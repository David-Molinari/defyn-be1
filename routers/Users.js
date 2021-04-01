const router = require("express").Router();
const model = require("../models/users");
const nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/checkifli", (req, res) => {
    const token = req.headers.authorization;
    const secret = secrets.jwtSecret;
  
    if (token) {
      jwt.verify(token, secret, (error, decodedToken) => {
        if (error) {
          res.status(401).json(error);
        } else {
            res.status(200).json({ loggedIn: true, decodedToken: decodedToken })
        }
      });
    } else {
      res.status(400).json({ loggedIn: false });
    }
})

// router.post("/login", (req, res) => {
//     let { Company, Email, Password } = req.body;

//     model.find({ Company, Email })
//     .then(([User]) => {
//         if (User && bcrypt.compareSync(Password, User.Password)) {
//             const token = generateToken(User);
//             res.status(200).json(token);
//         } else {
//             res.status(401).json("failed to login");
//         }
//     })
//     .catch((error) => {
//         res.status(500).json(error);
//     });
// });

// router.post("/signup", (req, res) => {
//   let { Company, Email, Password, Username } = req.body;

//   model.find({ Email, Company })
//   .then((arr)=> {
//       if (arr.length === 0) {
//         model.find({ Username, Company })
//         .then((arr1)=> {
//             if (arr1.length === 0) {
//                 if (Username.length < 5) {
//                     return res.status(400).json("Username too short")
//                   }
//                 if (Password.length < 5) {
//                   return res.status(400).json("Password too short")
//                 }
//                 const rounds = process.env.HASH_ROUNDS || 5;
//                 const hash = bcrypt.hashSync(Password, rounds);
//                 Password = hash;
//                 model.add({Company, Email, Password, Username})
//                 .then(() => {
//                     model.find({ Company, Email })
//                     .then(([User]) => {
//                         const token = generateToken(User);
//                         res.status(200).json(token);
//                     })
//                     .catch((error) => {
//                         res.status(500).json(error);
//                     });
//                 })
//                 .catch((error) => {
//                     res.status(500).json(error);
//                 });
//             } else {
//                 res.status(400).json("Username taken");
//             }
//         })
//         .catch((err)=> {
//             console.log(err)
//         })
//       } else {
//         res.status(400).json("Email taken");
//       }
//   })
//   .catch((err)=> {
//       console.log(err)
//   })
// });

// router.patch("/changeem", (req, res) => {
//     let { Company, Email, NewEmail, Password } = req.body;
//     model.find({ Company, Email })
//     .then((arr)=> {
//         if (arr.length == 0) {
//             return res.status(400).json("Current email does not exist")
//         }
//         if (bcrypt.compareSync(Password, arr[0].Password)) {
//             const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//             if (re.test(String(NewEmail).toLowerCase()) == false) {
//                 return res.status(400).json("New email not valid")
//             }
//             model.find({ Company, Email: NewEmail })
//             .then((arr1)=> {
//                 if (arr1.length > 0) {
//                     return res.status(400).json("New email already exists")
//                 }
//                 model.changeEm({Company, Email, NewEmail})
//                     .then(() => {
//                         res.status(200).json("Email updated successfully");
//                     })
//                     .catch((err) => res.status(500).json(err));
//             })
//             .catch((err) => res.status(500).json(err));
//         } else {
//             return res.status(400).json("Incorrect current email or password")
//         }
//     })
//     .catch((err) => res.status(500).json(err));
// });

// router.patch("/changepw", async (req, res) => {
//   let { Company, Email, CurrentPassword, NewPassword } = req.body;
//   const User = await model.find({ Company, Email })
//     try {
//       if (User && bcrypt.compareSync(CurrentPassword, User[0].Password)) {
//         if (NewPassword.length < 5) {
//             return res.status(400).json("New password too short")
//         }
//         const rounds = process.env.HASH_ROUNDS || 5;
//         const hash = bcrypt.hashSync(NewPassword, rounds)
//         console.log(Company, Email, hash)
//         await model.changePw({Company, Email, hash})
//           try{
//               res.status(200).json("Successly changed password")
//           }
//           catch {
//               res.status(401).json("Failed to update password");
//           }
//       } else {
//         res.status(501).json("Incorrect email or current password")
//       }
//     }
//     catch {
//       res.status(500).json("Failed to update password");
//   };
// });

// router.patch("/changeun", (req, res) => {
//     let { Company, Email, Password, Username } = req.body;
//     model.find({ Company, Email })
//     .then((arr)=> {
//         if (arr.length == 0) {
//             return res.status(400).json("Email does not exist")
//         }
//         if (bcrypt.compareSync(Password, arr[0].Password)) {
//             if (Username.length < 5) {
//                 return res.status(400).json("Username too short")
//             }
//             model.changeUn({Company, Email, Username})
//             .then(() => {
//                 res.status(200).json("Username updated successfully");
//             })
//             .catch((err) => res.send(err));
//         } else {
//             return res.status(400).json("Incorrect email or password")
//         }
//     })
//     .catch((err) => res.status(500).json(err));
// });

// router.patch("/resetpw", (req, res) => {
//     let { Company, Email } = req.body;
//     model.find({ Company, Email })
//     .then((arr)=> {
//         if (arr.length == 0) {
//             return res.status(400).json("Current email does not exist")
//         }
//         let Password = randomPassword(5);
//         const rounds = process.env.HASH_ROUNDS || 5;
//         const hash = bcrypt.hashSync(Password, rounds);
//         sendNewPasswordEmail(Company, Email, hash, Password, res);
//     })
//     .catch((err) => res.status(500).json(err));
// })

// router.delete("/", async (req, res) => {
//   let { Company, Email, Password } = req.body;
//   const [User] = await model.find({ Company, Email })
//   console.log(User)
//   try {
//     if (User && bcrypt.compareSync(Password, User.Password)) {
//       await model.del(User.id)
//         try{
//             res.status(200).json("User deleted")
//         }
//         catch {
//             res.status(401).json("Delete failed");
//         }
//     } else {
//       res.status(501).json("Delete failed")
//     }
//   }
//   catch {
//     res.status(500).json("Delete failed");
//   }
// })

// function generateToken(User) {
//     const payload = {
//       userId: User['id'],
//     };
//     const secret = secrets.jwtSecret;
//     const options = {
//       expiresIn: "5d",
//     };
//     return jwt.sign(payload, secret, options);
// }

// function randomPassword(length) {
//     var result           = '';
//     var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     var charactersLength = characters.length;
//     for ( var i = 0; i < length; i++ ) {
//        result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }
//     return result;
// }

// function sendNewPasswordEmail(Company, Email, hash, Password, res) {

//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: 'david.m.molinari@gmail.com',
//         pass: secrets.mailPw
//       }
//     });
  
//     const mailOptions = {
//       from: 'david.m.molinari@gmail.com',
//       to: Email,
//       subject: 'Password Reset',
//       text: `Your password is "${Password}". ` +
//         "After signing in, you can change this password " +
//         "by clicking your username on the site."
//     }
  
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         res.status(500).json(error)
//       } else {
//         model.changePw({Company, Email, hash})
//           .then(()=> {
//             res.status(200).json("Check email for temporary password")
//           })
//           .catch((err) => {
//             res.status(500).json(err)
//           })
//       }
//     })
//   }

// module.exports = router;