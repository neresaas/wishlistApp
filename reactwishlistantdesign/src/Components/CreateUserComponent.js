import { useEffect, useState } from "react";
import { backendURL } from "../Globals";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Card, Col, Input, Row, Typography } from "antd";

let CreateUserComponent = (props) => {
    let {createNotification} = props;

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

        if ( email == "" || email?.length < 3 ||
        (email != null && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) == false) ) {
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
            createNotification("User created successfully", "success")
            navigate("/login")

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

                <Card title="Register user" style={{ width: "500px" }}>
                    <Input size="large" autoFocus type="text" placeholder="Your email" onChange={changeEmail}/>

                    { error.email && <Text type="danger"> { error.email } </Text> }

                    <Input size="large" style={{ marginTop:"10px" }} type="text" placeholder="Your name" onChange={changeName}/>

                    { error.name && <Text type="danger"> { error.name } </Text> }

                    <Input size="large" style={{ marginTop:"10px" }} type="password" placeholder="Your password" onChange={changePassword}/>
                        
                    { error.password && <Text type="danger"> { error.password } </Text> }

                    <Button type="primary" style={{ marginTop:"10px" }} onClick={clickCreate} block>Create Account</Button>

                </Card>
            </Col>
        </Row>
    )
}

export default CreateUserComponent;