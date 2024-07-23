import React from 'react';
import { useCategoryContext } from '../contexts/CategoryContext';

const CategorySelector = ({ onChange }) => {

  const { categories } = useCategoryContext();

  return (
    <div className="dropdown-category-selector">
      <div className="dropdown-content-category-selector">
        <select onChange={onChange}>
          <option value="" disabled selected>
            Select Category
          </option>
          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CategorySelector;
