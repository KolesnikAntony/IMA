import React, {FC} from "react";
import './new-products.scss';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../redux/store";
import {ProductType} from "../../../types/types";
import {Swiper, SwiperSlide} from "swiper/react";
import ProductCard from "../../product-card/product-card";


interface PropsType {
    getCountOfSlide: () => number
}

const NewProducts:FC<PropsType> = ({getCountOfSlide}) => {

    const products = useSelector<AppStateType, Array<ProductType>>(state=> state.products.products);
    console.log(products, '---new');
    return (
        <section className='new-products'>
            <div className="container">
                <h2 className='new-products__title'>New products</h2>
                <Swiper spaceBetween={20}
                        slidesPerView={getCountOfSlide()}
                        navigation>
                    {products.map(el=> <SwiperSlide key={el.id}><ProductCard {...el}/></SwiperSlide> )}
                </Swiper>
                <Link to='/shop' className='new-products__button'>To show</Link>
            </div>
        </section>
    )
};

export default NewProducts;
