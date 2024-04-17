import { useEffect, useState } from "react";
import { backendURL } from "../Globals";
import { useParams } from "react-router-dom";
import { Alert, Button, Table } from "antd";

let PresentFriendsComponent = (props) => {
    let { createNotification } = props;

    let [present, setPresent] = useState({});
    let [message, setMessage] = useState("");

    let { presentId } = useParams();

    let clickChoose = async () => {
        let response = await fetch(backendURL + "/presents/" + presentId + "?apiKey=" + localStorage.getItem("apiKey"), {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify (present)
        })

        if ( response.ok ) {
            let jsonData = await response.json();
            createNotification("Present choosed")
            getPresent();

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

    let columns = [
        {
            title: "Name",
            dataIndex: "name"
        },
        {
            title: "Description",
            dataIndex: "description"
        },
        {
            title: "URL",
            dataIndex: "url"
        },
        {
            title: "Price",
            dataIndex: "price"
        },
        {
            title: "Choose by",
            dataIndex: "chosenBy"
        },
        {
            title: "Choose",
            dataIndex: "id",
            render: (id) => <Button type="primary" onClick={clickChoose}>Choose</Button>
        }
    ]

    return (
            <div style={{textAlign: "center"}}>
                <h2 style={{paddingBottom: "15px"}}>Present</h2>

                { message != "" && <Alert type="error" style={{marginBottom:"10px"}} message = { message }/> }

                <Table tableLayout="fixed" size="middle" columns={columns} dataSource={[present]} pagination={false}/>
            </div>
    ) 
}

export default PresentFriendsComponent;