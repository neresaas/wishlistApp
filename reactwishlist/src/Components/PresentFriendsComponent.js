import { useEffect, useState } from "react";
import { backendURL } from "../Globals";
import { useParams } from "react-router-dom";

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

    return (
        <section className="edit-details">
            <h2>Present</h2>

            { message != "" && <h3 className="errorMessage"> { message } </h3> }
            
            <table>
                <caption><h3>{ present.name }</h3></caption>
                <tr>
                    <th scope="row">Description</th>
                    <td>{ present.description }</td>
                </tr>
                <tr>
                    <th scope="row">URL</th>
                    <td>{ present.url }</td>
                </tr>
                <tr>
                    <th scope="row">Price</th>
                    <td>{ present.price } €</td>
                </tr>
                <tr>
                    <th scope="row">Choose by</th>
                    <td>{ present.chosenBy }</td>
                </tr>               
            </table>

            <button className="choose-btn" onClick={clickChoose}>Choose</button>
        </section>
    ) 
}

export default PresentFriendsComponent;