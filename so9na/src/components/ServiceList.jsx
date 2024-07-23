import React, { useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { useServiceContext } from "../contexts/ServicesProvider";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCategoryContext } from "../contexts/CategoryContext";
import axiosClient from "../axios-client";

// Composant principal Service
export default function Service(props) {
    // Accéder aux états utilisateur et services à partir du contexte
    const { user, setUser } = useStateContext();
    const { services, setServices } = useServiceContext();
    const { categories } = useCategoryContext();

    // État local pour gérer le statut d'édition et les valeurs temporaires
    const [editing, setEditing] = useState(null);
    const [tempValue, setTempValue] = useState(null);
    const [showCategorySelectors, setShowCategorySelectors] = useState(
        services.map(() => false)
    );
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [availableCategories, setAvailableCategories] = useState([]);
    const navigate = useNavigate();
    // Fonction pour gérer le clic sur le bouton d'édition
    const handleEdit = (index, attr, value) => {
        setEditing({ index, attr });
        setTempValue(value);
    };

    // Fonction pour gérer le clic sur le bouton d'enregistrement (met à jour le service dans la base de données)
    const handleSave = async (service, attr, value) => {
        try {
            // Convertir le tableau de catégories en chaîne JSON avant de l'envoyer à l'API
            const data =
                attr === "categorie"
                    ? { [attr]: JSON.stringify(value) }
                    : { [attr]: value };

            // Envoyer la requête PUT pour mettre à jour le service
            console.log("data : ", data);
            await axios.put(
                `${import.meta.env.VITE_API_BASE_URL}/api/services/${
                    service.id
                }`,
                data
            );
            setEditing(null);
            // Mettre à jour l'état des services
            const updatedServices = services.map((s) =>
                s.id === service.id
                    ? {
                          ...s,
                          [attr]:
                              attr === "categorie"
                                  ? JSON.stringify(value)
                                  : value,
                      }
                    : s
            );
            setServices(updatedServices);
            console.log("Modification réussie");
        } catch (error) {
            console.error("Erreur lors de la mise à jour du service :", error);
        }
    };

    // Fonction pour gérer le clic sur le bouton d'annulation
    const handleCancel = () => {
        setEditing(null);
        setTempValue(null);
    };

    // Fonction pour gérer le clic sur le bouton de suppression (supprime le service de la base de données)
    const handleDelete = async (id) => {
        try {
            await axios.delete(
                `${import.meta.env.VITE_API_BASE_URL}/api/services/${id}`
            );
            const updatedServices = services.filter(
                (service) => service.id !== id
            );
            setServices(updatedServices);
            console.log("Suppression réussie");
        } catch (error) {
            console.error("Erreur lors de la suppression du service :", error);
        }
    };

    // Fonction pour gérer la suppression d'une catégorie
    const handleCategoryDelete = async (service, categoryToDelete) => {
        // Convertir service.categorie de chaîne JSON en tableau
        const currentCategories = JSON.parse(service.categorie);

        // Filtrer la catégorie à supprimer
        const updatedCategories = currentCategories.filter(
            (category) => category !== categoryToDelete
        );

        // Enregistrer les catégories mises à jour
        await handleSave(service, "categorie", updatedCategories);
    };

    const handleShowCategorySelector = (index, service) => {
        setAvailableCategories(
            categories.filter(
                (category) =>
                    !JSON.parse(service.categorie).includes(category.name)
            )
        );
        const updatedSelectors = showCategorySelectors.slice();
        updatedSelectors[index] = true;
        setShowCategorySelectors(updatedSelectors);
    };

    const handleAddCategories = async (index, service) => {
        const updatedCategories = [
            ...JSON.parse(service.categorie),
            ...selectedCategories,
        ];
        await handleSave(service, "categorie", updatedCategories);
        setSelectedCategories([]);

        const updatedSelectors = showCategorySelectors.slice();
        updatedSelectors[index] = false;
        setShowCategorySelectors(updatedSelectors);
    };

    // Fonction pour gérer la modification de l'image
    const handleModifyImage = (index) => {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "image/*";
        fileInput.addEventListener("change", async (event) => {
            const file = event.target.files[0];
            await updateImage(index, file);
        });
        fileInput.click();
    };

    // Fonction pour mettre à jour l'image d'un service
    const updateImage = async (index, file) => {
        const service = services[index];
        const formData = new FormData();
        formData.append("image", file);

        try {
            // Envoyer la requête POST pour stocker l'image sur le serveur
            const response = await axiosClient.post(
                `/services/image`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            // Récupérer le nom de fichier de la réponse
            const updatedFilename = response.data.path; // Utiliser 'path' au lieu de 'filename'
            const data = { ["image"]: updatedFilename };

            // Envoyer la requête PUT pour mettre à jour l'image du service
            try {
                await axiosClient.put(`/services/${service.id}`, data);
            } catch (error) {
                console.error(
                    "Erreur lors de la mise à jour de l'image :",
                    error
                );
            }

            formData.forEach((value, key) => {
                console.log(`formdata key: ${key}, value:`, value);
            });

            // Mettre à jour l'état des services avec la nouvelle image
            const updatedServices = services.slice();
            updatedServices[index] = {
                ...service,
                image: updatedFilename, // Utiliser le nom de fichier mis à jour ici
            };
            setServices(updatedServices);
            console.log("Modification de l'image réussie");
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'image :", error);
        }
    };

    // Afficher la liste des services
    return (
        <div
            className={
                user.NumeroCarte ? "service-list" : "service-list inactive"
            }
        >
            {services.map((service, index) => {
                const imageUrl = `http://localhost:8000/storage/services/${service.image}`;
                const categories = JSON.parse(service.categorie);

                return (
                    <div className="service-container" key={service.id}>
                        <button
                            className="btn-spprime-service"
                            onClick={() => handleDelete(service.id)}
                        >
                            🗑
                        </button>
                        <div className="service-images-container">
                            <div
                                className="service-link"
                                onClick={() => {
                                    navigate(`/profilUser/cardDetail/${service.id}`, { state: { service } });
                                  }}
                               
                               
                            >
                                access
                            </div>
                            <img
                                src={imageUrl}
                                alt="imgService"
                                className="service-image-list"
                            />
                            <button
                                className="btn-modif-service btn-modif-service-image"
                                onClick={() => handleModifyImage(index)}
                            >
                                🖉
                            </button>
                        </div>

                        <div className="service-detail">
                            {/* Afficher la description et les boutons de modification/enregistrement/annulation */}
                            <p className="service-description">
                                {editing &&
                                editing.index === index &&
                                editing.attr === "description" ? (
                                    <>
                                        <textarea
                                            value={tempValue}
                                            onChange={(e) =>
                                                setTempValue(e.target.value)
                                            }
                                        ></textarea>
                                        <button
                                            className="btn-group-description"
                                            onClick={() =>
                                                handleSave(
                                                    service,
                                                    "description",
                                                    tempValue
                                                )
                                            }
                                        >
                                            ✔
                                        </button>
                                        <button
                                            onClick={handleCancel}
                                            className="btn-group-description-two"
                                        >
                                            ✖
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        {service.description}
                                        <button
                                            className="btn-modif-service btn-modif-service-description"
                                            onClick={() =>
                                                handleEdit(
                                                    index,
                                                    "description",
                                                    service.description
                                                )
                                            }
                                        >
                                            🖉
                                        </button>
                                    </>
                                )}
                            </p>

                            

                            {/* Afficher les catégories et les boutons de suppression */}
                            {categories.map((category) => (
                                <span key={category} className="category-span">
                                    {category}
                                    <button
                                        className="btn-supp-category"
                                        onClick={() =>
                                            handleCategoryDelete(
                                                service,
                                                category
                                            )
                                        }
                                    >
                                        ✖
                                    </button>
                                </span>
                            ))}
                            {!showCategorySelectors[index] && (
                                <button
                                    className="btn-group btn-group-ajouter"
                                    onClick={() =>
                                        handleShowCategorySelector(
                                            index,
                                            service
                                        )
                                    }
                                >
                                    Categorie
                                </button>
                            )}
                            {showCategorySelectors[index] && (
                                <div className="checkbox-categories">
                                    {/* Afficher la liste des catégories disponibles */}
                                    {availableCategories.map((category) => (
                                        <div
                                            key={category.id}
                                            className="checkbox-category"
                                        >
                                            <input
                                                type="checkbox"
                                                id={`category-${category.id}`}
                                                value={category.name}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSelectedCategories([
                                                            ...selectedCategories,
                                                            e.target.value,
                                                        ]);
                                                    } else {
                                                        setSelectedCategories(
                                                            selectedCategories.filter(
                                                                (cat) =>
                                                                    cat !==
                                                                    e.target
                                                                        .value
                                                            )
                                                        );
                                                    }
                                                }}
                                            />
                                            <label
                                                htmlFor={`category-${category.id}`}
                                            >
                                                {category.name}
                                            </label>
                                        </div>
                                    ))}
                                    {/* Boutons pour ajouter ou annuler l'ajout de catégories */}
                                    <button
                                        className="btn-group"
                                        onClick={() => {
                                            handleAddCategories(index, service);
                                            const updatedSelectors =
                                                showCategorySelectors.slice();
                                            updatedSelectors[index] = false;
                                            setShowCategorySelectors(
                                                updatedSelectors
                                            );
                                        }}
                                    >
                                        ✔
                                    </button>
                                    <button
                                        className="btn-group"
                                        onClick={() => {
                                            const updatedSelectors =
                                                showCategorySelectors.slice();
                                            updatedSelectors[index] = false;
                                            setShowCategorySelectors(
                                                updatedSelectors
                                            );
                                        }}
                                    >
                                        ✖
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
            <div
                className={
                    user.NumeroCarte ? "add-service" : "add-service inactive"
                }
            >
                <Link to="/profilUser/addService">
                    <button className="add-service-button">
                        <p className="create-service-text">Concevoir une solution</p>
                    </button>
                </Link>
            </div>
        </div>
    );
}
