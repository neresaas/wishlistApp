const express = require("express");
const database = require("../database");
const { isURL } = require("validator");

const routerPresents = express.Router();

routerPresents.get("/", async (req, res) => {   
    let userId = req.infoApiKey.id
    let userEmail = req.query.userEmail

    if ( userId == undefined ){
        return res.status(400).json({errors: "No userId"})
    }

    let presents = []

    database.connect();

    if (userId != undefined && userEmail == undefined) {
        presents = await database.query("SELECT presents.*, users.email FROM presents JOIN users ON presents.userId = users.id WHERE presents.userId = ?", [userId])

    } else if (userId != undefined && userEmail != undefined) {
        presents = await database.query("SELECT presents.*, users.name AS nameUser, friends.* FROM presents JOIN users ON presents.userId = users.id JOIN friends ON users.email = friends.emailMainUser WHERE friends.emailFriend = ? AND friends.emailMainUser = ?", [req.infoApiKey.email, userEmail])
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

        return res.status(400).json({errors: "Not present with this id"})

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

    if ( name == undefined || name.length < 2 ) {
      errors.push({errors:"No name in body"})
    }

    if ( description == undefined || description.length < 10 ) {
        errors.push({errors:"No description in body"})
    }

    if ( url == undefined || url == "" || isURL(url) == false ) {
        errors.push({errors:"No URL in body"})
    }

    if (isNaN(price)) {
        errors.push({errors:"Price is not a number"})
    }

    if (parseFloat(price) <= 0) {
        errors.push({errors: "Price must be higher than 0"})
    }

    if (errors.length > 0) {
        return res.status(400).json({errors: errors})
    }

    database.connect();

    let insertedPresent = []

    try {
        insertedPresent = await database.query("INSERT INTO presents (userId, name, description, url, price) VALUES (?, ?, ?, ?, ?)", [req.infoApiKey.id, name, description, url, price])

    } catch(e) {
        database.disConnect();

        return res.status(400).json({errors: "Error in inserted present"})
    }

    database.disConnect();

    res.json({inserted: insertedPresent})
});

routerPresents.put("/:id", async (req, res) => {
    let id = req.params.id
    let name = req.body.name
    let description = req.body.description
    let url = req.body.url
    let price = req.body.price

    let errors = []

    if ( name == undefined || name.length < 2 ) {
      errors.push({errors:"No name in body"})
    }

    if ( description == undefined || description.length < 10 ) {
        errors.push({errors:"No description in body"})
    }

    if ( url == undefined || url == "" || isURL(url) == false ) {
        errors.push({errors:"No URL in body"})
    }

    if (isNaN(price)) {
        errors.push({errors:"Price is not a number"})
    }

    if (parseFloat(price) <= 0) {
        errors.push({errors: "Price must be higher than 0"})
    }

    if (errors.length > 0) {
        return res.status(400).json({errors: errors})
    }

    database.connect();
    
    let updatedPresent = []

    try {
        let presentOwner = await database.query("SELECT users.email, presents.chosenBy FROM users JOIN presents ON users.id = presents.userId WHERE presents.id = ?", [id])

        let friends = await database.query("SELECT friends.emailFriend FROM friends JOIN users ON friends.emailMainUser = users.email WHERE friends.emailMainUser = ? AND friends.emailFriend = ?", [presentOwner[0].email, req.infoApiKey.email])

        if (presentOwner[0].email == req.infoApiKey.email) {
            updatedPresent = await database.query("UPDATE presents SET name = ?, description = ?, url = ?, price = ? WHERE id = ? AND userId = ?", [name, description, url, price, id, req.infoApiKey.id])
        }
 
        if (presentOwner[0].email != req.infoApiKey.email && friends[0].emailFriend == req.infoApiKey.email && presentOwner[0].chosenBy == undefined) {
            updatedPresent = await database.query("UPDATE presents INNER JOIN users ON presents.userId = users.id INNER JOIN friends ON users.email = friends.emailMainUser SET presents.chosenBy = ? WHERE presents.id = ? AND friends.emailFriend = ?", [req.infoApiKey.email, id, req.infoApiKey.email])
        }

    } catch (e) {
        database.disConnect();

        return res.status(400).json({errors: "Error in updated presents"})
    }

    database.disConnect();

    res.json({modified: updatedPresent})
});

routerPresents.delete("/:id", async (req,res) => {
    let id = req.params.id

    if ( id == undefined ){
        return res.status(400).json({errors: "No id"})
    }

    database.connect();

    try {
        let presents = await database.query("SELECT * FROM presents WHERE id = ? AND userId = ?", [id, req.infoApiKey.id])

        if (presents.length > 0) {
            await database.query("DELETE FROM presents WHERE id = ?", [id])
        }
        
        let notYourPresent = presents.find(nYP => nYP.id == id)

        if (notYourPresent == undefined) {
            return res.status(400).json({errors: "You cannot delete this present"})
        }
    
    } catch (e) {
        res.status(400).json({errors: "Error in deleted presents" })
        return
    }
    
    database.disConnect();

    res.json({deleted: true})
})

module.exports = routerPresents;