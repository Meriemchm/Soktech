import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Setting from "./Setting";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client.js";
import ServiceList from "./ServiceList";
import ProjectList from "./ProjectList";

const ProfilUser = () => {
    let chatRef = useRef();
    const { user, setUser } = useStateContext();
    const [toggleState, setToggleState] = useState(1);
    const [show, setShow] = useState(false);
    const [userLoaded, setUserLoaded] = useState(false);
    const toggleTab = (index) => {
        setToggleState(index);
    };
    const handleShow = () => setShow(!show);
    const [photoUrl, setPhotoUrl] = useState("");

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

    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
            setUserLoaded(true);
            setPhotoUrl(`http://localhost:8000/storage/users/${data.photo}`);
        });
    }, []);

    const competences =
        userLoaded && user.competence ? JSON.parse(user.competence) : [];
    const diplome =
        userLoaded && user.competence ? JSON.parse(user.diplome) : [];

    const handleModifyImage = () => {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "image/*";
        fileInput.addEventListener("change", async (event) => {
            const file = event.target.files[0];
            await updateImage(file);
        });
        fileInput.click();
    };

    const updateImage = async (file) => {
        const formData = new FormData();
        formData.append("photo", file);

        try {
            // Envoyer la requête POST pour stocker l'image sur le serveur
            const response = await axiosClient.post(`/users/photo`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            // Récupérer le nom de fichier de la réponse
            const updatedFilename = response.data.path; // Utiliser 'path' au lieu de 'filename'
            const data = { ["photo"]: updatedFilename };

            // Envoyer la requête PUT pour mettre à jour l'image du service
            try {
                await axiosClient.put(`/user/update`, data);
            } catch (error) {
                console.error(
                    "Erreur lors de la mise à jour de la photo :",
                    error
                );
            }

            setPhotoUrl(
                `http://localhost:8000/storage/users/${updatedFilename}`
            );

            console.log("Modification de l'image réussie");
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'image :", error);
        }
    };

    return (
        <div className="header-wrapper">
            <div className="cols-container">
                <div className="left-col">
                    <div className="img-container">
                        <button
                            className="btn-modif-profil"
                            onClick={() => handleModifyImage()}
                        >
                            🖉
                        </button>
                        <img src={photoUrl} alt="userPic" />
                    </div>

                    <div className="stuff">
                        <h2>{user.name}</h2>
                      {/*   <div
                            className={
                                user.NumeroCarte
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
                        <p className="description-user">{user.bio}</p>
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
                            user.NumeroCarte
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

                            <li
                                className={
                                    toggleState === 3 ? "active-tabs" : "tabs"
                                }
                                onClick={() => toggleTab(3)}
                            >
                                Parametre
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
                            {userLoaded && (
                                <>
                                    <div className="service-list-categories">
                                        <ServiceList />
                                      
                                    </div>
                                    <div className="create-service">
                                        <Link to="/profilUser/createService">
                                            <button
                                                className={
                                                    user.NumeroCarte
                                                        ? "create-service-button inactive"
                                                        : "create-service-button "
                                                }
                                            >
                                                devenir membre
                                            </button>
                                        </Link>
                                    </div>
                                </>
                            )}
                        </div>
                        <div
                            className={
                                toggleState === 2
                                    ? "toggle-content  active-content"
                                    : "toggle-content"
                            }
                        >
                            <div className="project-list-categories">
                            
                                <ProjectList />
                            </div>
                        </div>
                        <div
                            className={
                                toggleState === 3
                                    ? "toggle-content  active-content"
                                    : "toggle-content"
                            }
                        >
                            <Setting />
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

export default ProfilUser;
