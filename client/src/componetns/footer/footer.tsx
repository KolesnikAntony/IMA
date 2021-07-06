import React, {FC} from "react";
import './footer.scss'
import NavBar from "../navbar/navbar";
import MenuButtons from "../menu-buttons/menu-buttons";
import SocialLinks from "../social-links/social-links";
import {Link} from "react-router-dom";
import logo from "../../assets/img/logo-for-IMA.png";
import {useMediaQuery} from "react-responsive";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

interface PropsType {
    onOpen: ({}) => void
}


const Footer:FC<PropsType> = ({onOpen}) => {
    const contacts = useSelector((state:RootState)=> state.contacts.contacts);
    const isDesktop = useMediaQuery({minWidth: 912});
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__wrapper">
                    <div className="footer__navigation">
                        <NavBar outclass={'footer-nav'} onOpen={onOpen}/>
                        {/*<MenuButtons onOpen={onOpen}/>*/}
                        {isDesktop && <Link to="/">
                            <img src={logo} alt="Ima" className="header__logo"/>
                        </Link>}
                    </div>
                    <div className="footer__row">
                        <div className="footer__col">
                                <Link to="/faq" className="footer__link">FAQ</Link>
                                <Link to="/shopping-and-payment" className="footer__link">swysyłka i płatność</Link>
                                <Link to="/refund-policy" className="footer__link">zwrot</Link>
                                <Link to="/terms-and-conditions" className="footer__link">regulamin</Link>
                                <Link to="/rodo" className="footer__link">rodo</Link>
                        </div>
                        <div className="footer__col">
                            <a href={`tel: ${contacts.phone}`} className="footer__link footer__link-with_icon footer__link-with_icon--phone">{contacts.phone}</a>
                            <a href={`mailto:${contacts.email}`} className="footer__link footer__link-with_icon footer__link-with_icon--mail">{contacts.email}</a>
                            <span className="footer__info">NIP: {contacts.nip}</span>
                            <span className="footer__info">Regon: {contacts.region}</span>
                            <p className="footer__info">
                                Adress: {contacts.address}
                            </p>
                        </div>
                        <div className="footer__col">
                            <p className="footer__social-title">
                                Internetowy sklep z lakierami do paznokci
                            </p>
                            <SocialLinks outclass={"footer"}/>
                        </div>
                    </div>
                    <hr/>
                    <span className="footer__caption">©I’m a professional zone 2021</span>
                </div>
            </div>
        </footer>
    )
};

export default Footer;