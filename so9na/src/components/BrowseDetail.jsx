import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import { useStateContext } from "../contexts/ContextProvider";

const BrowseDetail = ({ response, users, name }) => {
    const [toggleState, setToggleState] = useState(1);
    const { user } = useStateContext();
    const navigate = useNavigate();
    const photo = `http://localhost:8000/storage/users/${users[0].photo}`;
    const userName = users[0].name;
    const userId = user.id;
    const toggleTab = (index) => {
        setToggleState(index);
    };

    const responses = JSON.parse(response.reponses);
    const questions = JSON.parse(response.questions);

    return (
        <>
            <Breadcrumbs />
            <div className="browse-detail">
                <div className="Header-browse">
                    <div className="Header-container">
                        <div className="profil-Detail">
                            <div className="img-container">
                                <img src={photo} alt="ImgUser" />
                            </div>
                            <div className="profil-rows">
                                <h2
                                    className="userName"
                                    onClick={() => {
                                        navigate(
                                            `/browse/browseDetail/${response.id}/profilUser/${response.userId}`,
                                            { state: { response } }
                                        );
                                    }}
                                >
                                    {userName}
                                </h2>
                                {/*   <div className="profil-row">
                  <button className="contact-button">
                    Contact
                  </button>
                </div> */}
                            </div>
                        </div>

                        <div key={responses.id} className="project-detail">
                            <p className="description-Detail">{responses[0]}</p>
                        </div>
                    </div>

                    <div className="Right">
                        <div className="content-tabs">
                            <div
                                className={
                                    toggleState === 1
                                        ? "content  active-content"
                                        : "content"
                                }
                            >
                                <div className="detail-content">
                                    <h3>Cela suscite votre intérêt ?</h3>
                                    <p>
                                        Proposez votre offre la plus attrayante
                                        pour vous démarquer des autres.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="right-button">
                            {userId !== response.userId && (
                                <button
                                    className="content-button"
                                    onClick={() => {
                                        navigate(
                                            `/browse/browseDetail/${response.id}/interessedform`,
                                            { state: { response } }
                                        );
                                    }}
                                >
                                    Intéresser
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="Container-browse">
                    <div className="Left">
                        <div className="Detail-browse">
                            <h3 className="detail-title">A propos</h3>
                            {questions.slice(1).map((question, index) => {
                                const responseIndex = index + 1;
                                const questionText = `${question}`;
                                const responseText =
                                    responses[responseIndex] ||
                                    "Aucune réponse";

                                return (
                                    <div key={index}>
                                        <h4 className="description-browse">
                                            {questionText}
                                        </h4>
                                        <p className="description-browse">
                                            {responseText}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BrowseDetail;
