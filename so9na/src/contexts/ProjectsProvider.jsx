import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useStateContext } from "./ContextProvider";

const ProjectContext = createContext([]);

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const { user } = useStateContext();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/projects/user/${user.id}`
        );
        setProjects(response.data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    if (user.id) {
      fetchProjects();
    }
  }, [user]);

  return (
    <ProjectContext.Provider value={{ projects, setProjects }}>{children}</ProjectContext.Provider>
  );
};

export const useProjectContext = () => useContext(ProjectContext);
