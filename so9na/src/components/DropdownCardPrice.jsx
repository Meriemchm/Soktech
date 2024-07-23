import React, { useState, useEffect, useRef } from "react";

const DropdownCardPrice = ({ handleSelectedPrice }) => {
  const [isActive, setIsActive] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    handleSelectedPrice(inputValue);
    setIsActive(false);
  };

  const handleReset = () => {
    setInputValue("");
    handleSelectedPrice("");
  };

  let menuRef = useRef();

  useEffect(() => {
      let handler = (e) => {
          if (!menuRef.current.contains(e.target)) {
              setIsActive(false);
          }
      };

      document.addEventListener("mousedown", handler);

      return () => {
          document.removeEventListener("mousedown", handler);
      };
  });

  return (
    <div className="dropdown" ref={menuRef}>
      <div
        className="dropdown-btn"
        onClick={() => setIsActive(!isActive)}
      >
        <h4>Prix</h4>
        <svg
          viewBox="0 0 20 20"
          className={
            isActive ? "msl-arrow-icn active" : "msl-arrow-icn"
          }
        >
          <line
            stroke="currentColor"
            strokeLinecap="round"
            x1="10"
            y1="14"
            x2="4"
            y2="8"
          ></line>
          <line
            stroke="currentColor"
            strokeLinecap="round"
            x1="16"
            y1="8"
            x2="10"
            y2="14"
          ></line>
        </svg>
      </div>
      {isActive && (
        <div className="dropdown-content">
          <div className="dropdown-item">
            <div className="input-item">
              <label htmlFor="price">Prix </label>
              <input
                id="price"
                type="text"
                placeholder="max"
                value={inputValue}
                onChange={handleInputChange}
              />
            </div>
            <button
              className="btn-search"
              onClick={handleSearch}
            >
              Chercher
            </button>
            <button
              className="btn-clean-price"
              onClick={handleReset}
            >
              Réinitialiser
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownCardPrice;
