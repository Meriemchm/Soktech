import React, { useState } from "react";
import axios from "axios";

const CreateNotification = () => {
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");

  const addNotification = async (userId, message) => {
    try {
      const newNotification = {
        userId: userId,
        message: message,
        is_read: false,
      };

      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/notifications`, newNotification);

      alert("Notification ajoutée avec succès!");
    } catch (error) {
      console.error("Error adding notification:", error);
      alert("Erreur lors de l'ajout de la notification.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNotification(userId, message);
  };

  return (
    <div className="create-notification-container">
      <h1>Ajouter une notification</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userId">ID de l'utilisateur :</label>
          <input
            type="number"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="message">Message :</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Ajouter la notification</button>
      </form>
    </div>
  );
};

export default CreateNotification;
