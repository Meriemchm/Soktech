import React from "react";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client.js";
import { Link,useNavigate } from "react-router-dom";

const DropdownProfil = () => {
    const { setUser, setToken } = useStateContext();
    const navigate = useNavigate();

    const onLogout = (ev) => {
        ev.preventDefault();

        axiosClient.post("/logout").then(() => {
            setUser({});
            setToken(null);
            navigate('/');
        });
    };

    return (
        <div className="dropdown-profil">
            <div className="profil-title">
                <h3>Profil</h3>
            </div>
            <div className="profil-container">
                <Link to="/profilUser">Profil</Link>
                <div className="profil-row">
                    <p onClick={onLogout} className="btn-logout">
                        <img src="logout.png" alt="logout" />
                        Deconnexion
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DropdownProfil;
