import React from "react";
import './banner.scss';

const Banner = () => {
    return (
        <section className="banner">
            <div className="container">
                <div className="banner__text">
                    <p className="banner__paragraph">
                        «Never forget your manicure. Your hands are the first thing that catches your eye after your face» — Julia Restoin Roitfeld
                    </p>
                    <p className="banner__paragraph">
                        «Groomed hands are like the period at the end of a sentence. They complete your look and make you whole.» — Prabal Gurung
                    </p>
                    <p className="banner__paragraph">
                        «The happiest girls tend to have the best groomed manicures» — Tammy Taylor
                    </p>
                </div>
            </div>
        </section>
    )
};

export default Banner;