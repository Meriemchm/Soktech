import React, {useState,useEffect} from 'react';
import Footer from "../components/Footer";
import FormInteressed from "../components/FormInteressed";
import { useLocation } from "react-router-dom";
import axios from "axios"; 

const InteressedForm=()=> {
    const location = useLocation();
    const item = location.state.response;
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
      const iduser = item.userId ;
      if (item) {
        // Ajouter une condition pour vérifier si item et iduser ont des valeurs différentes par rapport à la dernière fois que la fonction a été appelée
        getUserById(iduser);
      }
    }, [item]);
    return (
        <div>
            <FormInteressed reponse={item} userbelong={user} />
             <Footer />
        </div>
    );
}

export default InteressedForm;