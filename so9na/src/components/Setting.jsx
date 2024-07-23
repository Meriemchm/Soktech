import React, { useState, useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

const Setting = () => {
    const { user, setUser } = useStateContext();
    const [formData, setFormData] = useState({
        name: user.name || "",
        email: user.email || "",
        bio: user.bio || "",
        address: user.address || "",
        city: user.city || "",
    });

    const token = user.token;

    useEffect(() => {
        setFormData({
            name: user.name || "",
            email: user.email || "",
            bio: user.bio || "",
            address: user.address || "",
            city: user.city || "",
        });
    }, [user]);

    const [editField, setEditField] = useState({
        name: false,
        email: false,
        bio: false,
        address: false,
        city: false,
    });

    const handleUpdate = async (field) => {
        // Préparez les données à envoyer à l'API
        const dataToUpdate = {
            [field]: formData[field],
        };

        axiosClient
            .put("/user/update", dataToUpdate)
            .then((response) => {
                console.log(
                    "Données mises à jour avec succès :",
                    response.data
                );
                console.log(dataToUpdate);

                // Mettre à jour l'état de l'utilisateur avec les nouvelles informations
                setUser({ ...user, [field]: formData[field] });

                // Désactivez le mode d'édition du champ mis à jour
                setEditField({ ...editField, [field]: false });

                // Affichez un message à l'utilisateur pour indiquer que la mise à jour a réussi
                console.log(
                    "Les informations ont été mises à jour avec succès"
                );
            })
            .catch((error) => {
                if (error.response && error.response.status === 422) {
                    console.error(
                        "Erreurs de validation :",
                        error.response.data.errors
                    );
                } else {
                    console.error(
                        "Erreur lors de la mise à jour des données :",
                        error
                    );
                }

                // Affichez un message à l'utilisateur pour indiquer que la mise à jour a échoué
                console.log("La mise à jour a échoué, veuillez réessayer");
            });
    };

    const handleCancel = (field) => {
        setFormData({ ...formData, [field]: user[field] || "" });
        setEditField({ ...editField, [field]: false });
    };

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const renderField = (field, label, type = "text") => {
        return (
            <div className="form-group">
                <label htmlFor={field}>{label}</label>
                {editField[field] ? (
                    <>
                        <input
                            id={field}
                            type={type}
                            name={field}
                            value={formData[field]}
                            onChange={(e) =>
                                handleInputChange(field, e.target.value)
                            }
                        />
                        <button
                            className="btn-group"
                            onClick={() => handleUpdate(field)}
                        >
                            Confirmer
                        </button>
                        <button
                            className="btn-group"
                            onClick={() => handleCancel(field)}
                        >
                            Annuler
                        </button>
                    </>
                ) : (
                    <div className="setting-inputs">
                        <input
                            id={field}
                            type={type}
                            name={field}
                            value={formData[field]}
                            readOnly
                            disabled
                        />
                        <button
                            className="btn-setting"
                            onClick={() =>
                                setEditField({ ...editField, [field]: true })
                            }
                        >
                            🖉
                        </button>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="container-setting">
            <h1 className="title">Modifier mon profil</h1>
            <div className="grid">
                {renderField("name", "Nom d'utilisateur")}
                {renderField("email", "Email")}
                {editField["bio"] ? (
                    <div className="textarea-group">
                        <label htmlFor="bio">Biographie</label>
                        <textarea
                            id="bio"
                            name="bio"
                            value={formData["bio"]}
                            onChange={(e) =>
                                handleInputChange("bio", e.target.value)
                            }
                        />
                        <button
                            className="btn-group"
                            onClick={() => handleUpdate("bio")}
                        >
                            Confirmer
                        </button>
                        <button
                            className="btn-group"
                            onClick={() => handleCancel("bio")}
                        >
                            Annuler
                        </button>
                    </div>
                ) : (
                    <div className="textarea-group">
                        <label htmlFor="bio">Biographie</label>
                        <textarea
                            id="bio"
                            name="bio"
                            value={formData["bio"]}
                            readOnly
                            disabled
                        />
                        <button
                            className="btn-setting"
                            onClick={() =>
                                setEditField({ ...editField, ["bio"]: true })
                            }
                        >
                            🖉
                        </button>
                    </div>
                )}

                {renderField("address", "Adresse")}
                {renderField("city", "Ville")}
            </div>
        </div>
    );
};

export default Setting;
