import React, {FC} from "react";
import './catalog.scss';
import ProductCard from "../../product-card/product-card";
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import {ProductType} from "../../../types/types";


const CatalogItemsMob:FC<{products: Array<ProductType>}> = ({products}) => {

    SwiperCore.use([Navigation]);

    return(<div className='home-catalog__items'>
            <Swiper spaceBetween={20}
                    slidesPerView={1}
                    navigation
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}>
                {products.slice(0, 8).map(el =><SwiperSlide><ProductCard key={el.id} {...el}/></SwiperSlide>)}
            </Swiper>
        </div>
        )
};
export default CatalogItemsMob;