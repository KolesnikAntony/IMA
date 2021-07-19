import React from 'react';
import {useState, useEffect} from "react";
import {
    CardElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import {P24BankElement} from '@stripe/react-stripe-js';

const StripeCheck = () => {
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        window
            .fetch("/create-payment-intent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({items: [{id: "xl-tshirt"}]})
            })
            .then(res => {
                return res.json();
            })
            .then(data => {
                setClientSecret(data.clientSecret);
            });
    }, []);

    const cardStyle = {
        style: {
            base: {
                color: "#32325d",
                fontFamily: 'Arial, sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#32325d"
                }
            },
            invalid: {
                color: "#fa755a",
                iconColor: "#fa755a"
            }
        }
    };
    const P24_ELEMENT_OPTIONS = {
        // Custom styling can be passed to options when creating an Element
        style: {
            base: {
                padding: '10px 12px',
                color: '#32325d',
                fontSize: '16px',
                '::placeholder': {
                    color: '#aab7c4'
                },
            },
        },
    };

    function P24BankSection() {
        return (
            <label>
                <P24BankElement options={P24_ELEMENT_OPTIONS}/>
            </label>
        );
    };

    const handleChange = async (event) => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    };

    const handleSubmit = async ev => {
        ev.preventDefault();
        //setProcessing(true);

        const payload = await stripe.confirmP24Payment(clientSecret, {
            payment_method: {
                p24: elements.getElement(P24BankElement),
                billing_details: {
                    email: 'test@gmail.com',
                },
            },
            payment_method_options: {
                p24: {
                    tos_shown_and_accepted: true,
                }
            },
            return_url: 'https://example.com/checkout/complete',
        });

        if (payload.error) {
            setError(`Payment failed ${payload.error.message}`);
            setProcessing(false);
        } else {
            setError(null);
            setProcessing(false);
            setSucceeded(true);
        }
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <P24BankSection/>
            <button
                disabled={processing || disabled || succeeded}
                id="submit"
            >
        <span id="button-text">
          {processing ? (
              <div className="spinner" id="spinner"></div>
          ) : (
              "Pay now"
          )}
        </span>
            </button>
            {/* Show any error that happens when processing the payment */}
            {error && (
                <div className="card-error" role="alert">
                    {error}
                </div>
            )}
            {/* Show a success message upon completion */}
            <p className={succeeded ? "result-message" : "result-message hidden"}>
                Payment succeeded, see the result in your
                <a
                    href={`https://dashboard.stripe.com/test/payments`}
                >
                    {" "}
                    Stripe dashboard.
                </a> Refresh the page to pay again.
            </p>
        </form>
    )
};

export default StripeCheck;