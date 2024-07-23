import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.scss";
import { ContextProvider } from "./contexts/ContextProvider.jsx";
import { ServiceProvider } from "./contexts/ServicesProvider.jsx";
import { ProjectProvider } from "./contexts/ProjectsProvider";
import { CategoryProvider } from "./contexts/CategoryContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <CategoryProvider>
            <ContextProvider>
                <ServiceProvider>
                    <ProjectProvider>
                        <App />
                    </ProjectProvider>
                </ServiceProvider>
            </ContextProvider>
        </CategoryProvider>
    </React.StrictMode>
);
