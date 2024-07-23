import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import BrowseDetail from "../components/BrowseDetail";
import { useLocation } from "react-router-dom";
import axios from "axios";

const BrowseDetails = () => {
  const location = useLocation();
  const item = location.state.item || location.state.response;
  const [user, setUser] = useState(null);

  const getUserById = async (id) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/${id}`
      );
      setUser(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur :", error);
    }
  };

  useEffect(() => {
    const iduser = item.userId || item.idUser;
    if (item) {
      // Ajouter une condition pour vérifier si item et iduser ont des valeurs différentes par rapport à la dernière fois que la fonction a été appelée
      getUserById(iduser);
    }
  }, [item]);

  return (
    <div>
      {user && <BrowseDetail response={item} users={user} />}
      <Footer />
    </div>
  );
};
export default BrowseDetails;
