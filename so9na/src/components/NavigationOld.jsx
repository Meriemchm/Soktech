import React, { useState, useEffect, useRef } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";
import Sign from "./Sign";
import Login from "./Login";
import Notification from "./Notification";
import { useFunctions } from "./useFunctions";
import { useStateContext } from "../contexts/ContextProvider";
import DropdownProfil from "./DropdownProfil";
import axiosClient from "../axios-client.js";

const navigation = () => {
    let notificationRef = useRef();
    let orderRef = useRef();
    let profilRef = useRef();
    const { unlockScroll, scrolltotop } = useFunctions();
    const [buttonSign, setButtonSign] = useState(false);
    const [buttonLogin, setButtonLogin] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const [click, setClick] = useState(false);
    const [show, setShow] = useState(false);
    const [showProfil, setShowProfil] = useState(false);
    const [showOrder, setShowOrder] = useState(false);
    const [toggle, setToggle] = useState(false);
    const { user, token, setUser, setToken } = useStateContext();
    const handleShow = () => setShow(!show);
    const handleShowProfil = () => setShowProfil(!showProfil);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    const [userLoaded, setUserLoaded] = useState(false);
    const navigate = useNavigate();
    const [hasUnreadNotification, setHasUnreadNotification] = useState(false);

    const photoUrl = `http://localhost:8000/storage/users/${user.photo}`;
    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
            setUserLoaded(true);
        });
    }, []);

    const onLogout = (ev) => {
        ev.preventDefault();

        axiosClient.post("/logout").then(() => {
            setUser({});
            setToken(null);
            navigate("/");
        });
    };
    const onMouseEnter = () => {
        if (window.innerWidth < 960) {
            setDropdown(false);
        } else {
            setDropdown(true);
        }
    };

    const onMouseLeave = () => {
        if (window.innerWidth < 960) {
            setDropdown(false);
        } else {
            setDropdown(false);
        }
    };
    useEffect(() => {
        let handler = (e) => {
            if (
                notificationRef.current &&
                !notificationRef.current.contains(e.target)
            ) {
                setShow(false);
            }
        };
        let handlerOrder = (e) => {
            if (orderRef.current && !orderRef.current.contains(e.target)) {
                setShowOrder(false);
            }
        };
        let handlerProfil = (e) => {
            if (profilRef.current && !profilRef.current.contains(e.target)) {
                setShowProfil(false);
            }
        };

        document.addEventListener("mousedown", handler);
        document.addEventListener("mousedown", handlerOrder);
        document.addEventListener("mousedown", handlerProfil);
        return () => {
            document.removeEventListener("mousedown", handler);
            document.removeEventListener("mousedown", handlerOrder);
            document.removeEventListener("mousedown", handlerProfil);
        };
    });

    const handleConnect = () => {
        if (!token) {
            return (
                <ul className={click ? "nav-menu active" : "nav-menu"}>
                    {/* */}

                    <li className="nav-item">
                        <Link
                            to="/"
                            className="nav-links"
                            onClick={closeMobileMenu}
                        >
                            <i class="fa fa-globe" /> Francais
                        </Link>
                    </li>

                    <li
                        className="nav-item"
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                        onClick={closeMobileMenu}
                    >
                        Services <i className="fas fa-caret-down" />
                        {dropdown && <Dropdown />}
                    </li>
                    <li className="nav-item">
                        <Link
                            to="/browse"
                            className="nav-links"
                            onClick={closeMobileMenu}
                        >
                            Probleme
                        </Link>
                    </li>
                    <li className="nav-item">
                        <button
                            className="btn"
                            onClick={() => {
                                scrolltotop();
                                setButtonSign(true);
                                closeMobileMenu();
                                unlockScroll();
                            }}
                        >
                            Inscription
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className="btn1"
                            onClick={() => {
                                scrolltotop();
                                setButtonLogin(true);
                                closeMobileMenu();
                                unlockScroll();
                            }}
                        >
                            connexion
                        </button>
                    </li>
                </ul>
            );
        } else {
            return (
                <ul className={click ? "nav-menu active" : "nav-menu"}>
                    {/* */}
                    <li className={click ? "nav-item inactive" : "nav-item"}>
                        <Link
                            to="/"
                            className="nav-links"
                            onClick={closeMobileMenu}
                        >
                            <i class="fa fa-globe" /> Francais
                        </Link>
                    </li>
                    <li
                        className={click ? "nav-item inactive" : "nav-item"}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                        onClick={closeMobileMenu}
                    >
                        Solution
                        <i className="fas fa-caret-down" />
                        {dropdown && <Dropdown />}
                    </li>
                    <li className={click ? "nav-item inactive" : "nav-item"}>
                        <Link
                            to="/browse"
                            className="nav-links"
                            onClick={closeMobileMenu}
                        >
                            Probleme
                        </Link>
                    </li>
                    {/* /*-------------*/}
                    <li className={click ? "nav-item inactive" : "nav-item"}>
                        <Link
                            to="/Progression"
                            className="nav-links"
                            onClick={closeMobileMenu}
                        >
                            Progression
                        </Link>
                    </li>
                    <li
                        className={click ? "nav-item inactive" : "nav-item"}
                        onClick={() => {
                            handleShow();
                            setHasUnreadNotification(false); // Réinitialiser l'état hasUnreadNotification lorsque vous ouvrez la barre de notification
                        }}
                    >
                        <i
                            className={`fa fa-bell ${
                                hasUnreadNotification
                                    ? "notification-badge"
                                    : ""
                            }`}
                        />

                        <div
                            className={
                                show
                                    ? "notification-menu"
                                    : "notification-menu inactive"
                            }
                            ref={notificationRef}
                        >
                            <Notification
                                
                                setHasUnreadNotification={
                                    setHasUnreadNotification
                                }
                            />
                        </div>
                    </li>

                    {/* <li className={click ? "nav-item inactive" : "nav-item"}>
                        <Link to="/" className="nav-links">
                            <i class="fa fa-heart " />
                        </Link>
                    </li>  */}
                    <li
                        className={click ? "nav-item inactive" : "nav-item"}
                        onClick={() => {
                            handleShowProfil();
                        }}
                    >
                        <img src={photoUrl} alt="UserPic" className="Userpic" />
                        <div
                            className={
                                showProfil
                                    ? "profil-menu"
                                    : "profil-menu inactive"
                            }
                            ref={profilRef}
                        >
                            <DropdownProfil />
                        </div>
                    </li>
                    {/* /---------------------------------/ */}
                    <li
                        className={click ? "nav-item" : "nav-item inactive"}
                        onClick={() => {
                            closeMobileMenu();
                        }}
                    >
                        <Link
                            to="/profilUser"
                            className="nav-links"
                            onClick={closeMobileMenu}
                        >
                            Profil
                        </Link>
                    </li>
                    <li
                        className={click ? "nav-item" : "nav-item  inactive"}
                        onClick={() => {
                            closeMobileMenu();
                        }}
                    >
                        <Link
                            to="/notification"
                            className="nav-links"
                            onClick={closeMobileMenu}
                        >
                            Notifications
                        </Link>
                    </li>
                    <li
                        className={click ? "nav-item" : "nav-item  inactive"}
                        onClick={() => {
                            closeMobileMenu();
                        }}
                    >
                        <Link
                            to="/Progression"
                            className="nav-links"
                            onClick={closeMobileMenu}
                        >
                            Progression
                        </Link>
                    </li>

                    <li className={click ? "nav-item" : "nav-item inactive"}>
                        <Link
                            to="/browse"
                            className="nav-links"
                            onClick={closeMobileMenu}
                        >
                            Probleme
                        </Link>
                    </li>

                    {/* <li className={click ? "nav-item " : "nav-item inactive"}>
                        <Link
                            to="/"
                            className="nav-links"
                            onClick={closeMobileMenu}
                        >
                            Like
                        </Link>
                    </li>*/}
                    <li
                        className={click ? "nav-item" : "nav-item inactive"}
                        onClick={() => {
                            closeMobileMenu();
                        }}
                    >
                        <p
                            to="#"
                            className="nav-links"
                            onClick={() => {
                                onLogout();
                            }}
                        >
                            <img src="logout.png" alt="logout" />
                            logout
                        </p>
                    </li>
                </ul>
            );
        }
    };

    return (
        <>
            <nav className="navbar">
                <div className="nav-left">
                    <Link
                        to="/"
                        className="navbar-logo"
                        onClick={closeMobileMenu}
                    >
                        Soktech
                    </Link>

                    {/*    <div className="search_box">
                        <div className="btn_common">
                            <i
                                className={
                                    toggle
                                        ? "fas fa-times time"
                                        : "fas fa-search search"
                                }
                                onClick={handleToggle}
                            />
                        </div>
                        <input
                            type="text"
                            className={
                                toggle
                                    ? "input-search"
                                    : "input-search inactive"
                            }
                            placeholder="recherche..."
                        ></input>
                        <i
                            className={
                                toggle
                                    ? "fas fa-search"
                                    : "fas fa-search inactive"
                            }
                        />
                    </div> */}
                </div>

                <div className="menu-icon" onClick={handleClick}>
                    <i className={click ? "fas fa-times" : "fas fa-bars"} />
                </div>

                {handleConnect()}
            </nav>
            <Sign trigger={buttonSign} setTrigger={setButtonSign} />
            <Login trigger={buttonLogin} setTrigger={setButtonLogin} />

            <Outlet />
        </>
    );
};

export default navigation;
