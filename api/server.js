const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const companiesRouter = require("../routers/Companies");
const videosRouter = require("../routers/Videos");
const meetingsRouter = require("../routers/Meetings");
// const usersRouter = require("../routers/Users");

const server = express();

const trustedSites = ['http://localhost:3000', 'https://defyn.co', 'https://energyti.me']

const corsOptions = {
        origin: function (origin, callback) {
                if(trustedSites.indexOf(origin) !== -1) {
                        callback(null, true)
                } else {
                        callback(new Error('Not allowed by CORS'))
                }
        }
}

server.use(helmet());
server.use(cors(corsOptions));
server.use(express.json());

server.get('/', (req ,res) => 
        res.send('Hello!')
)

server.use("/api/companies", companiesRouter);
server.use("/api/videos", videosRouter);
server.use("/api/meetings", meetingsRouter);
// server.use("/api/users", usersRouter);

module.exports = server;