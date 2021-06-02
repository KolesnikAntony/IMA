import React from "react";
import './payment.scss';

const Payment = () => {
    return <section className="payment">
        <div className="container">
            <h2 className="payment__title">Wysyłka i Płatność</h2>
            <p className="payment__text">Zamówienia przekazywane są do wysyłki w ciągu 3 dni roboczych (z wyłączeniem weekendów i świąt) licząc od:</p>
            <ul className="payment__list">
                <li className="payment__item">Momentu złożenia zamówienia z wybraną opcją płatności przy odbiorze.</li>
                <li className="payment__item">Momentu zaksięgowania płatności w przypadku zamówień przedpłatowych ( TPay, PayPal, przelew).</li>
                <li className="payment__item">Paczki dostarczane są za pośrednictwem firmy kurierskiej w ciągu 1-2 dni roboczych na terenie Polski. *Czas może być wydłużony ze względu na nieprzewidziane sytuacje. Nie ponosimy odpowiedzialności za opóźnienia występujące ze strony firmy kurierskiej.</li>
            </ul>
            <p className="payment__text">Jeżeli chcesz otrzymać szczegółowe informacje o swojej przesyłce skontaktuj się z nami pod telefonem: <a
                href="tel:+48792424240"> +48 79 24 24 240 tel</a>, pod mailem: <a href="mailto:ima.professionalzone@gmail.com">ima.professionalzone@gmail.com</a>.</p>
            <p className="payment__text">Jeteśmy do Państwa dyspozycji od pon. - pt. 09:00-20:00</p>
        </div>
    </section>
};

export default Payment;