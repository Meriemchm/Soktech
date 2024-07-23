import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCategoryContext } from "../contexts/CategoryContext";
import { useNavigate } from "react-router-dom";

const Dropdown = () => {
  const [click, setClick] = useState(false);
  const { categories } = useCategoryContext();
  const navigate = useNavigate();

  const handleNavigate = (categorie) => {
    navigate(`/categorie`, { state: { service: categorie } });
  };

  return (
    <>
      <ul
        onClick={() => setClick(!click)}
        className={click ? "dropdown-menu clicked" : "dropdown-menu"}
      >
        {categories.map((item, index) => {
          return (
            <li key={index}>
              <p
                className="dropdown-link"
                onClick={() => {
                  setClick(false);
                  handleNavigate(item );
                }}
              >
                {item.name}
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Dropdown;
