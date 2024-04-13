import { useEffect, useState } from "react";
import { backendURL } from "../Globals";
import { useParams } from "react-router-dom";

let EditPresentComponent = () => {

    let [present, setPresent] = useState({});
    let [message, setMessage] = useState("");

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

                <div className="form-group">
                    <input type="text" placeholder="Description" value={ present.description }
                    onChange={ (e) => { changeProperty("description", e) }}/>
                </div>

                <div className="form-group">
                    <input type="url" placeholder="URL" value={ present.url }
                    onChange={ (e) => { changeProperty("url", e) }}/>
                </div>

                <div className="form-group">
                    <input type="number" placeholder="Price" value={ present.price }
                    onChange={ (e) => { changeProperty("price", e) }}/>
                </div>

                <button onClick={clickEdit}>Edit Present</button>               
            </div>
        </section>
    )
}

export default EditPresentComponent;