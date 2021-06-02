import React from "react";
import './faq.scss'

const Faq = () => {
    return <section className="faq">
        <div className="container">
            <h2 className="faq__title">
                FAQ
            </h2>
            <ul className="faq__list">
                <li className="faq__item">
                    <h3 className="faq__item-title">Czy można złożyć zamówienie telefonicznie?</h3>
                    <p className="faq__item-info">
                        Zamówienia można składać: telefonicznie: od poniedziałku do piątku w godz. 9:00 - 20:00 pod
                        numerem <a
                        href="tel:+48792424240">+48 79 24 24 240 </a>tel. <br/>
                        e-mailowo: <a href="mailto:ima.professionalzone@gmail.com">ima.professionalzone@gmail.com</a>
                        <br/>
                        Instagram: <a href="https://www.instagram.com/ima_professionalzone/">ima_professionalzone</a>
                    </p>
                </li>
                <li className="faq__item">
                    <h3 className="faq__item-title">Jak skorzystać z kodu rabatowego?</h3>
                    <p className="faq__item-info">Po otrzymaniu kodu rabatowego na asortyment, należy wpisać kod do
                        koszyka w dedykowanym do tego polu. Promocje nie łączą się. Z kodu skorzystać można tylko raz.
                        Podczas dokonywania zakupu możesz użyć tylko jednego kodu. <br/>
                    </p>
                </li>
                <li className="faq__item">
                    <h3 className="faq__item-title">Nie znalazłam/-em odpowiedzi na moje pytanie</h3>
                    <p className="faq__item-info">
                        W przypadku problemu, który nie został omówiony powyżej prosimy o kontakt pod numerem
                        telefonu:<a
                        href="tel:+48792424240">+48 79 24 24 240 </a> tel, <br/>
                        pod mailem: <a
                        href="mailto:ima.professionalzone@gmail.com">ima.professionalzone@gmail.com</a><br/>
                        Jeteśmy do Państwa dyspozycji od pon. - pt. 09:00-20:00 <br/>
                    </p>
                </li>
                <li className="faq__item">
                    <h3 className="faq__item-title">Czy mogę złożyć zamówienie bez rejestracji (jako gość)?</h3>
                    <p className="faq__item-info">Zamówienie w sklepie internetowym IMA można składać jako gość -bez
                        zakładania konta. Zachęcamy jednak do składania konta, dzięki temu możliwe jest sprawdzenie
                        historii zamówień oraz przyznawany jest indywidualny system rabatowy. Dodatkowo pozwala to
                        ułatwić proces składania zamówień.</p>
                </li>
                <li className="faq__item">
                    <h3 className="faq__item-title">Jaki jest czas dostawy?</h3>
                    <div className="faq__content">
                        <p className="faq__item-info">Zamówienia przekazywane są do wysyłki w ciągu 3 dni roboczych (z
                            wyłączeniem weekendów i świąt) licząc od:</p>
                        <ul className="faq__item-list">
                            <li className="faq__item-el">momentu złożenia zamówienia z wybraną opcją płatności przy
                                odbiorze;
                            </li>
                            <li className="faq__item-el">momentu zaksięgowania płatności w przypadku zamówień
                                przedpłatowych (PayU).
                            </li>
                            <li className="faq__item-el">Paczki dostarczane są za pośrednictwem firmy kurierskiej w
                                ciągu 1-2 dni roboczych na terenie Polski. *Czas może być wydłużony ze względu na
                                nieprzewidziane sytuacje. Nie ponosimy odpowiedzialności za opóźnienia występujące ze
                                strony firmy kurierskiej
                            </li>
                        </ul>
                        <p className="faq__item-info">
                            Jeżeli chcesz otrzymać szczegółowe informacje o swojej przesyłce skontaktuj się z nami pod
                            telefonem: <a
                            href="tel:+48792424240">+48 79 24 24 240</a> , <br/> pod mailem: <a
                            href="mailto:ima.professionalzone@gmail.com">ima.professionalzone@gmail.com</a> <br/>
                            Jeteśmy do Państwa dyspozycji od pon. - pt. 09:00-20:00
                        </p>
                    </div>
                </li>
                <li className="faq__item">
                    <h3 className="faq__item-title">Jak mogę zwrócić towar?</h3>
                    <div className="faq__content">
                        <p className="faq__item-info">Na zwrot towaru kupionego online konsumenci mają- zgodnie z nową
                            ustawą o prawach konsumenta, która weszła w życie 25 grudnia 2014 - 14 dni od momentu
                            otrzymania towaru. Używane produkty nie podlegają zwrotowi. Skontaktuj się z z nami pod
                            numerem telefonu: <a href="tel:+48792424240">+48 79 24 24 240</a> tel, <br/> pod mailem: <a href="mailto:ima.professionalzone@gmail.com">ima.professionalzone@gmail.com</a>, lub
                            dobrze zabezpieczony produkt, dowód zakupu oraz formularz zwrotu prześlij na nasz adres:</p>
                        <p className="faq__item-info">Nasz adres
                            z dopiskiem 'ZWROT'</p>
                        <p className="faq__item-info">Należność za odesłany towar otrzymasz na konto bankowe lub na
                            konto PayPal podane w formularzu zwrotu, w ciągu 14 dni od odnotowania przesyłki w naszym
                            magazynie.</p>
                    </div>
                </li>
                <li className="faq__item">
                    <h3 className="faq__item-title">jak złożyć reklamacje ?</h3>
                    <p className="faq__item-info">
                        Reklamacji podlegają produkty wadliwe, uszkodzone lub niezgodne z zamówieniem. Reklamację co do niezgodności w zamówieniu oraz uszkodzonego produktu należy zgłosić w przeciągu 72h od momentu odebrania przesyłki. W celu złożenia reklamacji skontaktuj się z nami pod telefonem:  <a href="tel:+48792424240">+48 79 24 24 240</a>, pod mailem: <a href="mailto:ima.professionalzone@gmail.com">ima.professionalzone@gmail.com</a> lub odeślij dobrze zabezpieczony produkt dołączając dowód zakupu oraz wypełniony formularz reklamacyjny na nasz adres:
                    </p>
                </li>
            </ul>
        </div>
    </section>
}

export default Faq;