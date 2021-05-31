import React, { FC } from "react";
import './burger-menu.scss'
import {Link} from "react-router-dom";

interface PropsType {
    onClose: ()=> void
}

const Burger:FC<PropsType> = ({onClose}) => {
    return (
        <div className="burger">
            <nav className="burger__nav">
                <Link to={'/'} className="burger__nav-item nav-items" onClick={onClose}>Home</Link>
                <Link to={'/shop'} className="burger__nav-item nav-items" onClick={onClose}>Shop</Link>
                <a href="" className="burger__nav-item nav-items" onClick={onClose}>Contacts</a>
                <a href="" className="burger__nav-item nav-items" onClick={onClose}>About us</a>
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