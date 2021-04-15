import React, {FC} from "react";
import './header.scss';
import {Link} from "react-router-dom";
import logo from '../../assets/img/logo-for-IMA.png'
import {VIEW_TYPES} from "../../constants/constants";

interface PropsType {
    onOpen: ({}) => void
}

const Header: FC<PropsType> = ({onOpen}) => {
    return (
        <header className={'header'}>
            <div className='container'>
                <div className="header__wrapp">
                    <Link to="/">
                        <img src={logo} alt="Ima" className="header__logo"/>
                    </Link>
                    <nav className="header__nav">
                        <Link to={'/'} className="header__nav-item nav-items">Home</Link>
                        <a href="" className="header__nav-item nav-items">Catalog</a>
                        <a href="" className="header__nav-item nav-items">Contacts</a>
                        <a href="" className="header__nav-item nav-items">About us</a>
                    </nav>
                    <ul className='header__menu'>
                        <li className="header__menu-item">
                            <button className="header__menu-btn--cart header__menu-btn"
                                    onClick={() => onOpen(VIEW_TYPES.CART)}/>
                        </li>
                        <li className="header__menu-item">
                            <button className="header__menu-btn--wish header__menu-btn"
                                    onClick={() => onOpen(VIEW_TYPES.WISH)}/>
                        </li>
                        <li className="header__menu-item">
                            <button className="header__menu-btn--profile header__menu-btn"
                                    onClick={() => onOpen(VIEW_TYPES.PROFILE)}/>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header;