import React from "react";
import { useNavigate } from "react-router-dom";

export default function Service(props) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/categorie", { state: { service: props } });
    };
   
    return (
        <div className="card" onClick={handleClick}>
            <h3>{props.name}</h3>
            <img
                className="service-image"
                src={props.url}
                alt="service image"
            />
        </div>
    );
}
