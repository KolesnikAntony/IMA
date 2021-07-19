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