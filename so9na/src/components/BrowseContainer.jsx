import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import DropdownCategory from "./DropdownCategory";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import axiosClient from "../axios-client";
import { FaFilter } from "react-icons/fa";
import { FilterContainer } from "./FilterContainer";
import { useCategoryContext } from "../contexts/CategoryContext";

const BrowseContainer = () => {
  const itemsPerPage = 8;
  const [itemOffset, setItemOffset] = useState(0);
  const [responses, setResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [users, setUsers] = useState({});
  const { categories } = useCategoryContext();

  const getCategoryName = useCallback((categoryId) => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.name : null;
  }, [categories]);

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
  }, []);

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axiosClient.get("/allresponses");
        const filteredResponse = response.data.filter(
          (response) => response.category_id !== null
        );

        setResponses(filteredResponse);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        setError("Une erreur s'est produite lors de la récupération des données.");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const getUserInfo = async (userId) => {
      try {
        const response = await axiosClient.get(`/user/${userId}`);
        return response.data;
      } catch (error) {
        if (error.response && error.response.status === 429) {
          await new Promise((resolve) => setTimeout(resolve, 3000));
          return getUserInfo(userId);
        } else {
          console.error(error);
          throw error;
        }
      }
    };

    const fetchUsers = async () => {
      try {
        const userPromises = responses.map((response) => {
          const userId = response.userId;
          return getUserInfo(userId);
        });
        const usersData = await Promise.all(userPromises);
        const usersMap = {};
        usersData.forEach((userData, index) => {
          const user = userData[0];
          const userId = responses[index].userId;
          usersMap[userId] = user;
        });
        setUsers(usersMap);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          setTimeout(fetchUsers, 3000);
        } else {
          console.error(error);
        }
      }
    };

    if (responses.length > 0) {
      fetchUsers();
    }
  }, [responses]);

  const handleSelectedCategories = useCallback((selectedCategories) => {
    setSelectedCategories(selectedCategories);
  }, []);

  const handlePageClick = useCallback(
    (event) => {
      const newOffset = event.selected * itemsPerPage;
      setItemOffset(newOffset);
    },
    [itemsPerPage]
  );

  const startOffset = itemOffset;
  const endOffset = itemOffset + itemsPerPage;

  const filteredResponses = useMemo(() => {
    let filteredResponses = [...responses];
    if (selectedCategories.length > 0) {
      filteredResponses = filteredResponses.filter((response) => {
        const categoryName = getCategoryName(response.category_id);
        return selectedCategories.includes(categoryName);
      });
    }
    return filteredResponses;
  }, [responses, selectedCategories, getCategoryName]);

  const pageCount = useMemo(
    () => Math.ceil(filteredResponses.length / itemsPerPage),
    [filteredResponses.length, itemsPerPage]
  );

  const displayedResponses = useMemo(
    () => filteredResponses.slice(startOffset, endOffset),
    [filteredResponses, startOffset, endOffset]
  );

  const handleBrowseDetailNavigation = useCallback(
    (response) => {
      navigate(`/browse/browseDetail/${response.id}`, {
        state: {
          response,
        },
      });
    },
    [navigate]
  );

  const handleProfileNavigation = useCallback(
    (userId) => {
      navigate(`/browse/profilUser/${userId}`, {
        state: {
          response,
        },
      });
    },
    [navigate]
  );

  return (
    <>
      {isLoading ? (
        <h3 className="Chargement-en-cours">Chargement...</h3>
      ) : (
        <>
          <div className="browse-container">
            <div className="browse-title-description">
              <h2>Problème</h2>
              <p>Parcourez les problèmes.</p>
            </div>
            <div className="Dropdown-browse">
              {windowSize >= 960 ? (
                <DropdownCategory
                  handleSelectedCategories={handleSelectedCategories}
                />
              ) : (
                <div ref={menuRef}>
                  <div
                    className="filter-btn"
                    onClick={() => {
                      setIsActive(!isActive);
                    }}
                  >
                    <h4>Filter</h4>
                    <FaFilter className="filter-icon" />
                  </div>
                  {isActive && (
                    <div className=" filter-container-browse">
                      <FilterContainer
                        handleSelectedCategories={handleSelectedCategories}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="browse-cards-container">
              {filteredResponses.length > 0 ? (
                displayedResponses.map((response, index) => {
                  const responses = JSON.parse(response.reponses);
                  const categoryName = getCategoryName(response.category_id);
                  const user = users[response.userId];
                  const photo = user
                    ? `http://localhost:8000/storage/users/${user.photo}`
                    : "";
                  const username = user ? user.name : "";
                  return (
                    <div
                      className="browse-card-container"
                      key={response.id}
                    >
                      <div className="browse-colomn">
                        <div className="browse-row">
                          <div className="img-container">
                            <img src={photo} alt="userPic" />
                          </div>
                          <h2
                            className="userName"
                            onClick={() => {
                              handleProfileNavigation(response.userId);
                            }}
                          >
                            {username}
                          </h2>
                        </div>
                        <p
                          className="browse-description"
                          key={response.id}
                          onClick={() => {
                            handleBrowseDetailNavigation(response);
                          }}
                        >
                          {responses[0]}
                        </p>
                        <div className="browse-categories">
                          <div className="browse-category">
                            <p>{categoryName}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <h3 className="No-item">Pas de réponses.</h3>
              )}
            </div>
          </div>
          <ReactPaginate
            breakLabel="..."
            nextLabel="suivant >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel="< precedent"
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            pageLinkClassName="page-num"
            previousLinkClassName="page-num"
            nextLinkClassName="page-num"
            activeLinkClassName="active"
          />
        </>
      )}
    </>
  );
};

export default BrowseContainer;
