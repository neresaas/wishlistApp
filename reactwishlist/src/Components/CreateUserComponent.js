import { useEffect, useState } from "react";
import { backendURL } from "../Globals";
import { useNavigate } from "react-router-dom";

let CreateUserComponent = () => {
    let [email, setEmail] = useState(null);
    let [name, setName] = useState(null);
    let [password, setPassword] = useState(null);
    let [message, setMessage] = useState("");
    let [error, setError] = useState({});

    let navigate = useNavigate();

    useEffect( () => {
        checkInputErrors();
    }, [email, name, password])

    let checkInputErrors = () => {
        let updatedErrors = {}

        if ( email == "" || email?.length < 3 || (email != null && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) == false) ) {
            updatedErrors.email = "Incorrect email format"
        }

        if ( name == "" || name?.length < 2 ) {
            updatedErrors.name = "Must have at least 2 characters"
        }
        
        if ( password == "" || password?.length < 5 ) {
            updatedErrors.password = "Too short password"
        }

        setError(updatedErrors);
    }
    
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
            <h2>Register user</h2>

            { message != "" && <h3 className="errorMessage"> { message } </h3> }

            <div className="center-box">
                <div className="form-group">
                    <input type="text" placeholder="Your email" onChange={changeEmail}></input>
                </div>
                { error.email && <p className="errorForm"> { error.email } </p> }

                <div className="form-group">
                    <input type="text" placeholder="Your name" onChange={changeName}></input>
                </div>
                { error.name && <p className="errorForm"> { error.name } </p> }

                <div className="form-group">
                    <input type="password" placeholder="Your password" onChange={changePassword}></input>
                </div>
                { error.password && <p className="errorForm"> { error.password } </p> }

               <button onClick={clickCreate}>Create Account</button>                
            </div>
        </div>
    )
}

export default CreateUserComponent;