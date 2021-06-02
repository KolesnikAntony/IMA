import React, {FC, useEffect, useState} from "react";
import './header.scss';
import {Link} from "react-router-dom";
import logo from '../../assets/img/logo-for-IMA.png'
import NavBar from "../navbar/navbar";
import MenuButtons from "../menu-buttons/menu-buttons";


interface PropsType {
    onOpen: ({}) => void
}

const Header: FC<PropsType> = ({onOpen}) => {

    const [headerClass, setHeaderClass] = useState('header');

    const handleScroll = () => {
        const position = window.pageYOffset;

        if(position <= 80) {
            setHeaderClass('header');
        }
        if (position > 80) {
            setHeaderClass('header hide');
        }
        if(position > 200) {
            setHeaderClass('header fix');
        }
        if(position > 400 ) {
            setHeaderClass('header fix fix--show');
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className={headerClass} >
            <div className='container'>
                <div className="header__wrapp">
                    <Link to="/">
                        <img src={logo} alt="Ima" className="header__logo"/>
                    </Link>
                    <NavBar outclass={'header-nav'}/>
                   <MenuButtons onOpen={onOpen}/>
                </div>
            </div>
        </header>
    )
}

export default Header;