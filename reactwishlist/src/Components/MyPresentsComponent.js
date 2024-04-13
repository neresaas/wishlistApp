import { useEffect, useState } from "react";
import { backendURL } from "../Globals";
import { Link } from "react-router-dom";

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

    let deletePresent = async (id) => {
        let response = await fetch(backendURL + "/presents/" + id + "?apiKey=" + localStorage.getItem("apiKey"), {
            method: "DELETE"
        })

        if (response.ok) {
            let updatedPresent = presents.filter(present => present.id != id)
            setPresents(updatedPresent)
        } else {
            let jsonData = await response.json();
            setMessage(jsonData.errors)
        }
    }

    return (
        <section>
            <h2>Presents</h2>

            { message != "" && <h3 className="errorMessage"> { message } </h3> }

            <div className="presents">
                { presents.map( present =>   
                    (
                        <div className="div-presents">
                            <Link to={"/present/" + present.id}>
                                <div className="present">
                                    <h4>{ present.name }</h4>
                                </div>
                            </Link>

                            <button onClick={ () => {deletePresent(present.id)}} className="delete-btn">
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

export default MyPresentsComponent;