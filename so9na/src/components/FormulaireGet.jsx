import React, { useEffect, useState } from "react";
import axios from "axios";

const FormulaireGet = ({ serviceId, setSelectedCategoryInfo }) => {
    const [fetchedCategoryInfo, setFetchedCategoryInfo] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${
                        import.meta.env.VITE_API_BASE_URL
                    }/api/formulaires/service/${serviceId}`
                );
    
                setFetchedCategoryInfo(response.data);
                setSelectedCategoryInfo(response.data);
            } catch (error) {
                console.error(
                    "Erreur lors de la récupération des informations de la catégorie :",
                    error
                );
            }
        };
        fetchData();
    }, []);

    return (
        <div >
            {fetchedCategoryInfo.map((info, index) => {
                const contents = JSON.parse(info.content);
                const placeholder = JSON.parse(info.placeholders);
                return (
                    <div key={index} className="new-project-area">
                        {contents.map((content, contentIndex) => (
                            <div
                                className="form-area-container"
                                key={content}
                            >
                                <label
                                    htmlFor={`detailsProject${index}_${contentIndex}`}
                                >
                                    {content}
                                </label>
                                <div className="form-interessed-area">
                                <textarea
                                    name={`detailsProject${index}_${contentIndex}`}
                                    id={`detailsProject${index}_${contentIndex}`}
                                    cols="30"
                                    rows="10"
                                    placeholder={placeholder[contentIndex]}
                                ></textarea>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            })}

        </div>
    );
};
export default FormulaireGet;
