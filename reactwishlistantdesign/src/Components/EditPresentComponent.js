import { useEffect, useState } from "react";
import { backendURL } from "../Globals";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Button, Card, Col, Input, Row, Typography } from "antd";

let EditPresentComponent = (props) => {
    let { createNotification } = props;

    let [present, setPresent] = useState({});
    let [message, setMessage] = useState("");
    let [error, setError] = useState({});

    let navigate = useNavigate();
    
    useEffect( () => {
        checkInputErrors();
    }, [present])

    let checkInputErrors = () => {
        let updatedErrors = {}
        
        if ( present.name == "" || present.name?.length < 3 ) {
            updatedErrors.name = "Incorrect name format"
        }

        if ( present.description == "" || present.description?.length < 10 ) {
            updatedErrors.description = "Incorrect description format"
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

    let { presentId } = useParams();

    let changeProperty = (propertyName, e) => {
        let presentNew = { ...present, [propertyName] : e.currentTarget.value }
        setPresent(presentNew)
    }

    let clickEdit = async () => {
        let response = await fetch(backendURL + "/presents/" + presentId + "?apiKey=" + localStorage.getItem("apiKey"), {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify (present)
        })

        if ( response.ok ) {
            let jsonData = await response.json();
            createNotification("Present edited successfully", "success")
            navigate("/present/" + presentId)

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

    useEffect( () => {
        getPresent();
    }, [])

    let getPresent = async () => {
        let response = await fetch(backendURL + "/presents/" + presentId + "?apiKey=" + localStorage.getItem("apiKey"))

        if (response.ok) {
            let jsonData = await response.json();
            setPresent(jsonData)

        } else {
            setMessage("Error")
        }
    }

    let { Text } = Typography;

    return (
        <Row align="middle" justify="center" style={{minHeight: "70vh"}}>
            <Col>
            { message != "" && <Alert type="error" style={{marginBottom:"10px"}} message = { message }/> }

                <Card title="Edit present" style={{ width: "500px" }}>

                    <Input size="large" type="text" placeholder="Name" value={ present.name }
                    onChange={ (e) => { changeProperty("name", e) }}/>

                    { error.name && <Text type="danger"> { error.name } </Text>  }
                    
                    <Input size="large" style={{ marginTop:"10px" }} type="text" placeholder="Description" value={ present.description }
                    onChange={ (e) => { changeProperty("description", e) }}/>

                    { error.description && <Text type="danger"> { error.description } </Text> }

                    <Input size="large" style={{ marginTop:"10px" }} type="url" placeholder="URL" value={ present.url }
                    onChange={ (e) => { changeProperty("url", e) }}/>
                    
                    { error.url && <Text type="danger"> { error.url } </Text> }

                    <Input size="large" style={{ marginTop:"10px" }} type="number" placeholder="Price" value={ present.price }
                    onChange={ (e) => { changeProperty("price", e) }}/>
                        
                    { error.price && <Text type="danger"> { error.price } </Text> }

                    <Button type="primary" style={{ marginTop:"10px" }} onClick={clickEdit} block>Edit Present</Button>
                    
                </Card>
            </Col>
        </Row>
    )
}

export default EditPresentComponent;