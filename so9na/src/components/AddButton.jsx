import React from "react";
import { Link } from "react-router-dom";

const AddButton = (props) => {
    const { button } = props;
    return (
        <div className={{ button } ? "add-service  inactive" : "add-service"}>
            <Link to="/profilUser/addService">
                <button className="add-service-button">
                    <p>Créer un service</p>
                </button>
            </Link>
        </div>
    );
};

export default AddButton;
