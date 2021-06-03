import React, {FC} from "react";
import {NavLink} from "react-router-dom";
import './navbar.scss'
import {VIEW_TYPES} from "../../constants/constants";

interface PropsType {
    outclass?: string
    onOpen: ({}) => void
}

const NavBar:FC<PropsType> = ({outclass, onOpen}) => {

    const contactClickHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        onOpen(VIEW_TYPES.CONTACTS)
    };
    return (
        <nav className={outclass ? outclass + " " + "nav" : "nav"}>
            <NavLink to={'/'} className={outclass ? outclass+"__items nav__items" : "nav__items"}>Dom</NavLink>
            <NavLink to={'/shop'} activeClassName='nav__items--active' className={outclass ? outclass+"__items nav__items" : "nav__items"}>Sklep</NavLink>
            <a href="#" onClick={contactClickHandler} className={outclass ? outclass+"__items nav__items" : "nav__items"}>Kontakty</a>
            <NavLink to={'/about-us'} activeClassName='nav__items--active' className={outclass ? outclass+"__items nav__items" : "nav__items"}>O nas</NavLink>
        </nav>
    )
};
export default NavBar;
