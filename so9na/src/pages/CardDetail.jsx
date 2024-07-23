import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import DetailService from "../components/DetailService";
import { useLocation} from "react-router-dom";
import axios from "axios";

const CardDetail = () => {

  const location = useLocation();
  const item = location.state.item || location.state.service;
  const [user, setUser] = useState({});


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
    if (item) {
      getUserById(item.idUser);
    }
  }, [item]);

  return (
    <>
      <div>
        {Object.keys(user).length > 0 && (
          <DetailService service={item} users={user} />
        )}
        <Footer />
      </div>
    </>
  );
};

export default CardDetail;
