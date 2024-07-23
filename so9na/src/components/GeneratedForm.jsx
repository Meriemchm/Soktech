import React from 'react';

const GeneratedForm = ({ fields }) => {
  const renderInput = (field) => {
    switch (field.inputType) {
      case 'input':
        return (
          <input
            type={field.type}
            name={field.label}
            id={field.label}
            placeholder={field.placeholder}
          />
        );
      case 'textarea':
        return (
          <textarea
            name={field.label}
            id={field.label}
            placeholder={field.placeholder}
          ></textarea>
        );
      default:
        return null;
    }
  };

  return (
    <div className='generated-form' >

      {fields.map((field, index) => (
        <div key={index}>
          <label htmlFor={field.label}>{field.label}</label>
          {renderInput(field)}
        </div>
      ))}

    </div> 
  );
};

export default GeneratedForm;
