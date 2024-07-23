import React, { useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { useProjectContext } from "../contexts/ProjectsProvider";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCategoryContext } from "../contexts/CategoryContext";
import axiosClient from "../axios-client";

// Composant principal Project
export default function Project({ responses }) {
    const navigate = useNavigate();
    if (responses.length === 0) {
        return <h3 className="empty">Pas de problemes</h3>;
    }
    const { categories } = useCategoryContext();
    const getCategoryName = (categoryId) => {
        const category = categories.find((c) => c.id === categoryId);
        return category ? category.name : null;
    };
    return (
        <div className="project-list project-list-visit">
            {responses.map((response, index) => {
                const responses = JSON.parse(response.reponses);
                const categoryName = getCategoryName(response.category_id);
                return (
                    <div className="project-container" key={response.id}>
                        <div className="project-detail">
                            {/* Afficher la description et les boutons de modification/enregistrement/annulation */}
                            <p
                                className="project-description"
                                onClick={() => {
                                    navigate(
                                        `/profilUser/browseDetail/${response.id}`,
                                        { state: { response } }
                                    );
                                }}
                            >
                                {responses[0]}
                            </p>

                            <div className="browse-category">
                                <p>{categoryName}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
