import React from "react";
import './intro.scss';
import SocialLinks from "../../../common/social-links/social-links";
import {Link} from "react-router-dom";


const Intro = () => {
    return (
        <section className='intro'>
            <div className="container">
                <div className="intro__wrapp">
                    <h1 className={'intro__title '}>Lakier idealny?
                        SIMPLE</h1>
                    <Link to={'/shop'} className='intro__btn circle-btn'>SHOP NOW</Link>
                    <SocialLinks outclass={'intro'}/>
                </div>
            </div>
        </section>
    )
}

export default Intro;