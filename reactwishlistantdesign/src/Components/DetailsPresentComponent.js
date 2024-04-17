import { useEffect, useState } from "react";
import { backendURL } from "../Globals";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Button, Descriptions } from "antd";

let DetailsPresentComponent = () => {

    let [present, setPresent] = useState({});
    let [message, setMessage] = useState("");

    let navigate = useNavigate();

    let { presentId } = useParams();

    useEffect( () => {
        getPresent();
    }, [])

    let getPresent = async () => {
        let response = await fetch(backendURL + "/presents/" + presentId + "?apiKey=" + localStorage.getItem("apiKey"))

        if (response.ok) {
            let jsonData = await response.json();
            setPresent(jsonData)

        } else {
            let jsonData = await response.json();
            setMessage(jsonData.errors)
        }
    }

    let editPresent = (id) => {
        navigate("/present/edit/" + id)
    }
    
    return (
            <div style={{textAlign: "center"}}>
                <h2 style={{paddingBottom: "15px"}}>Present</h2>

                { message != "" && <Alert type="error" style={{marginBottom:"10px"}} message = { message }/> }

                <Descriptions title={present.name} layout="vertical">
                    <Descriptions.Item label="Description" span={2}>{present.description}</Descriptions.Item>

                    <Descriptions.Item label="Price" span={1}>{present.price}</Descriptions.Item>

                    <Descriptions.Item style={{textAlign:"left"}} label="URL" span={3}>{present.url}</Descriptions.Item>

                    <Descriptions.Item>
                        <Button style={{width:"100px"}} type="primary" onClick={ () => {editPresent(present.id)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                            </svg>
                        </Button>
                    </Descriptions.Item>
                </Descriptions>
                
            </div>
    )
}

export default DetailsPresentComponent;