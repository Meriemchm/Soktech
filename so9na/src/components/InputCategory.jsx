import React, { useState } from "react";

const InputCategory = ({ handleSelectedCategories, fieldName }) => {
  const [inputValues, setInputValues] = useState([""]);

  const handleInputChange = (index, event) => {
    const values = [...inputValues];
    values[index] = event.target.value;
    setInputValues(values);
    handleSelectedCategories(fieldName, values.join(','));
  };

  const handleAddClick = () => {
    setInputValues([...inputValues, ""]);
  };

  const handleRemoveClick = (index) => {
    const values = [...inputValues];
    values.splice(index, 1);
    setInputValues(values);
    handleSelectedCategories(fieldName, values.join(','));
  };

  return (
    <div className="Input-category">
      {inputValues.map((inputValue, index) => (
        <div className="Input-category-input" key={index}>
          <input
            type="text"
            value={inputValue}
            onChange={(event) => handleInputChange(index, event)}
          />
          <button className="Input-category-button" onClick={() => handleRemoveClick(index)}>-</button>
        </div>
      ))}
      <button className="Input-category-button" onClick={handleAddClick}>+</button>
    </div>
  );
};

export default InputCategory;
