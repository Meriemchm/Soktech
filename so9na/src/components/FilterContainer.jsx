import React, { useState, useEffect, useRef } from "react";
import DropdownCategory from "./DropdownCategory";

export const FilterItem = () =>{
    return(
<div className="filter-item">
                        <div className="input-filter">
                            <label for="price">prix</label>
                            <input id="price" type="text"></input>
                        </div>
                 
                    </div>
    )
}
export const FilterBtn = () =>{
    return(
        <div className='btns-filter' >
        <button
            className="btn-search-filter"
            onClick={() => {
                setIsActive(false);
            }}
        >
            chercher
        </button>
        <button className="btn-clean-filter">annuler</button>
        </div>
    )
}


export const FilterContainer = ({handleSelectedCategories})=> {
    return (
        <div className='filter-container' >
<label >Categorie</label>
<div className='category-filter' >
<DropdownCategory handleSelectedCategories={handleSelectedCategories}/>
</div>
          
            
        </div>
    );
}
export const FilterContainerCategorie = ({ handleSelectedLevel })=> {
    const [selectedLevel, setSelectedLevel] = useState([]);
    
    const handleLevelSelected = (event) => {
        const value = event.target.value;
        const index = selectedLevel.indexOf(value);
    
        if (index === -1) {
          setSelectedLevel((prevSelectedLevel) => [...prevSelectedLevel, value]);
          handleSelectedLevel([...selectedLevel, value]);
        } else {
          const newSelectedLevels = [...selectedLevel];
          newSelectedLevels.splice(index, 1);
          setSelectedLevel((prevSelectedLevel) => [...prevSelectedLevel.slice(0, index), ...prevSelectedLevel.slice(index + 1)]);
          handleSelectedLevel([...selectedLevel.slice(0, index), ...selectedLevel.slice(index + 1)]);
        }
      };
    return (
        <div className='filter-container' >
<label >Niveau</label>
<div className="dropdown-item-Level">
                        <div className="stars">
                            <label for="level-1">
                                <input id="level-1" type="checkbox" value="1" onChange={handleLevelSelected} checked={selectedLevel.includes("1")} />
                                <span className="stars-1">
                                    <i
                                        className="fa fa-star star-1"
                                        aria-hidden="true"
                                    ></i>
                                    <i
                                        className="fa fa-star star-1"
                                        aria-hidden="true"
                                    ></i>
                                    <i
                                        className="fa fa-star star-1"
                                        aria-hidden="true"
                                    ></i>
                                    <i
                                        className="fa fa-star star-1"
                                        aria-hidden="true"
                                    ></i>
                                    <i
                                        className="fa fa-star star-1"
                                        aria-hidden="true"
                                    ></i>
                                </span>
                            </label>
                        </div>
                        <div className="stars">
                            <label for="level-2">
                                <input id="level-2" type="checkbox" value="2" onChange={handleLevelSelected} checked={selectedLevel.includes("2")}/>
                                <span className="stars-2">
                                    <i
                                        className="fa fa-star star-2"
                                        aria-hidden="true"
                                    ></i>
                                    <i
                                        className="fa fa-star star-2"
                                        aria-hidden="true"
                                    ></i>
                                    <i
                                        className="fa fa-star star-2"
                                        aria-hidden="true"
                                    ></i>
                                    <i
                                        className="fa fa-star star-2"
                                        aria-hidden="true"
                                    ></i>
                                    <i
                                        className="fa fa-star star-2"
                                        aria-hidden="true"
                                    ></i>
                                </span>
                            </label>
                        </div>
                        <div className="stars">
                            <label for="level-3">
                                <input id="level-3" type="checkbox" value="3" onChange={handleLevelSelected} checked={selectedLevel.includes("3")} />
                                <span className="stars-3">
                                    <i
                                        className="fa fa-star star-3"
                                        aria-hidden="true"
                                    ></i>
                                    <i
                                        className="fa fa-star star-3"
                                        aria-hidden="true"
                                    ></i>
                                    <i
                                        className="fa fa-star star-3"
                                        aria-hidden="true"
                                    ></i>
                                    <i
                                        className="fa fa-star star-3"
                                        aria-hidden="true"
                                    ></i>
                                    <i
                                        className="fa fa-star star-3"
                                        aria-hidden="true"
                                    ></i>
                                </span>
                            </label>
                        </div>
                        <div className="stars">
                            <label for="level-4">
                                <input id="level-4" type="checkbox" value="4" onChange={handleLevelSelected} checked={selectedLevel.includes("4")} />
                                <span className="stars-4">
                                    <i
                                        className="fa fa-star star-4"
                                        aria-hidden="true"
                                    ></i>
                                    <i
                                        className="fa fa-star star-4"
                                        aria-hidden="true"
                                    ></i>
                                    <i
                                        className="fa fa-star star-4"
                                        aria-hidden="true"
                                    ></i>
                                    <i
                                        className="fa fa-star star-4"
                                        aria-hidden="true"
                                    ></i>
                                    <i
                                        className="fa fa-star star-4"
                                        aria-hidden="true"
                                    ></i>
                                </span>
                            </label>
                        </div>
                        <div className="stars">
                            <label for="level-5">
                                <input id="level-5" type="checkbox" value="5" onChange={handleLevelSelected} checked={selectedLevel.includes("5")} />
                                <span className="stars-5">
                                    <i
                                        className="fa fa-star"
                                        aria-hidden="true"
                                    ></i>
                                    <i
                                        className="fa fa-star"
                                        aria-hidden="true"
                                    ></i>
                                    <i
                                        className="fa fa-star"
                                        aria-hidden="true"
                                    ></i>
                                    <i
                                        className="fa fa-star"
                                        aria-hidden="true"
                                    ></i>
                                    <i
                                        className="fa fa-star"
                                        aria-hidden="true"
                                    ></i>
                                </span>
                            </label>
                        </div>
                    </div>
                   

                    
                   
            
        </div>
    );
}
