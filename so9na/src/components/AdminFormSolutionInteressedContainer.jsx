import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminFormSolutionInteressedContainer() {
    const [pendingResponses, setPendingResponses] = useState([]);

    useEffect(() => {
        const fetchPendingResponses = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/api/responses/attente`
                );
                setPendingResponses(response.data);
                console.log("pendingResponses : ", pendingResponses);
            } catch (error) {
                console.error("Error fetching pending responses:", error);
            }
        };

        fetchPendingResponses();
    }, []);

    const handleResponse = async (responseId, newState, userId) => {
        try {
            await axios.put(
                `${
                    import.meta.env.VITE_API_BASE_URL
                }/api/reponses/${responseId}`,
                { etat: newState }
            );

            // Envoie une notification à l'utilisateur
            await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/notifications`,
                {
                    userId,
                    message: `Votre réponse a été ${
                        newState === "Accepté" ? "acceptée" : "rejetée"
                    }.`,
                    is_read: false,
                }
            );

            // Met à jour l'état local des réponses en attente
            setPendingResponses(
                pendingResponses.filter(
                    (response) => response.id !== responseId
                )
            );
        } catch (error) {
            console.error("Error updating response state:", error);
        }
    };

    return (
        <div className="Admin-form-solution-interessed">
            <h1>Approuver un formulaire d'une solution interessé </h1>
            <div className="Admin-form-solution-container">
                {pendingResponses.map((response) => {
                    const reponses = JSON.parse(response.reponses);
                    return(
                    <div key={response.id} className="response">
                          
                            <div className="response-list">
                                {reponses.map((item, index) => (
                                    <div key={index}>
                                        {item}
                                        <br />
                                    </div>
                                ))}
                            </div>
                            <div className="response-buttons">
                        <button
                            onClick={() =>
                                handleResponse(
                                    response.id,
                                    "Accepté",
                                    response.userId
                                )
                            }
                        >
                            Valider
                        </button>
                        <button
                            onClick={() =>
                                handleResponse(
                                    response.id,
                                    "Rejeté",
                                    response.userId
                                )
                            }
                        >
                            Rejeter
                        </button>
                        </div>
                    </div>
               ) })}
            </div>
        </div>
    );
}

export default AdminFormSolutionInteressedContainer;
