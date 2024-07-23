import React, { useState, useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";
import { useNavigate } from "react-router-dom";
import CategorySelector from "./CategorySelector";
import axios from "axios";

const AddProject = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedCategoryInfo, setSelectedCategoryInfo] = useState([]);
    const [active, setActive] = useState(false);
    const { user } = useStateContext();
    const navigate = useNavigate();

    const handleCategoryChange = async (e) => {
        setSelectedCategory(e.target.value);
        setActive(true);
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!selectedCategory) return;
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/api/formulaires/${selectedCategory}`
                );
                setSelectedCategoryInfo([response.data.formulaire]);
            } catch (error) {
                console.error("Erreur lors de la récupération des informations de la catégorie :", error);
            }
        };
        fetchData();
    }, [selectedCategory]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const questions = selectedCategoryInfo.flatMap((info) =>
            JSON.parse(info.content)
        );
        const reponses = questions.map((_, index) => {
            const textarea = document.getElementById(`detailsProject0_${index}`);
            return textarea.value;
        });
    
        console.log("tout", questions, reponses, selectedCategory, user.id)
    
        try {
            await axiosClient.post("/reponses", {
                questions,
                reponses,
                category_id: selectedCategory, // Update key name to match backend
                userId: user.id, // Update key name to match backend
            });
    
            navigate("/profilUser");
        } catch (error) {
            console.error("Erreur lors de la soumission du projet :", error);
        }
    };
    

    return (
        <div className="new-project">
            <h2 className="new-project-title">Choisi la categorie de ton probleme</h2>
            <form onSubmit={handleSubmit}>
                <div className="new-project-form">
                    <div className="category-form">
                        <div className="new-project-categorie">
                            <label>Categorie</label>
                            <CategorySelector onChange={handleCategoryChange} />
                        </div>
                    </div>
                    {active && selectedCategoryInfo && (
                        <>
                            <h2 className="new-project-title">Exprime ton probleme</h2>
                            {selectedCategoryInfo.map((info, index) => {
                                const contents = JSON.parse(info.content);
                                const placeholder = JSON.parse(info.placeholders);
                                return (
                                    <div key={index} className="new-project-area">
                                        {contents.map((content, contentIndex) => (
                                            <div className="new-project-area-container" key={content}>
                                                <label htmlFor={`detailsProject${index}_${contentIndex}`}>
                                                    {content}
                                                </label>
                                                <textarea
                                                    name={`detailsProject${index}_${contentIndex}`}
                                                    id={`detailsProject${index}_${contentIndex}`}
                                                    cols="30"
                                                    rows="10"
                                                    placeholder={placeholder[contentIndex]}
                                                ></textarea>
                                            </div>
                                        ))}
                                    </div>
                                );
                            })}
                            <div className="button-add-projects">
                            <input
                                    type="submit"
                                    value="Valider"
                                    className="button-add-project"
                                />
                            </div>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
};

export default AddProject;

