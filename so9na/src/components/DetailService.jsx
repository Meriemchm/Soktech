import React, { useState, useEffect } from "react";
import { SliderService } from "./Slider";
import Comments from "./Comments";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider";

const DetailService = ({ service, users }) => {
    const [toggleState, setToggleState] = useState(1);
    const [toggleS, setToggleS] = useState(1);
    const navigate = useNavigate();
    const [rate, setRate] = useState(null);
    const [comments, setComments] = useState([]);
    const { user} = useStateContext();
    const imageService = `http://localhost:8000/storage/services/${service.image}`;
    const toggleTab = (index) => {
        setToggleState(index);
    };
    const toggleT = (index) => {
        setToggleS(index);
    };
    const userName = users[0].name;
    const userId = user.id;
    const photo = `http://localhost:8000/storage/users/${users[0].photo}`;

    function debounce(func, delay) {
        let timeoutId;
        return function (...args) {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    }
    useEffect(
        debounce(() => {
            const fetchRate = async () => {
                const commentsResponse = await axios.get(
                    `${
                        import.meta.env.VITE_API_BASE_URL
                    }/api/comments/service/${service.id}`
                );
                const comments = commentsResponse.data;
                setComments(comments);
                if (comments.length > 0) {
                    let commentCount = 0;
                    const totalRate = comments.reduce((sum, comment) => {
                        if (comment.parentId === null) {
                            commentCount++;
                            return sum + comment.rating;
                        } else {
                            return sum;
                        }
                    }, 0);
                    const averageRate =
                        commentCount > 0 ? totalRate / commentCount : 0;
                    setRate(averageRate);
                } else {
                    setRate(0);
                }
            };
            fetchRate();
        }, 500),
        [comments]
    );

    return (
        <>
            <Breadcrumbs />
            <div className="Detail">
                <div className="Header-service">
                    <div className="Header-container">
                        <div className="profil-Detail">
                            <div className="img-container">
                                <img src={photo} alt="ImgUser" />
                            </div>
                            <div className="profil-rows">
                                <h2
                                    onClick={() => {
                                        navigate(
                                            `/categorie/cardDetail/${service.id}/profilUser/${service.idUser}`,
                                            { state: { service } }
                                        );
                                    }}
                                    className="userName"
                                >
                                    {userName ?? ""}
                                </h2>
                                <div className="profil-row">
                                    <div className="Service-stars">
                                        {Array.from(
                                            { length: 5 },
                                            (_, index) => (
                                                <i
                                                    key={index}
                                                    className={
                                                        index < Math.floor(rate)
                                                            ? "fa fa-star star-active"
                                                            : "fa fa-star"
                                                    }
                                                    aria-hidden="true"
                                                ></i>
                                            )
                                        )}
                                    </div>
                                    <p className="vote">
                                        (
                                        {
                                            comments.filter(
                                                (comment) =>
                                                    comment.parentId === null
                                            ).length
                                        }{" "}
                                        vote )
                                    </p>

                                    {/* <button className="contact-button">
                                        Contact
                                    </button> */}
                                </div>
                            </div>
                        </div>
                        <p className="description-Detail">
                            {service.description}
                        </p>
                        <SliderService imageService={imageService} />
                    </div>

                    <div className="Right">
                        <div className="content-tabs">
                            <div className="content  active-content">
                                <div className="detail-content">
                                    <h2>Cela vous convient ?</h2>
                                    <p>
                                        Fais une demande concernant ton problème
                                        et profite de ce service.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="right-button">
                            {userId !== service.idUser && (
                                <button
                                    className="content-button"
                                    onClick={() => {
                                        navigate(
                                            `/categorie/cardDetail/${service.id}/form/${service.id}`,
                                            {
                                                state: {
                                                    id: service.id,
                                                    service,
                                                },
                                            }
                                        );
                                    }}
                                >
                                    Intéresser
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="Left">
                    <div className="Left-tabs">
                        <button
                            className={
                                toggleS === 1 ? "tabs active-tabs" : "tabs"
                            }
                            onClick={() => toggleT(1)}
                        >
                            A propos
                        </button>
                        <button
                            className={
                                toggleS === 2 ? "tabs active-tabs" : "tabs"
                            }
                            onClick={() => toggleT(2)}
                        >
                            {" "}
                            Avis{" "}
                        </button>
                    </div>
                    <div className="content-tabs">
                        <div
                            className={
                                toggleS === 1
                                    ? "content  active-content"
                                    : "content"
                            }
                        >
                            <div className="detail-content">
                                <div className="Detail-service">
                                    <h3 className="detail-title">A propos</h3>
                                    <p className="description-service">
                                        {service.details}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div
                            className={
                                toggleS === 2
                                    ? "content  active-content"
                                    : "content"
                            }
                        >
                            <div className="detail-content">
                                <Comments
                                    service={service}
                                    userName={userName}
                                    photo={photo}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailService;
