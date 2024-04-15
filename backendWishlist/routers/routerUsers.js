const express = require("express");
const database = require("../database");
const { isEmail } = require("validator");

const routerUsers = express.Router();
const jwt = require("jsonwebtoken");

const activeApiKeys = require("../activeApiKeys");

routerUsers.post("/login", async (req, res) => {
    let email = req.body.email
    let password = req.body.password

    let errors = []

    if ( email == undefined || email.length < 3 || isEmail(email) == false ) {
        errors.push({errors:"No email in body"})
    }
    if (password == undefined || password.length < 5) {
        errors.push({errors: "Password less than 5"})
    }
    if ( errors.length > 0) {
        return res.status(400).json({errors: errors})
    }

    database.connect();

    let selectedUsers = null;
    try {
        selectedUsers = await database.query("SELECT id, email FROM users WHERE email = ? AND password = ?", [email, password])

    } catch (e) {
        database.disConnect();
        return res.status(400).json({errors: e})
    }

    if ( selectedUsers.length == 0) {
        return res.status(401).json({errors: "Invalid email or password"})
    }

    database.disConnect();

    let apiKey = jwt.sign(
		{ 
			email: selectedUsers[0].email,
			id: selectedUsers[0].id
		},
		"secret");

	activeApiKeys.push(apiKey)

    res.json({
        apiKey: apiKey,
        id: selectedUsers[0].id,
        email: selectedUsers[0].email
    })
})

routerUsers.post("/", async (req, res) => {
    let email = req.body.email
    let name = req.body.name
    let password = req.body.password

    let errors = []

    if ( email == undefined || email.length < 3 || isEmail(email) == false ) {
        errors.push({errors:"No email in body"})
    }
    if ( name == undefined || name.length < 2 ) {
        errors.push({errors: "No name in body"})
    }
    if (password == undefined || password.length < 5) {
        errors.push({errors: "Password less than 5"})
    }
    if ( errors.length > 0) {
        return res.status(400).json({errors: errors})
    }

    database.connect();

    let insertedUser = null;

    try {

        userWithSameEmail = await database.query("SELECT email FROM users WHERE email = ?",
            [email])

        if ( userWithSameEmail.length > 0){
            database.disConnect();
            return res.status(400).json({errors: "Already an user with this email"})
        }

        insertedUser = await database.query("INSERT INTO users (email, name, password) VALUES (?,?,?)",
            [email, name, password])

    } catch (e) {
        database.disConnect();
        return res.status(400).json({errors: e})
    }

    database.disConnect();
    res.json({inserted: insertedUser})
})

routerUsers.get("/disconnect", async (req, res) => {
    let apiKey = req.query.apiKey
    let index = activeApiKeys.indexOf(apiKey)

    if (index != -1) {
        activeApiKeys.splice(index, 1)
        res.json({disconnected: true})
    } else {
        res.json(400).json({errors: "User not found"})
    }
});

module.exports = routerUsers;