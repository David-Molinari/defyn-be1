const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const companiesRouter = require("../routers/Companies");
const miscRouter = require("../routers/Misc");
const videosRouter = require("../routers/Videos");
const usersRouter = require("../routers/Users");

const server = express();

// const trustedSites = ['http://localhost:3000', 'https://defyn.co', 'https://energyti.me']

// const corsOptions = {
//         origin: function (origin, callback) {
//                 if(trustedSites.indexOf(origin) !== -1) {
//                         callback(null, true)
//                 } else {
//                         callback(new Error('Not allowed by CORS'))
//                 }
//         }
// }

server.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", '*');
        res.header("Access-Control-Allow-Credentials", true);
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
        next();
})

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req,res) => 
        res.send('Hello!')
)

server.use("/api/companies", companiesRouter);
server.use("/api/videos", videosRouter);
server.use("/api/misc", miscRouter);
server.use("/api/users", usersRouter);

module.exports = server;