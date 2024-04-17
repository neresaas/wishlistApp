import { useEffect, useState } from "react";
import { backendURL } from "../Globals";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Card, Col, List, Row } from "antd";

let MyFriendsComponent = (props) => {
    let { createNotification } = props;

    let [friends, setFriends] = useState([]);
    let [message, setMessage] = useState("");

    let navigate = useNavigate();

    useEffect( () => {
        getFriends();
    }, [])

    let getFriends = async () => {
        let response = await fetch(backendURL + "/friends?apiKey=" + localStorage.getItem("apiKey"))

        if (response.ok) {
            let jsonData = await response.json();
            setFriends(jsonData)

        } else {
            let jsonData = await response.json();
            setMessage(jsonData.errors)
        }
    }

    let deleteFriend = async (emailFriend) => {
        let response = await fetch(backendURL + "/friends/" + emailFriend + "?apiKey=" + localStorage.getItem("apiKey"), {
            method: "DELETE"
        })

        if (response.ok) {
            let updatedFriend = friends.filter(friend => friend.emailFriend != emailFriend)
            createNotification("Friend deleted successfully", "success")
            setFriends(updatedFriend)
            
        } else {
            let jsonData = await response.json();
            setMessage(jsonData.errors)
        }
    }

    let addFriend = () => {
        navigate("/friends/addFriend")
    }

    return (
        <>
        <Row justify="center">
            <Col>
            { message != "" && <Alert type="error" style={{marginBottom:"10px"}} message = { message }/> }
            
                <Card title="Friends" style={{ minWidth: "400px", maxWidth: "600px", textAlign:"center" }}>

                    <Button type="primary" onClick={addFriend} block>Add friend</Button>

                </Card>
            </Col>
        </Row>
            <List grid={ {
                    gutter: 16,
                    xs:1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 6,
                    xxl: 6
                } }
                    style={{marginTop: "10px"}}
                    dataSource={friends} renderItem={ (friend) => (
                        <List.Item>
                            <Card style={{ textAlign: "center" }} hoverable>
                                <h4 style={{color:"#192466"}}>{ friend.emailFriend }</h4>
                            </Card>

                            <Button type="primary" onClick={ () => {deleteFriend(friend.emailFriend)}} block style={{marginTop: "10px"}}>
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

export default MyFriendsComponent;