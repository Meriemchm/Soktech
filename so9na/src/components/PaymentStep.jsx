import React from "react";
import PaymentForm from "./PaymentForm";
const PaymentStep = ({ setFormData }) => {
    return (
        <div className="Payment-step">
            <h2 className="Payment-step-title">
                Information de carte de crédit
            </h2>
            <form action="">
                <PaymentForm setFormData={setFormData} />
            </form>
        </div>
    );
};

export default PaymentStep;
