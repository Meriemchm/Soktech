import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client.js";
import ServiceListVisit from "./ServiceListVisit";
import ProjectListVisit from "./ProjectListVisit";

const ProfilUserVisit = ({ service, response, User }) => {
    let chatRef = useRef();
    const [toggleState, setToggleState] = useState(1);
    const [show, setShow] = useState(false);

    const toggleTab = (index) => {
        setToggleState(index);
    };
    const handleShow = () => setShow(!show);

    console.log(service);
    useEffect(() => {
        let handler = (e) => {
            if (!chatRef.current.contains(e.target)) {
                setShow(false);
            }
        };

        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        };
    });

    const competences = User[0].competence
        ? JSON.parse(User[0].competence)
        : [];
    const diplome = User[0].competence ? JSON.parse(User[0].diplome) : [];
    const UserDescription = User[0].bio;
   
    const photo = `http://localhost:8000/storage/users/${User[0].photo}`;
    const  userName= User[0].name
    return (
        <div className="header-wrapper">
            <div className="cols-container">
                <div className="left-col">
                    <div className="img-container">
                        <img src={photo} alt="userPic" />
                    </div>

                    <div className="stuff">
                        <h2>{userName}</h2>
                       {/*  <div
                            className={
                                User[0].NumeroCarte
                                    ? "profil-stars"
                                    : "profil-stars inactive "
                            }
                        >
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <i className="fa fa-star" aria-hidden="true"></i>
                        </div> */}
                        <p className="description-user">{UserDescription}</p>
                    </div>

                    {/* <div className="content">
                        <ul>
                            <li>
                                <i className="fab fa-twitter"></i>
                            </li>

                            <li>
                                <i className="fab fa-facebook"></i>
                            </li>
                        </ul>
                    </div> */}
                    <div
                        className={
                            User[0].NumeroCarte
                                ? "profil-information"
                                : "profil-information inactive "
                        }
                    >
                        <h3>A propos</h3>
                        <div className="profil-competence">
                            <h4>Competence</h4>{" "}
                            {competences.map((competence) => (
                                <div className="profil-competence-container">
                                    <p key={competence}>{competence}</p>
                                </div>
                            ))}
                        </div>
                        <div className="profil-diplome">
                            <h4>Diplome</h4>{" "}
                            {diplome.map((diplomes) => (
                                <div className="profil-diplome-container">
                                    <p key={diplomes}>{diplomes}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="right-col">
                    <div className="bloc-tabs">
                        <ul>
                            <li
                                className={
                                    toggleState === 1 ? "active-tabs" : "tabs"
                                }
                                onClick={() => toggleTab(1)}
                            >
                                Solution
                            </li>
                            <li
                                className={
                                    toggleState === 2 ? "active-tabs" : "tabs"
                                }
                                onClick={() => toggleTab(2)}
                            >
                                Probleme
                            </li>
                        </ul>
                    </div>
                    <div className="content-right">
                        <div
                            className={
                                toggleState === 1
                                    ? "toggle-content  active-content"
                                    : "toggle-content"
                            }
                        >
                            <>
                                <div className="service-list-categories">
                                    <ServiceListVisit services={service} />
                                </div>
                            </>
                        </div>
                        <div
                            className={
                                toggleState === 2
                                    ? "toggle-content  active-content"
                                    : "toggle-content"
                            }
                        >
                            <div className="project-list-categories">
                                <ProjectListVisit responses={response} /> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="chat-container">
                <div className="bubble-chat" onClick={handleShow}>
                    <i class="fa fa-comments" aria-hidden="true"></i>
                </div>
                <div
                    className={show ? "chat-profil active" : "chat-profil"}
                    ref={chatRef}
                >
                    <Chat />
                </div>
            </div> */}
        </div>
    );
};

export default ProfilUserVisit;
