import { useEffect, useState } from "react";
import { backendURL } from "../Globals";
import { Link } from "react-router-dom";

let GiftFriendComponent = () => {
    let [presents, setPresents] = useState([]);
    let [emailFriend, setEmailFriend] = useState(null);
    let [message, setMessage] = useState("");
    let [error, setError] = useState({});

    useEffect( () => {
        checkInputErrors();
    }, [emailFriend])

    let checkInputErrors = () => {
        let updatedErrors = {}

        if ( emailFriend == "" || emailFriend?.length < 3 || (emailFriend != null && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailFriend) == false) ) {
            updatedErrors.emailFriend = "Incorrect email format"
        }

        setError(updatedErrors);
    }

    let changeUserEmail = (e) => {
        setEmailFriend(e.target.value)
    }

    let getPresents = async () => {
        console.log(emailFriend)

        let response = await fetch(backendURL + "/presents?userEmail=" + emailFriend + "&apiKey=" + localStorage.getItem("apiKey"))

        console.log(response)

        if (response.ok) {
            let jsonData = await response.json()
            setPresents(jsonData)
        } else {
            let jsonData = await response.json();
            setMessage(jsonData.errors)
        }
    }
    
    return (
        <div>
            <h2>Search presents</h2>

            { message != "" && <h3 className="errorMessage"> { message } </h3> }

            <div className="center-box">
                <div className="form-group">
                    <input type="text" value={emailFriend} onChange={changeUserEmail} placeholder="Email Friend"></input>
                </div>
                { error.emailFriend && <p className="errorForm"> { error.emailFriend } </p> }

               <button onClick={getPresents}>Search</button>             
            </div>

            { presents.length > 0 && presents.map( present =>   
                    (   
                        <Link to={"/gift/" + present.id}>
                                <div className="present-friend">
                                    <h4>{ present.name }</h4>
                                </div>
                        </Link>                        
                    )
                )}
        </div>
    )
}

export default GiftFriendComponent;