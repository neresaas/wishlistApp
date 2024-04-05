const express = require("express");
const database = require("../database");

const routerPresents = express.Router();

routerPresents.get("/", async (req, res) => {   
    let userId = req.query.userId

    let presents = [];

    database.connect();

    if (userId != undefined) {
        presents = await database.query("SELECT presents.*, users.email FROM presents JOIN users ON presents.userId = users.id WHERE presents.userId = ?", [userId])
    } else {
        presents = await database.query("SELECT presents.*, users.email FROM presents JOIN users ON presents.userId = users.id")
    }

    database.disConnect();

    res.json(presents);
});

routerPresents.get("/:id", async (req, res) => {
    let id = req.params.id

    if (id == undefined) {
        return res.status(400).json({errors: "No id params"})
    }

    database.connect();

    let presents = await database.query("SELECT presents.*, users.email FROM presents JOIN users ON presents.userId = users.id WHERE presents.id = ?", [id])

    if (presents.length < 1) {
        database.disConnect();

        return res.status(400).json({error: "Not present with this id"})

    } else {
        database.disConnect();

        return res.json(presents[0])
    }
});

routerPresents.post("/", async (req, res) => {
    let name = req.body.name
    let description = req.body.description
    let url = req.body.url
    let price = req.body.price

    let errors = []

    if ( name == undefined ) {
      errors.push("No name in body")
    }

    if ( description == undefined ) {
        errors.push("No description in body")
    }

    if ( url == undefined ) {
        errors.push("No URL in body")
    }

    if (isNaN(price)) {
        errors.push("Price is not a number")
    }

    if (parseFloat(price) <= 0) {
        errors.push("Price must be higher than 0")
    }

    if (errors.length > 0) {
        return res.status(400).json({errors: errors})
    }

    database.connect()

    let insertedPresent = []

    try {
        insertedPresent = await database.query("INSERT INTO presents (userId, name, description, url, price) VALUES (?, ?, ?, ?, ?)", [req.infoApiKey.id, name, description, url, price])

    } catch(e) {
        database.disConnect()
        return res.status(400).json({errors: "Error"})
    }

    database.disConnect()

    res.json({inserted: insertedPresent})
});

module.exports = routerPresents;