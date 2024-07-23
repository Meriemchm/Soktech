import React, { useRef, useState, useEffect } from "react";
import { useFunctions } from "./useFunctions";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import axiosClient from "../axios-client.js";

const Login = (props) => {
    const { token, setUser, setToken } = useStateContext();
    const emailRef = useRef();
    const passwordRef = useRef();
    const { lockScroll } = useFunctions();
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        if (token) {
            props.setTrigger(false);
            lockScroll();
        }
    }, [token, props, lockScroll]);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Do something with the form data
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        setErrors(null);

        axiosClient
            .post("/login", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    if (response.data.errors) {
                        setErrors(response.data.errors);
                    } else {
                        setErrors({
                            email: [response.data.message],
                        });
                    }
                }
            });
    };

    return props.trigger ? (
        <div className="Sign">
            <div className="box">
                <div className="inner-box">
                    <div
                        className="form-icon "
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
                            className="sign-in-form"
                        >
                            <div className="heading">
                                <h2>Bon retour parmis nous</h2>
                            </div>

                            <div className="actual-form">
                                {errors && (
                                    <div className="form-errors">
                                        {Object.keys(errors).map((key) => (
                                            <p key={key}>{errors[key][0]}</p>
                                        ))}
                                    </div>
                                )}
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

                                <input
                                    type="submit"
                                    value="Se connecter"
                                    className="sign-btn"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        ""
    );
};

export default Login;
