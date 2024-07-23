import React, { useState } from "react";
import { DataAccordion } from "./Data";

function Accordion() {
    const [accordion, setActiveAccordion] = useState(-1);

    function toggleAccordion(index) {
        if (index === accordion) {
            setActiveAccordion(-1);
            return;
        }
        setActiveAccordion(index);
    }

    return (
        <>
            <div className="accordion-container">
                <div>
                    <h1>Service</h1>
                </div>
                <div className="accordion-faq">
                    {DataAccordion.map((item, index) => (
                        <div key={index} onClick={() => toggleAccordion(index)}>
                            <div className="accordion-faq-heading">
                                <h3
                                    className={
                                        accordion === index ? "active" : ""
                                    }
                                >
                                    {item.service}
                                </h3>
                                <div>
                                    {accordion === index ? (
                                        <span className="verticle">-</span>
                                    ) : (
                                        <span className="horizental">+</span>
                                    )}
                                </div>
                            </div>
                            <div
                                className={
                                    accordion === index ? "active" : "inactive"
                                }
                            >
                                <div className="service-content">
                                    <img
                                        className="image-service"
                                        src={item.Image}
                                        alt="serviceImage"
                                    />

                                    <div className="service-element">
                                        <h4 className="service-title">
                                            {item.service}
                                        </h4>
                                        <p className="service-description">
                                            {item.description}
                                        </p>
                                        <p className="service-prize">
                                            {item.prize}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Accordion;
