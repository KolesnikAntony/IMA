import React, {useEffect} from "react";
import './contacts.scss'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";

const Contacts = () => {
    const contacts = useSelector((state:RootState)=> state.contacts.contacts);

    return <section className="contacts">
        <h3 className="aside__title">Kontakty</h3>
        <ul className="contacts__list">
            <li className="contacts__item">
                <b> Telefon:</b> <a href={`tel:${contacts.phone}`}>{contacts.phone}</a>
            </li>
            <li className="contacts__item">
                <b>Email:</b> <a href="mailto:ima.professionalzone@gmail.com">{contacts.email}</a>
            </li>
            <li className="contacts__item">
                <b> Instagram:</b> <a href={`https://www.instagram.com/${contacts.inst}/`} target="_blank">{contacts.inst}</a>
            </li>
            <li className="contacts__item">
               <b> Adress:</b> {contacts.address}
            </li>
            <li className="contacts__item">
                <b>NIP:</b> {contacts.nip}
            </li>
            <li className="contacts__item">
                <b> Regon:</b> {contacts.region}
            </li>
        </ul>
    </section>
};

export default Contacts;