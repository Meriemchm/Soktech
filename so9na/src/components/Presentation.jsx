import React, { useState } from "react";
import Sign from "./Sign";
import { useNavigate } from "react-router";
import { useStateContext } from "../contexts/ContextProvider";
import { useFunctions } from "./useFunctions";
const Presentation = () => {
    const { token } = useStateContext();
    const [buttonSign, setButtonSign] = useState(false);
    const { unlockScroll, scrolltotop } = useFunctions();
    const { user, setUser } = useStateContext();
    const navigate = useNavigate();
    const handleButton = () => {
        if (!token) {
            return (
                <div className="button">
                    <button
                        onClick={() => {
                            setButtonSign(true);
                            unlockScroll();
                            scrolltotop();
                        }}
                    >
                        Commencer{" "}
                    </button>
                </div>
            );
        } else {
            return (
                <div className="button">
                    <button
                        onClick={() => {
                            navigate(`/addProject`);
                        }}
                    >
                        Clique ici
                    </button>
                </div>
            );
        }
    };
    const handleButtonTwo = () => {
        if (!token) {
            return (
                <div className="button">
                    <button
                        onClick={() => {
                            setButtonSign(true);
                            unlockScroll();
                            scrolltotop();
                        }}
                    >
                        Commencer{" "}
                    </button>
                </div>
            );
        } else {
            if (user.NumeroCarte) {
                return (
                    <div className="button">
                        <button
                            onClick={() => {
                                navigate(`/addService`);
                            }}
                        >
                            Clique ici
                        </button>
                    </div>
                );
            } else {
                return (
                    <div className="button">
                        <button
                            onClick={() => {
                                navigate(`/createService`);
                            }}
                        >
                            devenir membre
                        </button>
                    </div>
                );
            }
        }
    };
    return (
        <>
            <div className="Presentation">
            <div className="Presentation-container">
                <div className="container">
                    <img src="probleme.jpg" alt="Image 1" />
                    <div className="overlay">
                        <div className="text">
                            <h2>Vous avez un probleme ?</h2>
                            <p>
                                Partager vos problèmes et recevez des solutions .
                            </p>
                        </div>
                        {handleButton()}
                    </div>
                </div>
                </div>
                <div className="Presentation-container">
                <div className="container">
                    <img src="soltion.jpg" alt="Image 2" />
                    <div className="overlay">
                        <div className="text">
                            <h2>Proposer une solution </h2>
                            <p>
                                Déployer vos services et partagez vous experience.
                            </p>
                        </div>
                        {handleButtonTwo()}
                    </div>
                </div>
            </div>
            </div>
            <Sign trigger={buttonSign} setTrigger={setButtonSign} />
        </>
    );
};

export default Presentation;
