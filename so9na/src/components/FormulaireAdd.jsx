import React, { useState } from 'react';
import CategorySelector from './CategorySelector';
import axios from "axios";

const FormulaireAdd = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formItems, setFormItems] = useState([]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleAddFormItem = (event, inputType) => {
    event.preventDefault();
    setFormItems([
      ...formItems,
      {
        id: Date.now(),
        inputType,
        label: '',
        placehorlder:'',
        questionValue: '',
        prevQuestionValue: '',
        questionLabel: false,
      },
    ])
  };

  const handleSubmit = async () => {
    try {
      const labels = formItems.map(item => item.label);
      const placeholders = formItems.map(item => item.placeholder);
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/formulaires`, {
        content: labels,
        placeholders: placeholders,
        category_id: selectedCategory,
      });
      console.log(response.data);
      // Handle successful submission, e.g., display a success message or redirect the user
    } catch (error) {
      console.error(error);
      // Handle errors, e.g., display an error message
    }
  };
  
  
  const handleInputChange = (id, field, value) => {
    setFormItems(
      formItems.map((item) =>
        item.id === id
          ? { ...item, [field]: value }
          : item
      )
    );
  };
  const handleConfirm = (id) => {
    setFormItems(
      formItems.map((item) =>
        item.id === id
          ? { ...item, questionLabel: true }
          : item
      )
    );
  };

  const handleModify = (id) => {
    setFormItems(
      formItems.map((item) =>
        item.id === id
          ? { ...item, questionLabel: false, prevQuestionValue: item.questionValue }
          : item
      )
    );
  };

  const handleDelete = (id) => {
    setFormItems(formItems.filter((item) => item.id !== id));
  };

  const handleCancel = (id) => {
    setFormItems(
      formItems.map((item) =>
        item.id === id
          ? { ...item, questionValue: item.prevQuestionValue, questionLabel: true }
          : item
      )
    );
  };
  const renderInput = (item) => {
    // switch (item.inputType) {
      // case 'text':
        return (
          <>
            <label>{item.label}:</label>
            <input
              type="text"
              placeholder={item.placeholder}
              onChange={(e) =>
                handleInputChange(item.id, 'questionValue', e.target.value)
              }
              disabled
            />
          </>
        );
      // case 'textarea':
    //     return (
    //       <>
    //         <label>{item.label}:</label>
    //         <textarea
    //           value={item.questionValue}
    //           onChange={(e) =>
    //             handleInputChange(item.id, 'questionValue', e.target.value)
    //           }
    //         />
    //       </>
    //     );
    //   default:
    //     return null;
    // }
  };
  
  
  return (
    <div className="form-container-add" >
      <CategorySelector onChange={handleCategoryChange} />
      {selectedCategory && (
  <div>
    <button onClick={(e) => handleAddFormItem(e, 'text')} className="add-button">
      + Text Input
    </button>
    {/* <button onClick={(e) => handleAddFormItem(e, 'textarea')} className="add-button">
      + Textarea
    </button> */}
  </div>
)}

{formItems.map((item) => (
        <div key={item.id} className="form-item">
          {item.questionLabel ? (
            <div>
              {renderInput(item)}
              <button className='form-item-modif' onClick={() => handleModify(item.id)}>
                Modifier
              </button>
            </div>
          ) : (
            <div className='form-item-add' >
              <input
                type="text"
                value={item.label}
                placeholder="Label"
                onChange={(e) =>
                  handleInputChange(item.id, 'label', e.target.value)
                }
                className="label-input"
              />
              <input
                type="text"
                value={item.placeholder}
                placeholder="placeholder"
                onChange={(e) =>
                  handleInputChange(item.id, 'placeholder', e.target.value)
                }
                className="label-input"
              />
              {renderInput(item)}
              <button onClick={() => handleConfirm(item.id)}>
                Confirmer
              </button>
              <button onClick={() => handleCancel(item.id)}>
                Annuler
              </button>
        
            </div>
          )}
            <button className='form-add-supp' onClick={() => handleDelete(item.id)}>
            Supprimer
          </button>
        </div>
      ))}

      <button onClick={handleSubmit} className="submit-button">
        Submit
      </button>
    </div>
  );
};

export default FormulaireAdd;
