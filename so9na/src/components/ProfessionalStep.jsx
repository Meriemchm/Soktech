import React, { useState } from "react";
import InputCategory from "./InputCategory";

const ProfessionalStep = ({ setFormData }) => {
    const [errors, setErrors] = useState({});

    const handleFormChange = (fieldName, value) => {
        const updatedValue = value.split(",").map((item) => item.trim());
        setFormData((prevState) => ({
            ...prevState,
            [fieldName]: updatedValue,
        }));
        validateField(fieldName, updatedValue);
    };

    const validateField = (fieldName, value) => {
        let fieldError = "";
        if (fieldName === "skills") {
            if (value.length === 0) {
                fieldError = "Veuillez sélectionner au moins une compétence.";
            }
        } else if (fieldName === "diplomas") {
            if (value.length === 0) {
                fieldError = "Veuillez sélectionner au moins un diplôme.";
            }
        }
        setErrors((prevState) => ({
            ...prevState,
            [fieldName]: fieldError,
        }));
    };

    return (
        <div className="more-information">
            <h2 className="more-information-title">Information Professionnelle</h2>
            <div className="more-information-Skills">
                <label>Compétences</label>
                <div className="drop-information">
                    <InputCategory
                        handleSelectedCategories={handleFormChange}
                        fieldName="skills"
                    />
                </div>
                {errors.skills && <span className="error">{errors.skills}</span>}
            </div>

            <div className="more-information-diplome">
                <label>Diplômes</label>
                <div className="drop-information">
                    <InputCategory
                        handleSelectedCategories={handleFormChange}
                        fieldName="diplomas"
                    />
                </div>
                {errors.diplomas && <span className="error">{errors.diplomas}</span>}
            </div>
        </div>
    );
};

export default ProfessionalStep;
