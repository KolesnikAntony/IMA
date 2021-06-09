import React, {FC, ReactEventHandler} from "react";
import './burger-menu.scss'
import {Link} from "react-router-dom";
import {VIEW_TYPES} from "../../constants/constants";

interface PropsType {
    onClose: ()=> void
    onOpen: ({}) => void;
}

const Burger:FC<PropsType> = ({onClose, onOpen}) => {

    const contactsClickHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        onClose();
        onOpen(VIEW_TYPES.CONTACTS);
    };

    return (
        <div className="burger">
            <nav className="burger__nav">
                <Link to={'/'} className="burger__nav-item nav-items" onClick={onClose}>Dom</Link>
                <Link to={'/shop'} className="burger__nav-item nav-items" onClick={onClose}>Sklep</Link>
                <a href='#' className="burger__nav-item nav-items" onClick={contactsClickHandler}>Kontakty</a>
                <Link to="/about-us" className="burger__nav-item nav-items" onClick={onClose}>O nas</Link>
            </nav>
            <ul className='burger__social'>
                <li className='burger__social-item'>
                    <a href="" className="intro__social-link intro__social-link--inst"></a>
                </li>
                <li className='burger__social-item'>
                    <a href="" className="intro__social-link intro__social-link--wu"></a>
                </li>
                <li className='burger__social-item'>
                    <a href="" className="intro__social-link intro__social-link--mail"></a>
                </li>
            </ul>
        </div>
    )
}

export default Burger;