import { useState } from "react";
import { backendURL } from "../Globals";

let AddFriendsComponent = () => {
    let [emailFriend, setEmailFriend] = useState("");
    let [message, setMessage] = useState("");
    
    let changeEmailFriend = (e) => {
        setEmailFriend(e.currentTarget.value)
    }

    let clickAddFriend = async () => {
        let response = await fetch(backendURL + "/friends?apiKey="  + localStorage.getItem("apiKey"), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify ({
                emailFriend: emailFriend
            })
        })

        if ( response.ok ) {
            let jsonData = await response.json();
            setMessage("New friend added")
        } else {
            let jsonData = await response.json();
            setMessage(jsonData.errors)
        }
    }
    
    return (
        <div>
            <h2>Add Friend</h2>

            { message != "" && <h3 className="errorMessage"> { message } </h3> }

            <div className="center-box">
                <div className="form-group">
                    <input type="text" placeholder="Email Friend" onChange={changeEmailFriend}></input>
                </div>

               <button onClick={clickAddFriend}>Add Friend</button>                
            </div>
        </div>
    )
}

export default AddFriendsComponent;