import { useState } from "react";
import { backendURL } from "../Globals";

let LoginUserComponent = () => {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [message, setMessage] = useState("");

    let changeEmail = (e) => {
        setEmail(e.currentTarget.value)
    }

    let changePassword = (e) => {
        setPassword(e.currentTarget.value)
    }

    let clickLogin = async () => {
        let response = await fetch(backendURL + "/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify ({
                email: email,
                password: password
            })
        })

        if ( response.ok ) {
            let jsonData = await response.json();
            setMessage("Valid login")
        } else {
            setMessage("Not user found")
        }
    }

    return (
        <div>
            <h2>Login user</h2>

            { message != "" && <h3 className="errorMessage"> { message } </h3> }

            <div className="center-box">
                <div className="form-group">
                    <input type="text" placeholder="Your email" onChange={changeEmail}></input>
                </div>
                <div className="form-group">
                    <input type="password" placeholder="Your password" onChange={changePassword}></input>
                </div>
               <button onClick={clickLogin}>Login</button>                
            </div>
        </div>
    )
}

export default LoginUserComponent;