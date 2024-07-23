import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useStateContext } from "./ContextProvider";

const ServiceContext = createContext([]);

export const ServiceProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const { user } = useStateContext();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/services/user/${user.id}`
        );
        setServices(response.data);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      }
    };

    if (user.id) {
      fetchServices();
    }
  }, [user]);

  // Update the Provider to include both services and setServices
  return (
    <ServiceContext.Provider value={{ services, setServices }}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useServiceContext = () => useContext(ServiceContext);
