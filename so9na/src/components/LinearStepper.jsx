import React, { useState } from "react";
import Stepper from "react-stepper-horizontal";
import ProfessionalStep from "./ProfessionalStep";
import PaymentStep from "./PaymentStep";
import axiosClient from "../axios-client";
import { useNavigate } from "react-router-dom";

const LinearStepper = () => {
  const [activeStep, setActiveStep] = useState(0);

  const [formData, setFormData] = useState({
    skills: [],
    diplomas: [],
    cardNumber: "",
    expirationDate: "",
    securityNumber: "",
    firstName: "",
    lastName: "",
  });

  const [formErrors, setFormErrors] = useState({
    skills: "",
    diplomas: "",
    cardNumber: "",
    expirationDate: "",
    securityNumber: "",
    firstName: "",
    lastName: "",
  });

  const navigate = useNavigate();

  const nextStep = () => {
    if (activeStep < 1) {
      setActiveStep((currentStep) => currentStep + 1);
    }
  };

  const handleShow = () => {
    let isValid = true;

    // Validate skills
    if (formData.skills.length === 0) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        skills: "Veuillez sélectionner au moins une compétence.",
      }));
      isValid = false;
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        skills: "",
      }));
    }

    // Validate diplomas
    if (formData.diplomas.length === 0) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        diplomas: "Veuillez sélectionner au moins un diplôme.",
      }));
      isValid = false;
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        diplomas: "",
      }));
    }

    // Validate other fields
    Object.keys(formData).forEach((key) => {
      if (formData[key] === "") {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          [key]: `Le champ ${key} est requis.`,
        }));
        isValid = false;
      } else {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          [key]: "",
        }));
      }
    });

    if (isValid) {
      const payload = {
        competence: formData.skills,
        diplome: formData.diplomas,
        NumeroCarte: formData.cardNumber,
        DateExpiration: formData.expirationDate,
        NumeroSecurite: formData.securityNumber,
        Prenom: formData.firstName,
        NomDeFamille: formData.lastName,
      };

      axiosClient
        .put("/user/update", payload)
        .then((response) => {
          console.log("Données mises à jour avec succès :", response.data);
          navigate("/profilUser");
        })
        .catch((error) => {
          if (error.response && error.response.status === 422) {
            console.error("Erreurs de validation :", error.response.data.errors);
            console.error(
              "Erreurs de validation pour le champ 'competence':",
              error.response.data.errors.competence
            );
            console.error(
              "Erreurs de validation pour le champ 'diplome':",
              error.response.data.errors.diplome
            );
          } else {
            console.error("Erreur lors de la mise à jour des données :", error);
          }
        });
    }
  };

  const previousStep = () => {
    if (activeStep !== -1) setActiveStep((currentStep) => currentStep - 1);
  };

  const sections = [
    { title: "Information professionnelle", onClick: () => setActiveStep(0) },
    {
      title: "Information de carte de crédit",
      onClick: () => setActiveStep(1),
    },
  ];

  return (
    <>
      <div className="LinaerStepper">
        <Stepper
          steps={sections}
          activeStep={activeStep}
          activeColor="gray"
          defaultBarColor="gray"
          completeColor="black"
          completeBarColor="black"
        />
        {activeStep === 0 && (
          <>
            <ProfessionalStep setFormData={setFormData} />
            {formErrors.skills && (
              <span className="error">{formErrors.skills}</span>
            )}
            <div className="stepper-buttons">
              <button
                className="stepper-button"
                onClick={() => nextStep()}
              >
                Next
              </button>
            </div>
          </>
        )}
        {activeStep === 1 && (
          <>
            <PaymentStep setFormData={setFormData} />
            {formErrors.diplomas && (
              <span className="error">{formErrors.diplomas}</span>
            )}
            {formErrors.cardNumber && (
              <span className="error">{formErrors.cardNumber}</span>
            )}
            {formErrors.expirationDate && (
              <span className="error">{formErrors.expirationDate}</span>
            )}
            {formErrors.securityNumber && (
              <span className="error">{formErrors.securityNumber}</span>
            )}
            {formErrors.firstName && (
              <span className="error">{formErrors.firstName}</span>
            )}
            {formErrors.lastName && (
              <span className="error">{formErrors.lastName}</span>
            )}
            <div className="stepper-buttons">
              <button
                className="stepper-button"
                onClick={() => previousStep()}
              >
                Previous
              </button>{" "}
              <button className="stepper-button" onClick={handleShow}>
                Finish
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default LinearStepper;
