import { useEffect, useState } from "react";
import { backendURL } from "../Globals";
import { useNavigate } from "react-router-dom";

let MyFriendsComponent = () => {

    let [friends, setFriends] = useState([]);
    let [message, setMessage] = useState("");

    let navigate = useNavigate();

    useEffect( () => {
        getFriends();
    }, [])

    let getFriends = async () => {
        let response = await fetch(backendURL + "/friends?apiKey=" + localStorage.getItem("apiKey"))

        if (response.ok) {
            let jsonData = await response.json()
            setFriends(jsonData)
        } else {
            setMessage("Error")
        }
    }

    let deleteFriend = async (emailFriend) => {
        let response = await fetch(backendURL + "/friends/" + emailFriend + "?apiKey=" + localStorage.getItem("apiKey"), {
            method: "DELETE"
        })

        if (response.ok) {
            let updatedFriend = friends.filter(friend => friend.emailFriend != emailFriend)
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
        <section>
            <h2>Friends</h2>

            { message != "" && <h3 className="errorMessage"> { message } </h3> }

            <div className="presents">

                <button className="friend-btn" onClick={addFriend}>Add friend</button>

                { friends.map( friend =>   
                    (
                        <div className="div-presents">
                            <div className="present">
                                <h4>{ friend.emailFriend }</h4>
                            </div>

                            <button onClick={ () => {deleteFriend(friend.emailFriend)}} className="delete-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                                </svg>
                            </button>
                        </div>
                    )
                )}
            </div>
        </section>
    )
}

export default MyFriendsComponent;