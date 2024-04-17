const express = require("express");
const jwt = require("jsonwebtoken");
let activeApiKeys = require("./activeApiKeys");
const cors = require("cors")

const port = 4000;

const app = express();
app.use(cors());
app.use(express.json());

let routerUsers = require("./routers/routerUsers");
let routerPresents = require("./routers/routerPresents");
let routerFriends = require("./routers/routerFriends");

app.use(["/presents", "/friends"] ,(req, res, next) => {
	console.log("Middleware execution")

    let apiKey = req.query.apiKey

    if(apiKey == undefined) {
        return res.status(401).json({error: "No apiKey"})
    }

    let infoApiKey = []

    try {
        infoApiKey = jwt.verify(apiKey, "secret")

    } catch (e) {
        return res.status(401).json({error: "Invalid apiKey"})
    }

    if(infoApiKey == undefined || activeApiKeys.indexOf(apiKey) == -1) {
        return res.status(401).json({error: "Invalid apiKey"})
    }

    req.infoApiKey = infoApiKey;

    next();
});

app.use("/users", routerUsers);
app.use("/presents", routerPresents);
app.use("/friends", routerFriends);

app.listen(port, () => {
    console.log("Listening on port " + port)
});