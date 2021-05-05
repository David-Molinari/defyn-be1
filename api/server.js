const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const companiesRouter = require("../routers/Companies");
const mediaRouter = require("../routers/Media");
const usersRouter = require("../routers/Users");
const authRouter = require("../routers/Auth")
const paymentRouter = require("../routers/Payment")

const server = express();

const corsOptions = function (req, callback) {
        let corsOptions = {}
        let trustedSites = ['http://localhost:3000']
        if (process.env.NODE_ENV == 'production') {
                trustedSites = process.env.TRUSTED_SITES.split(',')
        }
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
server.use("/api/media", mediaRouter);
server.use("/api/users", usersRouter);
server.use("/api/auth", authRouter);
server.use("/api/payment", paymentRouter);

module.exports = server;