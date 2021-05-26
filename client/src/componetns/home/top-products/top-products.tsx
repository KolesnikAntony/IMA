import React, {FC} from "react";
import ProductCard from "../../product-card/product-card";
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import './top-products.scss';
import {useSelector} from "react-redux";
import {AppStateType} from "../../../redux/store";
import {ProductType} from "../../../types/types";


interface PropsType {
    getCountOfSlide: () => number
}

const TopProducts:FC<PropsType> = ({getCountOfSlide}) => {
    const products = useSelector<AppStateType, Array<ProductType>>(state => state.products.products);
    console.log(products, '---top');
    return (
        <section className="top">
            <div className="container">
                <h2 className='top__title'>Top products</h2>
                    <Swiper spaceBetween={20}
                            slidesPerView={getCountOfSlide()}
                            navigation
                            onSlideChange={() => console.log('slide change')}
                            onSwiper={(swiper) => console.log(swiper)}>
                        {products.map(el=> <SwiperSlide key={el.id}><ProductCard {...el}/></SwiperSlide> )}
                    </Swiper>

                {/*{dimensions.width > 504 ? <CatalogItemsDesk/> : <CatalogItemsMob/> }*/}
            </div>
        </section>
    )
};

export default TopProducts;