import { useState } from "react";
import { backendURL } from "../Globals";
import { useNavigate } from "react-router-dom";

let CreateUserComponent = () => {
    let [email, setEmail] = useState("");
    let [name, setName] = useState("");
    let [password, setPassword] = useState("");
    let [message, setMessage] = useState("");

    let navigate = useNavigate();
    
    let changeEmail = (e) => {
        setEmail(e.currentTarget.value)
    }

    let changeName = (e) => {
        setName(e.currentTarget.value)
    }

    let changePassword = (e) => {
        setPassword(e.currentTarget.value)
    }

    let clickCreate = async () => {
        let response = await fetch(backendURL + "/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify ({
                email: email,
                name: name,
                password: password
            })
        })

        if ( response.ok ) {
            let jsonData = await response.json();
            navigate("/login")
            //setMessage("New user created")
        } else {
            setMessage("Error creating user")
        }
    }

    return (
        <div>
            <h2>Register user</h2>

            { message != "" && <h3 className="errorMessage"> { message } </h3> }

            <div className="center-box">
                <div className="form-group">
                    <input type="text" placeholder="Your email" onChange={changeEmail}></input>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Your name" onChange={changeName}></input>
                </div>
                <div className="form-group">
                    <input type="password" placeholder="Your password" onChange={changePassword}></input>
                </div>
               <button onClick={clickCreate}>Create Account</button>                
            </div>
        </div>
    )
}

export default CreateUserComponent;