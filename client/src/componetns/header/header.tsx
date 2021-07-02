import React, {FC, useEffect, useMemo, useState} from "react";
import './header.scss';
import {Link} from "react-router-dom";
import logo from '../../assets/img/logo-for-IMA.png'
import NavBar from "../navbar/navbar";
import MenuButtons from "../menu-buttons/menu-buttons";


interface PropsType {
    onOpen: ({}) => void
    classes: string
}

const Header: FC<PropsType> = ({onOpen, classes}) => {
    const [headerClass, setHeaderClass] = useState('');

    const handleScroll = () => {
        const position = window.pageYOffset;
        if (position <= 80) {
            setHeaderClass('');
        }
        if (position > 80) {
            setHeaderClass( `hide`);
        }
        if (position > 200) {
            setHeaderClass(`fix`);
        }
        if (position > 400) {
            setHeaderClass(`fix fix--show`);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, {passive: true});

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className={`${classes} ${headerClass}`}>
            <div className='container'>
                <div className="header__wrapp">
                    <Link to="/">
                        <img src={logo} alt="Ima" className="header__logo"/>
                    </Link>
                    <NavBar outclass={'header-nav'} onOpen={onOpen}/>
                    <MenuButtons onOpen={onOpen}/>
                </div>
            </div>
        </header>
    )
}

export default Header;