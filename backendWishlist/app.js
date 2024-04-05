const express = require("express");
const port = 4000;

const app = express();
app.use(express.json());

let routerUsers = require("./routers/routerUsers");
let routerPresents = require("./routers/routerPresents");
let routerFriends = require("./routers/routerFriends");

app.use("/users", routerUsers);
app.use("/presents", routerPresents);
app.use("/friends", routerFriends);

app.listen(port, () => {
    console.log("Listening on port " + port)
});