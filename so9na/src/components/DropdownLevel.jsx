import React, { useState, useEffect, useRef } from "react";

const DropdownLevel = ({ handleSelectedLevel }) => {
    const [isActive, setIsActive] = useState(false);
    const [selectedLevel, setSelectedLevel] = useState([]);
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
    console.log(selectedLevel)
    return (
        <div className="dropdown" ref={menuRef}>
            <div
                className="dropdown-btn"
                onClick={() => setIsActive(!isActive)}
            >
                <h4>Niveau</h4>
                <svg
                    viewBox="0 0 20 20"
                    className={
                        isActive ? "msl-arrow-icn active" : "msl-arrow-icn "
                    }
                >
                    <line
                        stroke="currentColor"
                        stroke-linecap="round"
                        x1="10"
                        y1="14"
                        x2="4"
                        y2="8"
                    ></line>
                    <line
                        stroke="currentColor"
                        stroke-linecap="round"
                        x1="16"
                        y1="8"
                        x2="10"
                        y2="14"
                    ></line>
                </svg>
            </div>
            {isActive && (
                <div className="dropdown-content">
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
            )}
        </div>
    );
};

export default DropdownLevel;