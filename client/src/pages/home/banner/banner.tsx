import React from "react";
import './banner.scss';
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";

const Banner = () => {
    const text = useSelector((state:RootState) => state.home.bannerText);

    return (
        <section className="banner">
            <div className="container">
                <div className="banner__text">
                    <p className="banner__paragraph" dangerouslySetInnerHTML={{__html: text}}/>
                </div>
            </div>
        </section>
    )
};

export default Banner;