import { useEffect, useState } from "react";
import { backendURL } from "../Globals";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Card, Col, Input, Row, Typography } from "antd";

let CreatePresentComponent = (props) => {
    let { createNotification } = props;

    let [message, setMessage] = useState("");
    let [present, setPresent] = useState({});
    let [error, setError] = useState({});

    let navigate = useNavigate();

    useEffect( () => {
        checkInputErrors();
    }, [present])

    let checkInputErrors = () => {
        let updatedErrors = {}
        
        if ( present.name == "" || present.name?.length < 3 ) {
            updatedErrors.name = "Must have at least 3 characters"
        }
        
        if ( present.description == "" || present.description?.length < 10 ) {
            updatedErrors.description = "Must have at least 10 characters"
        }
        
        if ( present.url == "" || (present.url != null &&
        /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/.test(present.url) == false) ) {
            updatedErrors.url = "Incorrect URL format"
        }

        if ( present.price == "" || present.price <= 0 ) {
            updatedErrors.price = "Must be higher than 0"
        }

        setError(updatedErrors);
    }

    let changeProperty = (propertyName, e) => {
        let presentNew = { ...present, [propertyName] : e.currentTarget.value }
        setPresent(presentNew)
    }

    let clickCreate = async () => {
        let response = await fetch(backendURL + "/presents?apiKey=" + localStorage.getItem("apiKey"), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify (present)
        })

        if ( response.ok ) {
            let jsonData = await response.json();
            createNotification("Present created", "success")
            navigate("/myPresents")

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

                <Card title="Create present" style={{ width: "500px", marginTop: "15px" }}>

                    <Input size="large" autoFocus type="text" placeholder="Name"
                    onChange={ (e) => changeProperty("name", e) }/>
                        
                    { error.name && <Text type= "danger"> { error.name } </Text> }

                    <Input size="large" style={{ marginTop:"10px" }} type="text" placeholder="Description"
                    onChange={ (e) => changeProperty("description", e) }/>

                    { error.description && <Text type= "danger"> { error.description } </Text> }

                    <Input size="large" style={{ marginTop:"10px" }} type="url" placeholder="URL"
                    onChange={ (e) => changeProperty("url", e) }/>

                    { error.url && <Text type= "danger"> { error.url } </Text> }

                    <Input size="large" style={{ marginTop:"10px" }} type="number" placeholder="Price"
                    onChange={ (e) => changeProperty("price", e) }/>

                    { error.price && <Text type= "danger"> { error.price } </Text> }

                    <Button type="primary" style={{ marginTop:"10px" }} onClick={clickCreate} block>Create Present</Button>
                    
                </Card>
            </Col>
        </Row>
    )
}

export default CreatePresentComponent;