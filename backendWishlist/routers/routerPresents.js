const express = require("express");
const database = require("../database");

const routerPresents = express.Router();

routerPresents.post("/", async (req, res) => {
    let name = req.body.name
    let description = req.body.description
    let url = req.body.url
    let price = req.body.price

    let errors = []

    if( name == undefined ) {
        errors.push("No name in body")
    }

    if( description == undefined ) {
        errors.push("No description in body")
    }

    if( url == undefined ) {
        errors.push("No URL in body")
    }

    if(isNaN(price)) {
        errors.push("Price is not a number")
    }

    if(parseFloat(price) <= 0) {
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