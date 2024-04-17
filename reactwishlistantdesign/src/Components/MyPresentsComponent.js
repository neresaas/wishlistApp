import { useEffect, useState } from "react";
import { backendURL } from "../Globals";
import { Link } from "react-router-dom";
import { Alert, Button, Card, List } from "antd";

let MyPresentsComponent = (props) => {
    let { createNotification } = props;

    let [presents, setPresents] = useState([]);
    let [message, setMessage] = useState("");
    
    useEffect( () => {
        getPresents();
    }, [])

    let getPresents = async () => {
        let response = await fetch(backendURL + "/presents?apiKey=" + localStorage.getItem("apiKey"))

        if (response.ok) {
            let jsonData = await response.json();
            setPresents(jsonData)

        } else {
            let jsonData = await response.json();
            setMessage(jsonData.errors)
        }
    }

    let deletePresent = async (id) => {
        let response = await fetch(backendURL + "/presents/" + id + "?apiKey=" + localStorage.getItem("apiKey"), {
            method: "DELETE"
        })

        if (response.ok) {
            let updatedPresent = presents.filter(present => present.id != id)
            createNotification("Present deleted successfully", "success")
            setPresents(updatedPresent)
            
        } else {
            let jsonData = await response.json();
            setMessage(jsonData.errors)
        }
    }

    return (
        <>
            <h2 style={{ textAlign: "center" }}>Presents</h2>

            { message != "" && <Alert type="error" style={{marginBottom:"10px"}} message = { message }/> }

            <List grid={ {
                gutter: 16,
                xs:1,
                sm: 2,
                md: 4,
                lg: 4,
                xl: 6,
                xxl: 6
            } }
                dataSource={presents} renderItem={ (present) => (
                <List.Item>
                    <Link to={"/present/" + present.id}>
                        <Card style={{ textAlign: "center" }} hoverable>    
                            <h4 style={{color:"#192466"}}>{ present.name }</h4>  
                        </Card>
                    </Link>

                    <Button type="primary" onClick={ () => {deletePresent(present.id)}} block style={{marginTop: "10px"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                        </svg>
                        </Button>
                </List.Item>
                ) }>
            </List>
        </>
    )
}

export default MyPresentsComponent;