import { useEffect, useState } from "react";
import { backendURL } from "../Globals";
import { useNavigate } from "react-router-dom";

let LoginUserComponent = (props) => {
    let { setLogin } = props;

    let [email, setEmail] = useState(null);
    let [password, setPassword] = useState(null);
    let [message, setMessage] = useState("");
    let [error, setError] = useState({});

    let navigate = useNavigate();

    useEffect( () => {
        checkInputErrors();
    }, [email, password])

    let checkInputErrors = () => {
        let updatedErrors = {}

        if ( email == "" || email?.length < 3 || (email != null &&
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) == false) ) {
            updatedErrors.email = "Incorrect email format"
        }

        if ( password == "" || password?.length < 5 ) {
            updatedErrors.password = "Too short password"
        }

        setError(updatedErrors);
    }

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

            if (jsonData.apiKey != null) {
            localStorage.setItem("apiKey", jsonData.apiKey);
            localStorage.setItem("userId", jsonData.id);
            localStorage.setItem("email", jsonData.email);
            }

            navigate("/myPresents")

            setLogin(true)
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
        <section>
            <h2>Login user</h2>

            { message != "" && <h3 className="errorMessage"> { message } </h3> }

            <div className="center-box">
                <div className="form-group">
                    <input autoFocus type="text" placeholder="Your email" onChange={changeEmail}></input>
                </div>

                { error.email && <p className="errorForm"> { error.email } </p> }

                <div className="form-group">
                    <input type="password" placeholder="Your password" onChange={changePassword}></input>
                </div>
                
                { error.password && <p className="errorForm"> { error.password } </p> }

               <button onClick={clickLogin}>Login</button>                
            </div>
        </section>
    )
}

export default LoginUserComponent;