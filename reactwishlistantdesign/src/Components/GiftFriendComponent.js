import { useEffect, useState } from "react";
import { backendURL } from "../Globals";
import { Link } from "react-router-dom";
import { Alert, Button, Card, Col, Input, List, Row, Typography } from "antd";

let GiftFriendComponent = (props) => {
    let { createNotification } = props;

    let [presents, setPresents] = useState([]);
    let [emailFriend, setEmailFriend] = useState(null);
    let [message, setMessage] = useState("");
    let [error, setError] = useState({});

    useEffect( () => {
        checkInputErrors();
    }, [emailFriend])

    let checkInputErrors = () => {
        let updatedErrors = {}

        if ( emailFriend == "" || emailFriend?.length < 3 || (emailFriend != null &&
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailFriend) == false) ) {
            updatedErrors.emailFriend = "Incorrect email format"
        }

        setError(updatedErrors);
    }

    let changeUserEmail = (e) => {
        setEmailFriend(e.target.value)
    }

    let getPresents = async () => {

        let response = await fetch(backendURL + "/presents?userEmail=" + emailFriend + "&apiKey=" + localStorage.getItem("apiKey"))

        if (response.ok) {
            let jsonData = await response.json();
            setPresents(jsonData)

            if (emailFriend == undefined || (emailFriend != undefined && jsonData.length == 0)) {
                createNotification("Not found any present", "error")
            }

        } else {
            let jsonData = await response.json();
            setMessage(jsonData.errors)
        }
    }

    let { Text } = Typography;
    
    return (
        <>
            <Row align="middle" justify="center" style={{minHeight: "40vh"}}>
                <Col>
                { message != "" && <Alert type="error" style={{marginBottom:"10px"}} message = { message }/> }

                    <Card title="Search presents" style={{ width: "400px" }}>

                        <Input size="large" autoFocus type="text" value={emailFriend}
                        onChange={changeUserEmail} placeholder="Email Friend"/>
                            
                        { error.emailFriend && <Text type="danger"> { error.emailFriend } </Text> }

                        <Button type="primary" style={{ marginTop:"10px" }} onClick={getPresents} block>Search</Button>
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
                    dataSource={presents} renderItem={ (present) => (
                    <List.Item>
                        <Link to={"/gift/" + present.id}>
                                    <Card style={{ textAlign: "center" }} hoverable>
                                        <h4 style={{color:"#192466"}}>{ present.name }</h4>
                                    </Card>
                                </Link> 
                    </List.Item>
                    )}>
            </List>
        </>
    )
}

export default GiftFriendComponent;