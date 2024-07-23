import React from "react";
import { useNavigate } from "react-router-dom";

const ProgressionContainer = () => {
    const navigate =useNavigate();
    return (
        <div className="progression-container">
                        <div className="progression-title-description">
                            <h2>Progression</h2>
                        <p>Interager avec vos client en leurs tenant aucourant de votre progression . </p>
                        </div>
                                    <div
                                        className="progression-card-container"
                        
                                    >
                                        <div className="progression-image">
                                            <img
                                                src=""
                                                alt="progression-image"
                                            />
                                        </div>
                                        <div className="progression-colomn">
                                            <div className="progression-row">
                                                <h3>titre</h3>
                                                <button className="btn-progression" > Ajouter une Progression</button>
                                             
                                            </div>
                                            <p className="progression-description">
                                               description
                                            </p>
                                        </div>
                                    </div>
                                
                
                    </div>
    );
};

export default ProgressionContainer;
