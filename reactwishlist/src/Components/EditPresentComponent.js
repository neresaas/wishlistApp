import { useEffect, useState } from "react";
import { backendURL } from "../Globals";
import { useNavigate, useParams } from "react-router-dom";

let EditPresentComponent = () => {

    let [present, setPresent] = useState({});
    let [message, setMessage] = useState("");
    let [error, setError] = useState({});

    let navigate = useNavigate();

    useEffect( () => {
        checkInputErrors();
    }, [present])

    let checkInputErrors = () => {
        let updatedErrors = {}
        
        if ( present.name == "" || present.name?.length < 3 ) {
            updatedErrors.name = "Incorrect name format"
        }

        if ( present.description == "" || present.description?.length < 10 ) {
            updatedErrors.description = "Incorrect description format"
        }
        
        if ( present.url == "" || (present.url != null && /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/.test(present.url) == false) ) {
            updatedErrors.url = "Incorrect URL format"
        }

        if ( present.price == "" || present.price <= 0 ) {
            updatedErrors.price = "Must be higher than 0"
        }

        setError(updatedErrors);
    }

    let { presentId } = useParams();

    let changeProperty = (propertyName, e) => {
        let presentNew = { ...present, [propertyName] : e.currentTarget.value }
        setPresent(presentNew)
    }

    let clickEdit = async () => {
        let response = await fetch(backendURL + "/presents/" + presentId + "?apiKey=" + localStorage.getItem("apiKey"), {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify (present)
        })

        if ( response.ok ) {
            let jsonData = await response.json();
            navigate("/present/" + presentId)
        } else {
            let jsonData = await response.json();
            setMessage(jsonData.errors)
        }
    }

    useEffect( () => {
        getPresent();
    }, [])

    let getPresent = async () => {
        let response = await fetch(backendURL + "/presents/" + presentId + "?apiKey=" + localStorage.getItem("apiKey"))

        if (response.ok) {
            let jsonData = await response.json()
            setPresent(jsonData)
        } else {
            setMessage("Error")
        }
    }

    return (
        <section>
            <h2>Edit present</h2>

            { message != "" && <h3 className="errorMessage"> { message } </h3> }

            <div className="center-box">
                <div className="form-group">
                    <input type="text" placeholder="Name" value={ present.name }
                    onChange={ (e) => { changeProperty("name", e) }}/>
                </div>
                { error.name && <p className="errorForm"> { error.name } </p> }

                <div className="form-group">
                    <input type="text" placeholder="Description" value={ present.description }
                    onChange={ (e) => { changeProperty("description", e) }}/>
                </div>
                { error.description && <p className="errorForm"> { error.description } </p> }

                <div className="form-group">
                    <input type="url" placeholder="URL" value={ present.url }
                    onChange={ (e) => { changeProperty("url", e) }}/>
                </div>
                { error.url && <p className="errorForm"> { error.url } </p> }

                <div className="form-group">
                    <input type="number" placeholder="Price" value={ present.price }
                    onChange={ (e) => { changeProperty("price", e) }}/>
                </div>
                { error.price && <p className="errorForm"> { error.price } </p> }

                <button onClick={clickEdit}>Edit Present</button>               
            </div>
        </section>
    )
}

export default EditPresentComponent;