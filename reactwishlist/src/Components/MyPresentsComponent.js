import { useEffect, useState } from "react";
import { backendURL } from "../Globals";

let MyPresentsComponent = () => {

    let [presents, setPresents] = useState([]);
    let [message, setMessage] = useState("");

    useEffect( () => {
        getPresents();
    }, [])

    let getPresents = async () => {
        let response = await fetch(backendURL + "/presents?apiKey=" + localStorage.getItem("apiKey"))

        if (response.ok) {
            let jsonData = await response.json()
            setPresents(jsonData)
        } else {
            setMessage("Error")
        }
    }

    return (
        <section>
            <h2>Presents</h2>

            { message != "" && <h3 className="errorMessage"> { message } </h3> }

            <div className="presents">
                { presents.map( present =>
                    (
                        <div className="present">
                            <h4>{ present.name }</h4>
                        </div>
                    )
                )}
            </div>
        </section>
    )
}

export default MyPresentsComponent;