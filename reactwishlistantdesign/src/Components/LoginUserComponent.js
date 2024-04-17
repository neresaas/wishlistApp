import { useEffect, useState } from "react";
import { backendURL } from "../Globals";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Card, Col, Input, Row, Typography } from "antd";

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

    let { Text } = Typography;

    return (
        <Row align="middle" justify="center" style={{minHeight: "70vh"}}>
            <Col>
            { message != "" && <Alert type="error" style={{marginBottom:"10px"}} message = { message }/> }
                <Card title="Login" style={{ width: "500px" }}>
                    <Input size="large" autoFocus type="text" placeholder="Your email" onChange={changeEmail}/>
                    
                    { error.email && <Text type="danger"> { error.email } </Text> }

                    <Input size="large" style={{ marginTop:"10px" }} type="password" placeholder="Your password" onChange={changePassword}/>
                        
                    { error.password &&  <Text type="danger"> { error.password } </Text> }

                    <Button type="primary" style={{ marginTop:"10px" }} onClick={clickLogin} block>Login</Button>
                </Card>
            </Col>
        </Row>
    )
}

export default LoginUserComponent;