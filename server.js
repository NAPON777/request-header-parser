// dependencies

const express = require("express");
const app = express();

// enable cors to make the project remotely testable

const cors = require("cors");
app.use(cors({optionSuccessStatus: 200}));

// implement request-ip

const requestIp = require("request-ip");

var ipMiddleware = (req, res, next) => {const clientIp = requestIp.getClientIp(req); next();};

app.use(requestIp.mw());

// request header

app.get("/api/whoami", (req, res) => {
    const ipAddress = req.clientIp;
    const language = req.acceptsLanguages();
    const software = req.get("User-Agent");
    
    res.json({
        ipaddress: ipAddress,
        language: language[0],
        software: software
    });
});

// serve static files

app.use(express.static("public"));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

//connection listener

const listener = app.listen(process.env.PORT, () => {console.log("Your app is listening on port" + listener.address().port);});