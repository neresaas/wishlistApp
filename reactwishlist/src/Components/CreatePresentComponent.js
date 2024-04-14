import { useState } from "react";
import { backendURL } from "../Globals";
import { useNavigate } from "react-router-dom";

let CreatePresentComponent = () => {
    let [message, setMessage] = useState("");
    let [present, setPresent] = useState({});

    let navigate = useNavigate();

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
            navigate("/myPresents")
        } else {
            setMessage("Error creating present")
        }
    }

    return (
        <div>
            <h2>Create present</h2>

            { message != "" && <h3 className="errorMessage"> { message } </h3> }

            <div className="center-box">
                <div className="form-group">
                    <input type="text" placeholder="Name" onChange={ (e) => changeProperty("name", e) }></input>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Description" onChange={ (e) => changeProperty("description", e) }></input>
                </div>
                <div className="form-group">
                    <input type="url" placeholder="URL" onChange={ (e) => changeProperty("url", e) }></input>
                </div>
                <div className="form-group">
                    <input type="number" placeholder="Price" onChange={ (e) => changeProperty("price", e) }></input>
                </div>
               <button onClick={clickCreate}>Create Present</button>                
            </div>
        </div>
    )
}

export default CreatePresentComponent;