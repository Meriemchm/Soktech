import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import DropdownCardPrice from "./DropdownCardPrice";
import DropdownLevel from "./DropdownLevel";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaFilter } from "react-icons/fa";
import { FilterContainerCategorie } from "./FilterContainer";

const CardCategorie = (props) => {
    const itemsPerPage = 8;
    const [itemOffset, setItemOffset] = useState(0);
    const [services, setServices] = useState([]);
    const [userPhotos, setUserPhotos] = useState({});
    const [userNames, setUserNames] = useState({});
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const [selectedLevel, setSelectedLevel] = useState([]);
    const [averageRatings, setAverageRatings] = useState({});
    const [isActive, setIsActive] = useState(false);
    let menuRef = useRef();

    // Handler pour click en dehors du menu
    const handler = useCallback((e) => {
        if (!menuRef.current.contains(e.target)) {
            setIsActive(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, [handler]);

    // Handler pour le redimensionnement de la fenêtre
    const handleResize = useCallback(() => {
        setWindowSize(window.innerWidth);
    }, []);

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [handleResize]);

    // Fetch ratings for services
    const fetchRatingsByService = useCallback(async (serviceId) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/api/comments/service/${serviceId}`
            );
            const ratings = response.data.map((comment) => comment.rating);
            const sum = ratings.reduce((a, b) => a + b, 0);
            const average = sum / ratings.length;
            setAverageRatings((prev) => ({
                ...prev,
                [serviceId]: average,
            }));
        } catch (error) {
            console.error(
                `Erreur lors de la récupération des commentaires pour le service avec l'ID ${serviceId}:`,
                error
            );
        }
    }, []);

    useEffect(() => {
        services.forEach((service) => {
            fetchRatingsByService(service.id);
        });
    }, [services, fetchRatingsByService]);

    // Optimisation des requêtes d'API
    useEffect(() => {
        const fetchServicesAndUserPhotos = async (category) => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/api/services/category/${category}`
                );
                setServices(response.data);

                const fetchUserPhotos = async (services) => {
                    try {
                        const promises = services.map((service) =>
                            axios.get(
                                `${import.meta.env.VITE_API_BASE_URL}/api/users/${service.idUser}/photo`
                            )
                        );
                        const responses = await Promise.all(promises);
                        const photos = {};
                        const userNames = {};
                        responses.forEach((response, index) => {
                            const service = services[index];
                            if (response.data && response.data.photo) {
                                photos[service.idUser] = response.data.photo;
                                userNames[service.idUser] =
                                    response.data.userName;
                            } else {
                                console.error(
                                    "Invalid photo data:",
                                    response.data
                                );
                            }
                        });
                        setUserPhotos(photos);
                        setUserNames(userNames);
                    } catch (error) {
                        console.error(
                            "Erreur lors de la récupération des photos :",
                            error
                        );
                    }
                };

                await fetchUserPhotos(response.data);
            } catch (error) {
                console.error(
                    "Erreur lors de la récupération des services :",
                    error
                );
            }
        };

        if (props.service) {
            fetchServicesAndUserPhotos(props.service.name);
        }
    }, [props.service]);

    // Utiliser useMemo pour le filtrage des services
    const filteredServices = useMemo(() => {
        let result = [...services];
        if (selectedLevel.length > 0) {
            result = result.filter((service) => {
                const averageRating = averageRatings[service.id];
                return selectedLevel.some((level) => {
                    const floorLevel = Math.floor(averageRating);
                    return floorLevel === parseInt(level);
                });
            });
        }
        return result;
    }, [services, selectedLevel, averageRatings]);

    // Utiliser useMemo pour le calcul de la pagination
    const pageCount = useMemo(() => {
        return Math.ceil(filteredServices.length / itemsPerPage);
    }, [filteredServices]);

    const handleSelectedLevel = (selectedLevel) => {
        setSelectedLevel(selectedLevel);
    };

    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage;
        setItemOffset(newOffset);
    };

    const startOffset = itemOffset;
    const endOffset = itemOffset + itemsPerPage;
    const displayedServices = filteredServices.slice(startOffset, endOffset);
    const nameService = props.service.name;
    return (
        <>
            {services.length > 0 ? (
                <>
                    <h3 className="categorie-card-title">{nameService}</h3>

                    <div className="Dropdown-card">
                        {windowSize >= 960 ? (
                            <>
                                <DropdownLevel
                                    handleSelectedLevel={handleSelectedLevel}
                                />
                            </>
                        ) : (
                            <div    ref={menuRef}>
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
                                        <FilterContainerCategorie
                                            handleSelectedLevel={
                                                handleSelectedLevel
                                            }
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="wrapper">
                        {filteredServices.length > 0 ? (
                            displayedServices.map((item, index) => {
                                const imageUrl = `http://localhost:8000/storage/services/${item.image}`;
                                const photo = `${
                                    import.meta.env.VITE_API_BASE_URL
                                }/storage/users/${userPhotos[item.idUser]}`;
                                const userName = userNames[item.idUser];
                                return (
                                    <div
                                        className="categorie-card"
                                        key={item.id}
                                    >
                                        <div
                                            className="card-image"
                                            key={item.id}
                                            onClick={() => {
                                                navigate(
                                                    `/categorie/cardDetail/${item.id}`,
                                                    { state: { item } }
                                                );
                                            }}
                                        >
                                            <img
                                                src={imageUrl}
                                                className="card-image"
                                            />
                                        </div>
                                        <div
                                            className="profil-Detail"
                                            onClick={() => {
                                                navigate(
                                                    `/categorie/profilUser/${item.idUser}`,
                                                    { state: { item } }
                                                );
                                            }}
                                        >
                                            <div className="img-container">
                                                <img
                                                    src={photo}
                                                    alt="userPic"
                                                />
                                            </div>
                                            <h2 className="userName">
                                                {userName}
                                            </h2>
                                        </div>
                                        <div className="card-detail">
                                            <p className="card-description">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <h3 className="No-item">Pas de Services.</h3>
                        )}
                    </div>
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        pageCount={pageCount}
                        previousLabel="< previous"
                        renderOnZeroPageCount={null}
                        containerClassName="pagination"
                        pageLinkClassName="page-num"
                        previousLinkClassName="page-num"
                        nextLinkClassName="page-num"
                        activeLinkClassName="active"
                    />
                </>
            ) : (
                <>
                    <h3 className="Chargement-en-cours">Chargement...</h3>
                </>
            )}
        </>
    );
};

export default CardCategorie;
