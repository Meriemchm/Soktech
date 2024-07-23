import React, { useState } from 'react';
import GeneratedForm from './GeneratedForm';
const FormBuilder = ({ formData, setFormData, formType }) => {
  const [fields, setFields] = useState([]);

  const addField = (event) => {
    event.preventDefault();
    setFields([...fields, { label: '', placeholder: '', type: 'text', inputType: 'input' }]);
};

const removeField = (index, event) => {
    event.preventDefault();
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
};


  const updateField = (index, field) => {
    const newFields = [...fields];
    newFields[index] = field;
    setFields(newFields);

    setFormData({
      ...formData,
      ["fields"]: newFields
    });
  };

  return (
    <div className="form-builder">
      <h1>Créer un formulaire</h1>
      <form>
          {fields.map((field, index) => (
            <div key={index}  className="field-row">
              <label>
                Label :
                <input
                  type="text"
                  value={field.label}
                  onChange={(e) => updateField(index, { ...field, label: e.target.value })}
                />
              </label>
              <label>
                placeholder :
                <input
                  type="text"
                  value={field.placeholder}
                  onChange={(e) => updateField(index, { ...field, placeholder: e.target.value })}
                />
              </label>
              <label>
                Entrée :
                  <select
                    value={field.inputType}
                    onChange={(e) => updateField(index, { ...field, inputType: e.target.value })}
                  >
                  <option value="input">Input</option>
                  <option value="textarea">Textarea</option>
                </select>
              </label>
              {field.inputType === 'input' && (
                <label>
                  Type :
                    <select
                      value={field.type}
                      onChange={(e) => updateField(index, { ...field, type: e.target.value })}
                    >
                    <option value="text">Texte</option>
                    <option value="number">Numérique</option>
                    <option value="email">E-mail</option>
                  </select>
                </label>
              )}
              <button onClick={(event) => removeField(index, event)}>Supprimer</button>
            </div>
            ))}
            <button onClick={(event) => addField(event)}>Ajouter un champ</button>
          <div>
          <h1 className='apercu' >Aperçu</h1>
          <GeneratedForm fields={fields} />
        </div>
        {/* <button type="submit">Enregistrer le formulaire</button> */}
      </form>
    </div>
  );
};

export default FormBuilder;

   
 
