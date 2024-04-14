import { useState } from "react";
import { backendURL } from "../Globals";
import { useNavigate } from "react-router-dom";

let AddFriendsComponent = () => {
    let [emailFriend, setEmailFriend] = useState("");
    let [message, setMessage] = useState("");

    let navigate = useNavigate();
    
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
            navigate("/friends")
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