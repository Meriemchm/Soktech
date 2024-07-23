import React, { useState } from "react";

const PaymentForm = ({ setFormData }) => {
  const [errors, setErrors] = useState({});
  const [expirationDate, setExpirationDate] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "expirationDate") {
      const formattedValue = formatExpirationDate(value);
      setExpirationDate(formattedValue);
      setFormData((prevState) => ({
        ...prevState,
        [name]: formattedValue,
      }));
      validateField(name, formattedValue);
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      validateField(name, value);
    }
  };

  const formatExpirationDate = (value) => {
    const sanitizedValue = value.replace(/[^0-9]/g, "").slice(0, 4);
    let formattedValue = "";
    if (sanitizedValue.length >= 2) {
      formattedValue = sanitizedValue.slice(0, 2) + " / " + sanitizedValue.slice(2);
    } else {
      formattedValue = sanitizedValue;
    }
    return formattedValue;
  };

  const validateField = (fieldName, value) => {
    let fieldError = "";
    if (fieldName === "cardNumber") {
      if (!value) {
        fieldError = "Le numéro de carte est requis.";
      } else if (!/^\d{16}$/.test(value)) {
        fieldError = "Le numéro de carte doit contenir 16 chiffres.";
      }
    } else if (fieldName === "expirationDate") {
      if (!value) {
        fieldError = "La date d'expiration est requise.";
      } else if (!/^\d{2} \/ \d{2}$/.test(value)) {
        fieldError = "La date d'expiration doit être au format MM / AA.";
      }
    } else if (fieldName === "securityNumber") {
      if (!value) {
        fieldError = "Le numéro de sécurité est requis.";
      } else if (!/^\d{3}$/.test(value)) {
        fieldError = "Le numéro de sécurité doit contenir 3 chiffres.";
      }
    } else if (fieldName === "firstName") {
      if (!value) {
        fieldError = "Le prénom est requis.";
      }
    } else if (fieldName === "lastName") {
      if (!value) {
        fieldError = "Le nom de famille est requis.";
      }
    }
    setErrors((prevState) => ({
      ...prevState,
      [fieldName]: fieldError,
    }));
  };

  return (
    <div className="PaymentForm">
      <div className="card-payment">
        <div className="form-order-service">
          <label htmlFor="CardNumber">Numero de la carte</label>
          <input
            id="CardNumber"
            type="text"
            name="cardNumber"
            onChange={handleInputChange}
            pattern="\d{16}"
          />
          {errors.cardNumber && <span className="error">{errors.cardNumber}</span>}
        </div>
        <div className="card-payment-container ">
          <div className="form-order-service a">
            <label htmlFor="ExpirationDate">Date d'expiration</label>
            <input
              id="ExpirationDate"
              type="text"
              name="expirationDate"
              placeholder="MM / AA"
              value={expirationDate}
              onChange={handleInputChange}
              pattern="\d{2} \/ \d{2}"
            />
            {errors.expirationDate && (
              <span className="error">{errors.expirationDate}</span>
            )}
          </div>
          <div className="form-order-service a">
            <label htmlFor="SecurityNumber">Numero de sécurité</label>
            <input
              id="SecurityNumber"
              type="text"
              name="securityNumber"
              onChange={handleInputChange}
              pattern="\d{3}"
            />
            {errors.securityNumber && (
              <span className="error">{errors.securityNumber}</span>
            )}
          </div>
        </div>
      </div>
      <div className="order-card-user">
        <div className="form-order-service">
          <label htmlFor="FirstName">Prénom</label>
          <input
            id="FirstName"
            type="text"
            name="firstName"
            onChange={handleInputChange}
          />
          {errors.firstName && <span className="error">{errors.firstName}</span>}
        </div>
        <div className="form-order-service">
          <label htmlFor="SecondName">Nom de famille</label>
          <input
            id="SecondName"
            type="text"
            name="lastName"
            onChange={handleInputChange}
          />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
