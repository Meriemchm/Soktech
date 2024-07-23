import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider";

const FormInteressed = ({ reponse, userbelong }) => {
  const [response, setResponse] = useState("");
  const navigate = useNavigate();
  const { user } = useStateContext();
  const handleInputChange = (event) => {
    setResponse(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Effectuer une requête POST pour ajouter la réponse à la base de données
      const responseResult = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/reponses`,
        {
          questions: ["Description.."],
          reponses: [response],
          userId: user.id,
          reponsesId: reponse.id,
        }
      );

      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/notifications`,
        {
          userId: user.id,
          message: "Votre offre a été envoyée.",
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

      console.log(
        "La réponse a été ajoutée à la base de données :",
        responseResult.data
      );

      navigate("/");
      // Réinitialiser la valeur de la réponse dans l'état
      setResponse("");
    } catch (error) {
      console.error(
        "Erreur lors de l'ajout de la réponse à la base de données :",
        error
      );
    }
  };

  return (
    <div className="form-interessed">
      <form onSubmit={handleSubmit}>
        <h1 className="form-interessed-title">Offre</h1>
        <label>Decrivez votre offre</label>
        <div className="form-interessed-area">
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="Description..."
            value={response}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="buttons-form-interessed">
          <button className="button-form-interessed">Valider</button>
        </div>
      </form>
    </div>
  );
};

export default FormInteressed;
