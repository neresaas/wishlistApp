import { useEffect, useState } from "react";
import { backendURL } from "../Globals";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Card, Col, Input, Row, Typography } from "antd";

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

        if ( emailFriend == "" || emailFriend?.length < 3 ||
        (emailFriend != null && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailFriend) == false) ) {
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

    let { Text } = Typography;
      
    return (
        <Row align="middle" justify="center" style={{minHeight: "70vh"}}>
            <Col>
            { message != "" && <Alert type="error" style={{marginBottom:"10px"}} message = { message }/> }
            
                <Card title="Add Friend" style={{ width: "400px" }}>

                <Input size="large" autoFocus type="text" placeholder="Email Friend" onChange={changeEmailFriend}/>
                
                { error.emailFriend && <Text style={{ display: "block", marginBottom: "5px"}} type= "danger"> { error.emailFriend } </Text> }

                <Button type="primary" style={{marginTop: "5px"}} onClick={clickAddFriend}>Add Friend</Button>
                </Card>
            </Col>
        </Row>
    )
}

export default AddFriendsComponent;