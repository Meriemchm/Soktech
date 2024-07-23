import React, { useState } from "react";
import FormulaireGet from "./FormulaireGet";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const InteressedFormSolution = ({ serviceId ,userbelong}) => {
  const { user } = useStateContext();
  const [selectedCategoryInfo, setSelectedCategoryInfo] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const questions = selectedCategoryInfo.flatMap((info) =>
      JSON.parse(info.content)
    );
    const reponses = questions.map((_, index) => {
      const textarea = document.getElementById(`detailsProject0_${index}`);
      return textarea.value;
    });

    try {
      await axiosClient.post("/reponses", {
        questions,
        reponses,
        serviceId, // Send the serviceId
        userId: user.id, // Send the user.id
      });
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/notifications`,
        {
            userId: user.id,
            message: `Votre offre a été envoyer .`,
            is_read: false,
        }
    );
    await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/notifications`,
      {
        userId: userbelong[0].id,
        message: "Vous avez reçu une nouvelle offre.",
        is_read: false,
      }
    );

      navigate("/"); // Naviguer vers la page d'accueil après une réponse réussie de l'API
    } catch (error) {
      console.error("Erreur lors de la soumission :", error);
    }
  };

  return (
    <div className="form-interessed">
      <form onSubmit={handleSubmit}>
        <h1 className="form-interessed-title">Offre</h1>
        <FormulaireGet
          serviceId={serviceId}
          setSelectedCategoryInfo={setSelectedCategoryInfo}
        />
        <div className="buttons-form-interessed">
          <input
            type="submit"
            value="Valider"
            className="button-form-interessed"
          />
        </div>
      </form>
    </div>
  );
};

export default InteressedFormSolution;
