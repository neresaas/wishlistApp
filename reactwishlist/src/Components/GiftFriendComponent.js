import { useState } from "react";
import { backendURL } from "../Globals";
import { Link } from "react-router-dom";

let GiftFriendComponent = () => {
    let [presents, setPresents] = useState([]);
    let [inputValue, setInputValue] = useState("");
    let [message, setMessage] = useState("");

    let changeUserEmail = (e) => {
        setInputValue(e.target.value)
    }

    let getPresents = async () => {
        console.log(inputValue)

        let response = await fetch(backendURL + "/presents?userEmail=" + inputValue + "&apiKey=" + localStorage.getItem("apiKey"))

        console.log(response)

        if (response.ok) {
            let jsonData = await response.json()
            setPresents(jsonData)
        } else {
            setMessage("Error")
        }
    }
    
    return (
        <div>
            <h2>Search presents</h2>

            { message != "" && <h3 className="errorMessage"> { message } </h3> }

            <div className="center-box">
                <div className="form-group">
                    <input type="text" value={inputValue} onChange={changeUserEmail} placeholder="Email Friend"></input>
                </div>

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