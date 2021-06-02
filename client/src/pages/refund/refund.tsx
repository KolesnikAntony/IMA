import React from "react";
import './refund.scss';

const Refund = () => {
    return <section className="refund">
        <div className="container">
            <h2 className="refund__title">Zwrot</h2>
            <p className="refund__text">Na zwrot towaru kupionego online konsumenci mają- zgodnie z nową ustawą o prawach konsumenta, która weszła w życie 25 grudnia 2014 - 14 dni od momentu otrzymania towaru. Używane produkty nie podlegają zwrotowi. Skontaktuj się z z nami pod numerem telefonu: <a
                href="tel:+48792424240"> +48 79 24 24 240 tel</a>, pod mailem: <a href="mailto:ima.professionalzone@gmail.com">ima.professionalzone@gmail.com</a>, lub dobrze zabezpieczony produkt, dowód zakupu oraz formularz zwrotu prześlij na nasz adres:</p>
            <p className="refund__text">Nasz adres
                z dopiskiem 'ZWROT'</p>
            <p className="refund__text">Należność za odesłany towar otrzymasz na konto bankowe lub na konto PayPal podane w formularzu zwrotu, w ciągu 14 dni od odnotowania przesyłki w naszym magazynie.</p>
        </div>
    </section>
};

export default Refund;