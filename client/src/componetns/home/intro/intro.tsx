import React from "react";
import './intro.scss';
import SocialLinks from "../../../common/social-links/social-links";


const Intro = () => {
    return (
        <section className='intro'>
            <div className="container">
                <div className="intro__wrapp">
                    <h1 className={'intro__title '}>Lakier idealny?
                        SIMPLE</h1>
                    <a href="#" className='intro__btn circle-btn'>SHOP NOW</a>
                    <SocialLinks outclass={'intro'}/>
                </div>
            </div>
        </section>
    )
}

export default Intro;