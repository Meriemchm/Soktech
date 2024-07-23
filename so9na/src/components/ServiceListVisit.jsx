import React, { useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { useServiceContext } from "../contexts/ServicesProvider";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCategoryContext } from "../contexts/CategoryContext";
import axiosClient from "../axios-client";

// Composant principal Service
export default function Service({ services }) {
    // Accéder aux états utilisateur et services à partir du contexte
    const { user, setUser } = useStateContext();

    const navigate = useNavigate();

    if(services.length === 0) {
        return <h3 className="empty" >Pas de services</h3>
    }
    return (
        <div className="service-list service-list-visit">
            {services.map((service, index) => {
                const imageUrl = `http://localhost:8000/storage/services/${service.image}`;
              

                return (
                    <div className="service-container" key={service.id}>
                        <div className="service-images-container">
                            <div
                                className="service-link"
                                onClick={() => {
                                    navigate(
                                        `/profilUser/cardDetail/${service.id}`,
                                        { state: { service } }
                                    );
                                }}
                            >
                                access
                            </div>
                            <img
                                src={imageUrl}
                                alt="imgService"
                                className="service-image-list"
                            />
                        </div>

                        <div className="service-detail">
                            {/* Afficher la description et les boutons de modification/enregistrement/annulation */}
                            <p className="service-description">
                                {service.description}
                            </p>

                          

                            {/* Afficher les catégories et les boutons de suppression */}
                     
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
