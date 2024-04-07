const express = require("express");
const database = require("../database");

const routerFriends = express.Router();

routerFriends.get("/", async (req, res) => {
    let emailMainUser = req.infoApiKey.email

    if ( emailMainUser == undefined ){
        return res.status(400).json({errors: "No emailMainuser"})
    }

    let friends = []

    database.connect();

    friends = await database.query("SELECT emailFriend FROM friends WHERE emailMainUser = ?", [emailMainUser])

    database.disConnect();

    res.send(friends)
});

routerFriends.post("/", async (req, res) => {
    let emailFriend = req.body.emailFriend

    if ( emailFriend == undefined ) {
        errors.push("No email in body")
    }

    database.connect();

    let newFriend =[]

    try {
        let friends = await database.query(
            "SELECT email FROM users WHERE email = ?", [emailFriend])

       if (friends.length < 1) {
            database.disConnect();

            return res.status(400).json({errors: "This user does not exist"})
        }

        let alredyFriend = await database.query("SELECT emailFriend FROM friends WHERE emailFriend = ? AND emailMainUser = ?",
            [emailFriend, req.infoApiKey.email])

        if ( alredyFriend.length > 0 ) {
            database.disConnect();

            return res.status(400).json({errors: "This user is alredy a friend"})
        }

        let mainUser = await database.query("SELECT emailMainUser FROM friends WHERE emailMainUser = ? AND emailMainUser = ?",
            [emailFriend, req.infoApiKey.email])

        if ( mainUser.length > 0 ) {
            database.disConnect();

            return res.status(400).json({errors: "You cannot be your own friend"})
        }

        newFriend = await database.query(
            "INSERT INTO friends (emailMainUser, emailFriend) VALUES (?, ?)",
            [req.infoApiKey.email, emailFriend])
        

    } catch (e) {
        database.disConnect();

        return res.status(400).json({errors: "Error adding new friend"})
    }

    database.disConnect();

    res.json({added: newFriend})
});

routerFriends.delete("/:email", async (req, res) => {
    let email = req.params.email

    if ( email == undefined ) {
        return res.status(400).json({errors: "No email in params"})
    }

    database.connect();

    try {

        let friends = await database.query("SELECT * FROM friends WHERE emailFriend = ? AND emailMainUser = ?", [email, req.infoApiKey.email])

        if (friends.length > 0) {
            await database.query("DELETE FROM friends WHERE emailFriend = ? AND emailMainUser = ?", [email, req.infoApiKey.email])
        }

        let noFriend = friends.find(nF => nF.emailFriend == email)

        if (noFriend == undefined){
            res.status(400).json({errors: "You do not have a friend with this email"})
            return
        }
    
    } catch (e) {
        res.status(400).json({errors: "Error in deleted friends" })
        return
    }
    
    database.disConnect();

    res.json({deleted: true})
});

module.exports = routerFriends;