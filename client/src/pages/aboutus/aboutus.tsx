import React, {useEffect} from 'react';
import './aboutus.scss'
import {getAboutUsPageData} from "../../redux/aboutPage-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import Preloader from "../../common/preloader/preloader";

const AboutUs = () => {
    const dispatch = useDispatch();

    const {isFetching, aboutUsText, aboutUsCards} = useSelector((state: RootState) => state.aboutUs);

    useEffect(() => {
        dispatch(getAboutUsPageData());
    }, []);


    return <>{
        isFetching ? <Preloader type={'product'}/>
        : <section className="about">
            <div className="container">
                <h2 className="about__title">
                    O nas
                </h2>
                <p className="about__text">
                    {aboutUsText ? <span dangerouslySetInnerHTML={{__html: aboutUsText}} /> : ''};
                </p>
                <ul className="about__list">
                    {aboutUsCards.map(el => <li key={el.id} className="about__item">
                        <div className="about__item-wrap">
                            <img src={el.image} alt="" className="about__img"/>
                        </div>
                        <h4 className="about__item-title">{el.caption}</h4>
                    </li>)}
                </ul>
            </div>
        </section>
    }
    </>
};

export default AboutUs;