import React from 'react';
import './aboutus.scss'

const AboutUs = () => {
    return <section className="about">
        <div className="container">
            <h2 className="about__title">
                O nas
            </h2>
            <p className="about__text">
                Sklep stworzony przez profesjonalistów dla profesjonalistów. Sprowadzamy tylko najlepsze z całego świata.
                <br/>
                Sprawdź nasz insta ima_professionalzone i zainspiruj się.
                <br/>
                Na naszej stronie możesz kupować hurtowo zarówno detalicznie.
                <br/>
                Poznaj inspiracje od naszych Ambasadorów
            </p>
            <ul className="about__list">
                <li className="about__item">
                    <img src="https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_600/https://ima-professional.pl/wp-content/uploads/2021/02/IMG_8794-600x800.jpg" alt="" className="about__img"/>
                    <h4 className="about__item-title">Acrylogel 02, base camouglage 02, classic 084</h4>
                </li>
                <li className="about__item">
                    <img src="https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_600/https://ima-professional.pl/wp-content/uploads/2021/02/IMG_5215-600x800.jpg" alt="" className="about__img"/>
                    <h4 className="about__item-title">Base camouflage 05, Classic 084</h4>
                </li>
                <li className="about__item">
                    <img src="https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_225/https://ima-professional.pl/wp-content/uploads/2021/02/IMG_7166-600x800.jpg" alt="" className="about__img"/>
                    <h4 className="about__item-title">Classic 084, Camouflage 05</h4>
                </li>
                <li className="about__item">
                    <img src="https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_600/https://ima-professional.pl/wp-content/uploads/2021/02/IMG_5284-600x800.jpg" alt="" className="about__img"/>
                    <h4 className="about__item-title">Glitter Base 05</h4>
                </li>
                <li className="about__item">
                    <img src="https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_600/https://ima-professional.pl/wp-content/uploads/2021/02/image2-600x600.jpeg" alt="" className="about__img"/>
                    <h4 className="about__item-title">Yashma 01</h4>
                </li>
            </ul>
        </div>
    </section>
};

export default AboutUs;