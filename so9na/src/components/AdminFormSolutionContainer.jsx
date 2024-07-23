import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminFormProblemeContainer = () => {
    const [pendingFormulaires, setPendingFormulaires] = useState([]);

    useEffect(() => {
        const fetchPendingFormulaires = async () => {
            try {
                const formulaire = await axios.get(
                    `${
                        import.meta.env.VITE_API_BASE_URL
                    }/api/formulaires/enattente`
                );
                console.log("formulaire : ", formulaire);
                setPendingFormulaires(formulaire.data);
                console.log("pendingFormulaires : ", pendingFormulaires);
            } catch (error) {
                console.error("Error fetching pending formulaires:", error);
            }
        };

        fetchPendingFormulaires();
    }, []);

    const handleFormulaire = async (formulaireId, newState, serviceId) => {
        try {
            await axios.put(
                `${
                    import.meta.env.VITE_API_BASE_URL
                }/api/formulaires/${formulaireId}/etat`,
                { etat: newState }
            );

            const userResponse = await axios.get(
                `${
                    import.meta.env.VITE_API_BASE_URL
                }/api/services/${serviceId}/userId`
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
            setPendingFormulaires(
                pendingFormulaires.filter(
                    (formulaire) => formulaire.id !== formulaireId
                )
            );
        } catch (error) {
            console.error("Error updating formulaire state:", error);
        }
    };

    return (
        <div className="Admin-form-solution">
            <h1>Approuver une solution exprimer</h1>

            <div className="Admin-form-solution-container">
                {pendingFormulaires.map((formulaire) => {
                    const formulaires = JSON.parse(formulaire.content);
                    return (
                        <div key={formulaire.id} className="formulaire">
                            <div className="formulaire-list">
                                {formulaires.map((item, index) => (
                                    <div key={index}>
                                        {item}
                                        <br />
                                    </div>
                                ))}
                            </div>
                            <div className="formulaire-buttons">
                                <button
                                    onClick={() =>
                                        handleFormulaire(
                                            formulaire.id,
                                            "Accepté",
                                            formulaire.serviceId
                                        )
                                    }
                                >
                                    Valider
                                </button>
                                <button
                                    onClick={() =>
                                        handleFormulaire(
                                            formulaire.id,
                                            "Rejeté",
                                            formulaire.serviceId
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
