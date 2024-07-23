import React from "react";
import PaymentForm from "./PaymentForm";

const FormOrderService = () => {
    return (
        <div className="Form-order-service">
            <h2 className="Form-order-title">Payment method</h2>
            <form action="">
                <PaymentForm />
                <input
                    type="button"
                    value="Validate and buy"
                    className="button-order-validate"
                />
            </form>
        </div>
    );
};

export default FormOrderService;
