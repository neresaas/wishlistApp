import { useEffect, useState } from "react";
import { backendURL } from "../Globals";
import { useParams } from "react-router-dom";

let DetailsPresentComponent = () => {

    let [present, setPresent] = useState({});
    let [message, setMessage] = useState("");

    let { presentId } = useParams();

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
            </table>
        </section>
    )
}

export default DetailsPresentComponent;