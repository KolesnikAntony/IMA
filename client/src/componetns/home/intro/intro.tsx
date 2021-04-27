import React from "react";
import './intro.scss';


const Intro = () => {
    return (
        <section className='intro'>
            <div className="container">
                <div className="intro__wrapp">
                    <h1 className={'intro__title '}>Lakier idealny?
                        SIMPLE</h1>
                    <a href="#" className='intro__btn circle-btn'>SHOP NOW</a>
                    <ul className='intro__social'>
                        <li className='intro__social-item'>
                            <a href="" className="intro__social-link intro__social-link--inst"></a>
                        </li>
                        <li className='intro__social-item'>
                            <a href="" className="intro__social-link intro__social-link--wu"></a>
                        </li>
                        <li className='intro__social-item'>
                            <a href="" className="intro__social-link intro__social-link--mail"></a>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default Intro;