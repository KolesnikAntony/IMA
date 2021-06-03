import React, {FC} from "react";
import './footer.scss'
import NavBar from "../navbar/navbar";
import MenuButtons from "../menu-buttons/menu-buttons";
import SocialLinks from "../social-links/social-links";
import {Link} from "react-router-dom";
import logo from "../../assets/img/logo-for-IMA.png";
import {useMediaQuery} from "react-responsive";

interface PropsType {
    onOpen: ({}) => void
}


const Footer:FC<PropsType> = ({onOpen}) => {

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
                            <a href="tel: +48792424240" className="footer__link footer__link-with_icon footer__link-with_icon--phone">792 424 240</a>
                            <a href="mailto:ima.professionalzone@gmail.com" className="footer__link footer__link-with_icon footer__link-with_icon--mail">ima.professionalzone@gmail.com</a>
                            <span className="footer__info">NIP: 506-008-67-46</span>
                            <span className="footer__info">Regon: 362406546</span>
                            <p className="footer__info">
                                Adress: Gęsia Wólka 52
                                08-550 Kłoczew
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