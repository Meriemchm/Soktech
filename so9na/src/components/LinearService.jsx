import React, { useState } from "react";
import Stepper from "react-stepper-horizontal";
import NewService from "./NewService";
import FormBuilder from "./FormBuilder";
import axiosClient from "../axios-client";
import { useNavigate } from 'react-router-dom';
import { useStateContext } from "../contexts/ContextProvider";

const LinearService = () => {
    const [activeStep, setActiveStep] = useState(0);
    const {user} = useStateContext();

    const [formData, setFormData] = useState({
        titleService: "",
        descriptionService: "",
        categoryService: "",
        priceService: "",
        detailsService: "",
        imageService: "",
        fields: [],
    });
    const navigate = useNavigate();


    const nextStep = () => {
        if (activeStep < 1) {
            setActiveStep((currentStep) => currentStep + 1);
        } 
    };

    const handleShow = async () => {
        const fields = formData.fields;
        const labels = fields.map((field) => field.label);
        const placehorlders = fields.map((field) => field.label);
        const fieldData = {
          content: fields.map((field) => field.label),
          placeholders: fields.map((field) => field.placeholder),
        };
      
        const payload = new FormData();
        payload.append("titre", formData.titleService);
        payload.append("description", formData.descriptionService);
        payload.append("categorie", JSON.stringify(formData.categoryService));
        payload.append("prix", formData.priceService);
        payload.append("details", formData.detailsService);
        payload.append("image", formData.imageService.imageService);
        payload.append("idUser", user.id);
      
        try {
            const response = await axiosClient.post("/services", payload, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
            let service = response.data.service;
            fieldData.serviceId = service.id;
            console.log("fieldData",fieldData)
        
            await axiosClient.post(`/formulaires`, fieldData);
        
            navigate("/profilUser");
          } catch (error) {
            console.error("Error during API calls:", error);
          }
      };      

    const previousStep = () => {
        if (activeStep !== -1) setActiveStep((currentStep) => currentStep - 1);
    };

    const sections = [
        { title: "Ajouter un service", onClick: () => setActiveStep(0) },
        {
            title: "Creer un formulaire",
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
                            <NewService formData={formData} setFormData={setFormData} formType="newService" />
                            <div className="stepper-buttons">
                                <button
                                    className="stepper-button"
                                    onClick={() => nextStep()}
                                >
                                    Suivant
                                </button>
                            </div>
                        </>
                    )}

                    {activeStep === 1 && (
                        <>
                            <FormBuilder formData={formData} setFormData={setFormData} formType="formBuilder" />
                            <div className="stepper-buttons">
                                <button
                                    className="stepper-button"
                                    onClick={() => previousStep()}
                                >
                                    Precedent
                                </button>{" "}
                                <button
                                    className="stepper-button"
                                    onClick={handleShow}
                                >
                                    Valider
                                </button>
                            </div>
                        </>
                    )}
                </div>
         
        </>
    );
}

export default LinearService;