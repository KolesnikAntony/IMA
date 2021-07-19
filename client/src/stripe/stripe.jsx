import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const promise = loadStripe("pk_test_bxUFP5az29DxXByl6hAxqbZt00u3JlrxbW");

export default function Stripe() {

    return (
        <>
            <Elements stripe={promise}>
                <CheckoutForm />
            </Elements>
        </>
    );
}
