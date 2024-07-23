import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useCategoryContext } from "../contexts/CategoryContext";
import axiosClient from "../axios-client";
import axios from "axios";

// Composant principal Project
export default function Project(props) {
    const [responseList, setResponseList] = useState([]);
    const [categoryName, setCategoryName] = useState(null);
    const { user, setUser } = useStateContext();
    const { categories } = useCategoryContext();
    const navigate = useNavigate();
    console.log(user.id);
    const getCategoryName = (categoryId) => {
        const category = categories.find((c) => c.id === categoryId);
        return category ? category.name : null;
    };

    console.log("categoryName : ", categoryName);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/api/reponses/user/${
                        user.id
                    }`
                );

                const filteredResponses = response.data.filter(
                    (response) => response.category_id !== null
                );

                console.log("filteredResponses : ", filteredResponses);
                setResponseList(filteredResponses);

                console.log("API response data:", filteredResponses);
            } catch (error) {
                console.error(
                    "Erreur lors de la récupération des réponses :",
                    error
                );
            }
        };
        fetchData();
    }, []);
    const deleteResponse = async (responseId) => {
        try {
            const response = await axiosClient.delete(
                `/reponses/${responseId}`
            );
            console.log("API response:", response);
            setResponseList((prevResponseList) =>
                prevResponseList.filter(
                    (response) => response.id !== responseId
                )
            );
        } catch (error) {
            console.error(
                "Erreur lors de la suppression de la réponse :",
                error
            );
        }
    };

    // Afficher la liste des projects
    return (
        <div className="project-list">
            {responseList.map((response) => {
                const responses = JSON.parse(response.reponses);
                const categoryName = getCategoryName(response.category_id);
                return (
                    <div className="project-container">
                        <button
                            className="btn-spprime-project"
                            onClick={() => deleteResponse(response.id)}
                        >
                            🗑
                        </button>

                        <div key={response.id} className="project-detail">
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
                            <div className="browse-category ">
                                <p>{categoryName}</p>
                            </div>
                        </div>
                    </div>
                );
            })}

            <div className="create-project">
                <Link to="/profilUser/addProject">
                    <button className="add-project-button">
                        <p className="add-project-text">Exprimer un probleme</p>
                    </button>
                </Link>
            </div>
        </div>
    );
}
