const express = require("express");
const database = require("../database");

const routerUsers = express.Router();

routerUsers.post("/", async (req, res)=>{
    let email = req.body.email
    let name = req.body.name
    let password = req.body.password

    let errors = []

    if( email == undefined ) {
        errors.push("No email in body")
    }
    if( name == undefined ) {
        errors.push("No name in body")
    }
    if( password == undefined ) {
        errors.push("No password in body")
    }
    if (password != undefined && password.length < 5) {
        errors.push("Password less than 5")
    }
    if( errors.length > 0) {
        return res.status(400).json({error: errors})
    }

    database.connect();

    let insertedUser = null;

    try {

        userWithSameEmail = await database.query("SELECT email FROM users WHERE email = ?",
            [email])

        if ( userWithSameEmail.length > 0){
            database.disConnect();
            return res.status(400).json({error: "Already an user with this email"})
        }

        insertedUser = await database.query("INSERT INTO users (email, name, password) VALUES (?,?,?)",
            [email, name, password])

    } catch (e) {
        database.disConnect();
        return res.status(400).json({error: e})
    }

    database.disConnect();
    res.json({inserted: insertedUser})
})

module.exports = routerUsers;