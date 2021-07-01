import React, {FC, useEffect} from "react";
import './new-products.scss';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../redux/store";
import {ProductType} from "../../../types/types";
import {Swiper, SwiperSlide} from "swiper/react";

import {getNewProducts} from "../../../redux/home-reducer";
import ProductCard from "../../../componetns/product-card/product-card";


interface PropsType {
    getCountOfSlide: () => number
}

const NewProducts:FC<PropsType> = ({getCountOfSlide}) => {

    const products = useSelector<AppStateType, Array<ProductType>>(state=> state.home.newProducts);
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(getNewProducts());
    }, []);

    return (
        <section className='new-products'>
            <div className="container">
                <h2 className='new-products__title'>Nowości</h2>
                <Swiper spaceBetween={20}
                        slidesPerView={getCountOfSlide()}
                        navigation>
                    {products.map(el=> <SwiperSlide key={el._id}><ProductCard {...el}/></SwiperSlide> )}
                </Swiper>
                <Link to='/shop' className='new-products__button'>DO SKLEPU</Link>
            </div>
        </section>
    )
};

export default NewProducts;
