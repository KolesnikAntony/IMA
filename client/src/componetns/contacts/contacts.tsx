import React from "react";
import './contacts.scss'

const Contacts = () => {
    return <section className="contacts">
        <h3 className="aside__title">Contacts</h3>
        <ul className="contacts__list">
            <li className="contacts__item">
                <b> Telefon:</b> <a href="tel: +48792424240 ">+48 792 424 240</a>
            </li>
            <li className="contacts__item">
                <b>Email:</b> <a href="mailto:ima.professionalzone@gmail.com">ima.professionalzone@gmail.com</a>
            </li>
            <li className="contacts__item">
                <b> Instagram:</b> <a href="https://www.instagram.com/ima_professionalzone/" target="_blank">ima_professionalzone</a>
            </li>
            <li className="contacts__item">
               <b> Adress:</b> Gęsia Wólka 52, 08-550 Kłoczew
            </li>
            <li className="contacts__item">
                <b>NIP:</b> 506-008-67-46
            </li>
            <li className="contacts__item">
                <b> Regon:</b> 362406546
            </li>
        </ul>
    </section>
};

export default Contacts;