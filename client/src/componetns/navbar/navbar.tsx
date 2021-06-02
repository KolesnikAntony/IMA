import React, {FC} from "react";
import {NavLink} from "react-router-dom";
import './navbar.scss'
import {VIEW_TYPES} from "../../constants/constants";

interface PropsType {
    outclass?: string
    onOpen: ({}) => void
}

const NavBar:FC<PropsType> = ({outclass, onOpen}) => {

    const contactClickHandler = (e:any) => {
        e.preventDefault();
        onOpen(VIEW_TYPES.CONTACTS)
    };
    return (
        <nav className={outclass ? outclass + " " + "nav" : "nav"}>
            <NavLink to={'/'} className={outclass ? outclass+"__items nav__items" : "nav__items"}>Home</NavLink>
            <NavLink to={'/shop'} activeClassName='nav__items--active' className={outclass ? outclass+"__items nav__items" : "nav__items"}>Shop</NavLink>
            <a href="#" onClick={contactClickHandler} className={outclass ? outclass+"__items nav__items" : "nav__items"}>Contacts</a>
            <NavLink to={'/about-us'} className={outclass ? outclass+"__items nav__items" : "nav__items"}>About us</NavLink>
        </nav>
    )
};
export default NavBar;
