import React, {FC, useMemo} from "react";
import {Link} from "react-router-dom";
import './navbar.scss'

interface PropsType {
    outclass?: string
}

const NavBar:FC<PropsType> = ({outclass}) => {
    return (
        <nav className={outclass ? outclass + " " + "nav" : "nav"}>
            <Link to={'/'} className={outclass ? outclass+"__items nav__items" : "nav__items"}>Home</Link>
            <Link to={'/shop'} className={outclass ? outclass+"__items nav__items" : "nav__items"}>Shop</Link>
            <a href="" className={outclass ? outclass+"__items nav__items" : "nav__items"}>Contacts</a>
            <a href="" className={outclass ? outclass+"__items nav__items" : "nav__items"}>About us</a>
        </nav>
    )
};
export default NavBar;
