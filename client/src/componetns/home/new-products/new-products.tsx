import React, {FC, useEffect} from "react";
import './new-products.scss';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../redux/store";
import {ProductType} from "../../../types/types";
import {Swiper, SwiperSlide} from "swiper/react";
import ProductCard from "../../product-card/product-card";
import {getNewProducts} from "../../../redux/home-reducer";


interface PropsType {
    getCountOfSlide: () => number
}

const NewProducts:FC<PropsType> = ({getCountOfSlide}) => {

    const products = useSelector<AppStateType, Array<ProductType>>(state=> state.home.newProducts);
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(getNewProducts());
    }, []);

    console.log('render of NEW');
    return (
        <section className='new-products'>
            <div className="container">
                <h2 className='new-products__title'>New products</h2>
                <Swiper spaceBetween={20}
                        slidesPerView={getCountOfSlide()}
                        navigation>
                    {products.map(el=> <SwiperSlide key={el._id}><ProductCard {...el}/></SwiperSlide> )}
                </Swiper>
                <Link to='/shop' className='new-products__button'>To show</Link>
            </div>
        </section>
    )
};

export default NewProducts;
