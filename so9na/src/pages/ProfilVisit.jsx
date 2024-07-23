import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import ProfilUserVisit from "../components/ProfilUserVisit";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ProfilVisit = () => {
  const location = useLocation();
  const item = location.state.item  || location.state.service || location.state.response;
  const [user, setUser] = useState({});
  const [services, setServices] = useState([]);
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
          const userId = item.userId || item.idUser;
          const response = await axios.get(
              `${import.meta.env.VITE_API_BASE_URL}/api/user/${userId}`
          );
          setUser(response.data);
      } catch (error) {
          console.error("Erreur lors de la récupération de l'utilisateur :", error);
      }
  };
  

    const fetchServices = async () => {
      try {
        const userId = item.userId || item.idUser;
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/services/user/${userId}`
        );
        setServices(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des services :", error);
      }
    };

    const fetchResponses = async () => {
      try {
        const userId = item.userId || item.idUser;
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/reponses/user/${userId}`
        );
        setResponses(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des projets :", error);
      }
    };

    fetchUser();
    fetchServices();
    fetchResponses();
  }, [item]);

  return (
    <div>
      {user.length > 0 && (
        <ProfilUserVisit
          service={services}
          User={user}
          response={responses}
        />
      )}

      <Footer />
    </div>
  );
};

export default ProfilVisit;
