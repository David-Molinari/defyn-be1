const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const companiesRouter = require("../routers/Companies");
const miscRouter = require("../routers/Misc");
const videosRouter = require("../routers/Videos");
const usersRouter = require("../routers/Users");

const server = express();

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