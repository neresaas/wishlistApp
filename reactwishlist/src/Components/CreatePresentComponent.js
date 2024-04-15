import { useEffect, useState } from "react";
import { backendURL } from "../Globals";
import { useNavigate } from "react-router-dom";

let CreatePresentComponent = () => {
    let [message, setMessage] = useState("");
    let [present, setPresent] = useState({});
    let [error, setError] = useState({});

    let navigate = useNavigate();

    useEffect( () => {
        checkInputErrors();
    }, [present])

    let checkInputErrors = () => {
        let updatedErrors = {}
        
        if ( present.name == "" || present.name?.length < 3 ) {
            updatedErrors.name = "Must have at least 3 characters"
        }
        
        if ( present.description == "" || present.description?.length < 10 ) {
            updatedErrors.description = "Must have at least 10 characters"
        }
        
        if ( present.url == "" || (present.url != null && /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/.test(present.url) == false) ) {
            updatedErrors.url = "Incorrect URL format"
        }

        if ( present.price == "" || present.price <= 0 ) {
            updatedErrors.price = "Must be higher than 0"
        }

        setError(updatedErrors);
    }

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

    return (
        <div>
            <h2>Create present</h2>

            { message != "" && <h3 className="errorMessage"> { message } </h3> }

            <div className="center-box">
                <div className="form-group">
                    <input type="text" placeholder="Name" onChange={ (e) => changeProperty("name", e) }></input>
                </div>
                { error.name && <p className="errorForm"> { error.name } </p> }

                <div className="form-group">
                    <input type="text" placeholder="Description" onChange={ (e) => changeProperty("description", e) }></input>
                </div>
                { error.description && <p className="errorForm"> { error.description } </p> }

                <div className="form-group">
                    <input type="url" placeholder="URL" onChange={ (e) => changeProperty("url", e) }></input>
                </div>
                { error.url && <p className="errorForm"> { error.url } </p> }

                <div className="form-group">
                    <input type="number" placeholder="Price" onChange={ (e) => changeProperty("price", e) }></input>
                </div>
                { error.price && <p className="errorForm"> { error.price } </p> }

               <button onClick={clickCreate}>Create Present</button>                
            </div>
        </div>
    )
}

export default CreatePresentComponent;