import { useEffect, useState } from "react";
import { backendURL } from "../Globals";
import { useNavigate } from "react-router-dom";

let AddFriendsComponent = (props) => {
    let { createNotification } = props

    let [emailFriend, setEmailFriend] = useState(null);
    let [message, setMessage] = useState("");
    let [error, setError] = useState({});

    let navigate = useNavigate();
    
    useEffect( () => {
        checkInputErrors();
    }, [emailFriend])

    let checkInputErrors = () => {
        let updatedErrors = {}

        if ( emailFriend == "" || emailFriend?.length < 3 || (emailFriend != null && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailFriend) == false) ) {
            updatedErrors.emailFriend = "Incorrect email format"
        }

        setError(updatedErrors);
    }
    
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
            createNotification("New friend added")
            navigate("/friends")
        } else {
            let jsonData = await response.json();

            if (Array.isArray(jsonData.errors)) {
                let finalErrorMessage = "";
                jsonData.errors.forEach(obj => {
                    finalErrorMessage += obj.errors + " "})
                setMessage(finalErrorMessage)

            } else {
                setMessage(jsonData.errors)
            }
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
                { error.emailFriend && <p className="errorForm"> { error.emailFriend } </p> }

               <button onClick={clickAddFriend}>Add Friend</button>                
            </div>
        </div>
    )
}

export default AddFriendsComponent;