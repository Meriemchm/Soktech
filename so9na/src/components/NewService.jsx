import React, { useState } from "react";
import DropdownCategory from "./DropdownCategory";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";
import { useNavigate } from "react-router-dom";

const NewService = ({ formData, setFormData, formType }) => {
    const [values, setValues] = useState({
        imageService: "",
        descriptionService: "",
        categoryService: [],
        detailsService: "",
    });
    const navigate = useNavigate();

    const { user } = useStateContext();
    const [selectedImage, setSelectedImage] = useState(null);

    const handleSelectedCategories = (fieldName, selectedCategories) => {
        const categoriesArray = selectedCategories.split(",");
      
        setFormData((prevFormData) => ({
          ...prevFormData,
          [fieldName]: categoriesArray,
        }));
        
        console.log("FormData.categoryService : ", formData.categoryService);
        setValues({ ...values, [fieldName]: categoriesArray });
      };
      

    const onChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "imageService") {
            setSelectedImage(files[0]);
            console.log(files[0]);
            setFormData({
                ...formData,
                ["imageService"]: { imageService: files[0] },
            });
            setValues({ ...values, imageService: files[0] });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
            setValues({ ...values, [name]: value });
        }
    };

    return (
        <div className="new-service">
            <h1 className="new-service-title">Ajoute un Service</h1>
            <form>
                <div className="new-service-form">
                    <div className="new-service-inputs">
                        <div className="new-service-input">
                            <label For="imageService">Image:</label>
                            <input
                                type="file"
                                id="imageService"
                                name="imageService"
                                onChange={onChange}
                            ></input>
                        </div>
                        {selectedImage && (
                            <div className="new-service-images">
                                <img
                                    src={URL.createObjectURL(selectedImage)}
                                    alt="Preview"
                                    className="new-service-image"
                                />
                            </div>
                        )}
                    </div>

                    <div className="new-service-area">
                        <label for="descriptionService">Résumé</label>
                        <textarea
                            name="descriptionService"
                            id="descriptionService"
                            cols="30"
                            rows="3"
                            placeholder="Résumé de ton service"
                            onChange={onChange}
                            value={values.descriptionService}
                        ></textarea>
                    </div>

                    <div className="new-service-area">
                        <label for="detailsService">Details</label>
                        <textarea
                            name="detailsService"
                            id="detailsService"
                            cols="30"
                            rows="10"
                            placeholder="Plus de details à propos de ton service"
                            onChange={onChange}
                            value={values.detailsService}
                        ></textarea>
                    </div>

                    <div className="new-service-categorie">
                        <label>Categorie</label>
                        <DropdownCategory
                            handleSelectedCategories={handleSelectedCategories}
                            fieldName="categoryService"
                        />
                    </div>

                    {/*   <div className="button-add-services">
                        <input
                            type="submit"
                            value="Validate"
                            className="button-add-service"
                        />
                    </div> */}
                </div>
            </form>
        </div>
    );
};

export default NewService;
