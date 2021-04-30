const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const companiesRouter = require("../routers/Companies");
const videosRouter = require("../routers/Videos");
const usersRouter = require("../routers/Users");
const authRouter = require("../routers/Auth")
const paymentRouter = require("../routers/Payment")

const server = express();

// const trustedSites = ['http://localhost:3000', 'https://defyn.co']
const trustedSites = process.env.TRUSTED_SITES.split(',')
console.log(trustedSites)

const corsOptions = function (req, callback) {
        let corsOptions = {}
        if(trustedSites.indexOf(req.header('Origin')) !== -1) {
                corsOptions = { origin: true }
        } else {
                corsOptions = { origin: false }
        }
        callback(null, corsOptions)
}

server.use(helmet());
server.use(cors(corsOptions));
server.use(express.json());

server.get('/', (req ,res) => {
        res.send('Hello!')
})

server.use("/api/companies", companiesRouter);
server.use("/api/videos", videosRouter);
server.use("/api/users", usersRouter);
server.use("/api/auth", authRouter);
server.use("/api/payment", paymentRouter);

module.exports = server;