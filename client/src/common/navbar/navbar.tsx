import React, {FC} from "react";
import {NavLink} from "react-router-dom";
import './navbar.scss'

interface PropsType {
    outclass?: string
}

const NavBar:FC<PropsType> = ({outclass}) => {
    return (
        <nav className={outclass ? outclass + " " + "nav" : "nav"}>
            <NavLink to={'/'} className={outclass ? outclass+"__items nav__items" : "nav__items"}>Home</NavLink>
            <NavLink to={'/shop'} activeClassName='nav__items--active' className={outclass ? outclass+"__items nav__items" : "nav__items"}>Shop</NavLink>
            <a href="" className={outclass ? outclass+"__items nav__items" : "nav__items"}>Contacts</a>
            <a href="" className={outclass ? outclass+"__items nav__items" : "nav__items"}>About us</a>
        </nav>
    )
};
export default NavBar;
