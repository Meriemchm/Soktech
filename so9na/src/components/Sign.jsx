import React, { useRef, useState, useEffect } from "react";
import { useFunctions } from "./useFunctions";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import axiosClient from "../axios-client.js";

const Sign = (props) => {
    const { token, setUser, setToken } = useStateContext();
    const { lockScroll, unlockScroll } = useFunctions();
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const [errors, setErrors] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Do something with the form data
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        };

        axiosClient
            .post("/sign", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                    setErrors(response.data.errors);
                }
            });
    };
    useEffect(() => {
        if (token) {
            props.setTrigger(false);
            lockScroll();
        }
    }, [token, props, lockScroll]);

    return props.trigger ? (
        <>
            <div className="Sign">
                <div className="box">
                    <div className="inner-box">
                        <div
                            className="form-icon"
                            onClick={() => {
                                props.setTrigger(false);
                                lockScroll();
                            }}
                        >
                            <i className="fas fa-times" />
                        </div>
                        <div className="forms-wrap">
                            <form
                                onSubmit={handleSubmit}
                                autoComplete="off"
                                className="sign-up-form"
                            >
                                <div className="heading">
                                    <h2>Bienvenue</h2>
                                </div>
                                <div className="actual-form">
                                    {errors && (
                                        <div className="form-errors">
                                            {Object.keys(errors).map((key) => (
                                                <p key={key}>
                                                    {errors[key][0]}
                                                </p>
                                            ))}
                                        </div>
                                    )}
                                    <div className="input-wrap">
                                        <input
                                            ref={nameRef}
                                            type="text"
                                            minLength="4"
                                            className="input-field"
                                            placeholder="Nom d'Utilisateur"
                                        />
                                    </div>

                                    <div className="input-wrap">
                                        <input
                                            ref={emailRef}
                                            type="email"
                                            className="input-field"
                                            placeholder="Email"
                                        />
                                    </div>

                                    <div className="input-wrap">
                                        <input
                                            ref={passwordRef}
                                            type="password"
                                            minLength="4"
                                            className="input-field"
                                            placeholder="Mot de passe"
                                        />
                                    </div>

                                    <div className="input-wrap">
                                        <input
                                            ref={passwordConfirmationRef}
                                            type="password"
                                            minLength="4"
                                            className="input-field"
                                            placeholder="Confirmer le mot de passe"
                                        />
                                    </div>

                                    <input
                                        type="submit"
                                        value="s'inscrire"
                                        className="sign-btn"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    ) : null;
};

export default Sign;
