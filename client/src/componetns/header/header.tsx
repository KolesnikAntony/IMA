import React, {FC} from "react";
import './header.scss';
import {Link} from "react-router-dom";
import logo from '../../assets/img/logo-for-IMA.png'
import NavBar from "../../common/navbar/navbar";
import MenuButtons from "../../common/menu-buttons/menu-buttons";


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
                    <NavBar outclass={'header-nav'}/>
                   <MenuButtons onOpen={onOpen}/>
                </div>
            </div>
        </header>
    )
}

export default Header;