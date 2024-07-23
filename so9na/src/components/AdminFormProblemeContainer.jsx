import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminFormProblemeContainer = () => {
    const [pendingReponses, setPendingReponses] = useState([]);

    useEffect(() => {
        const fetchPendingReponses = async () => {
            try {
                const reponses = await axios.get(
                    `${
                        import.meta.env.VITE_API_BASE_URL
                    }/api/responses/enattente`
                );
                console.log("reponses : ", reponses);
                setPendingReponses(reponses.data);
                console.log("pendingreponses : ", pendingReponses);
            } catch (error) {
                console.error("Error fetching pending reponses:", error);
            }
        };

        fetchPendingReponses();
    }, []);

    const handleReponse = async (ReponseId, newState) => {
        try {
            await axios.put(
                `${
                    import.meta.env.VITE_API_BASE_URL
                }/api/responses/${ReponseId}/etat`,
                { etat: newState }
            );

            const userResponse = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/api/reponses/${ReponseId}`
            );
            const userId = userResponse.data.userId;

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
            setPendingReponses(
                pendingReponses.filter((reponse) => reponse.id !== ReponseId)
            );
        } catch (error) {
            console.error("Error updating formulaire state:", error);
        }
    };
    return (
        <div className="Admin-form-probleme">
            <h1>Approuver un probleme exprimer</h1>
            <div className="Admin-form-probleme-container">
                {pendingReponses.map((reponse) => {
                    const reponses = JSON.parse(reponse.reponses);
                    const questions = JSON.parse(reponse.questions);
                    return (
                        <div key={reponse.id} className="reponse">
                            <div className="reponse-list">
                            {questions.slice(1).map((question, index) => {
                                const responseIndex = index + 1;
                                const questionText = `${question}`;
                                const responseText =
                                    reponses[responseIndex] ||
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
                            <div className="reponse-buttons">
                                <button
                                    onClick={() =>
                                        handleReponse(
                                            reponse.id,
                                            "Accepté",
                                        )
                                    }
                                >
                                    Valider
                                </button>
                                <button
                                    onClick={() =>
                                        handleReponse(
                                            reponse.id,
                                            "Rejeté",
                                        )
                                    }
                                >
                                    Rejeter
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AdminFormProblemeContainer;
