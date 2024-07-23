import React, { useState } from "react";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import { useCategoryContext } from "../contexts/CategoryContext";

const DropdownCategory = ({ handleSelectedCategories,fieldName}) => {
  const { categories } = useCategoryContext();
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = Array.isArray(categories)
    ? categories.map((category) => ({
        label: `${category.name}`,
        value: `${category.name}`,
      }))
    : [];

  const handleOptionsChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
    handleSelectedCategories(fieldName,selectedOptions) || handleSelectedCategories(selectedOptions) ;
  };
console.log(selectedOptions)
  return (
    <div className="dropdown-category">
      <div className="dropdown-content-category">
        <MultiSelect
          onChange={handleOptionsChange}
          options={options}
          value={selectedOptions}
          multiple={options.length > 1}
          placeholder="Sélectionnez une option"
        />
      </div>
    </div>
  );
};

export default DropdownCategory;
