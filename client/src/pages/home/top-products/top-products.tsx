import React, {FC, useEffect} from "react";
import ProductCard from "../../../componetns/product-card/product-card";
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import './top-products.scss';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../redux/store";
import {ProductType} from "../../../types/types";
import {getTopProducts} from "../../../redux/home-reducer";


interface PropsType {
    getCountOfSlide: () => number
}

const TopProducts:FC<PropsType> = ({getCountOfSlide}) => {
    const products = useSelector<AppStateType, Array<ProductType>>(state => state.home.topProducts);
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(getTopProducts());
    }, []);

    console.log('render of TOP');
    return (
        <section className="top">
            <div className="container">
                <h2 className='top__title'>Top products</h2>
                    <Swiper spaceBetween={20}
                            slidesPerView={getCountOfSlide()}
                            navigation
                            onSlideChange={() => console.log('slide change')}
                            onSwiper={(swiper) => console.log(swiper)}>
                        {products.map(el=> <SwiperSlide key={el._id}><ProductCard {...el}/></SwiperSlide> )}
                    </Swiper>
            </div>
        </section>
    )
};

export default TopProducts;