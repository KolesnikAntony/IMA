import React from "react";
import './burger-menu.scss'
import {Link} from "react-router-dom";

const Burger = () => {
    return (
        <div className="burger">
            <nav className="burger__nav">
                <Link to={'/'} className="burger__nav-item nav-items">Home</Link>
                <Link to={'/shop'} className="burger__nav-item nav-items">Shop</Link>
                <a href="" className="burger__nav-item nav-items">Contacts</a>
                <a href="" className="burger__nav-item nav-items">About us</a>
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