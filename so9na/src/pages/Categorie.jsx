import React from "react";
import Footer from "../components/Footer";
import CardCategorie from "../components/CardCategorie";
import { useLocation } from "react-router-dom";

const Categorie = () => {
    const location = useLocation();
    const service = location.state ? location.state.service : undefined;

    return (
        <div>
            <CardCategorie service={service} />
            <Footer />
        </div>
    );
};

export default Categorie;
