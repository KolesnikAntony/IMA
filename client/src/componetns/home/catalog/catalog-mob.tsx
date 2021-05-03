import React, {FC} from "react";
import './catalog.scss';
import ProductCard from "../../product-card/product-card";
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';


const CatalogItemsMob:FC = () => {

    SwiperCore.use([Navigation]);

    return(<div className='home-catalog__items'>
            <Swiper spaceBetween={20}
                    slidesPerView={1}
                    navigation
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}>
                {/*<SwiperSlide><ProductCard/></SwiperSlide>*/}
                {/*<SwiperSlide><ProductCard/></SwiperSlide>*/}
                {/*<SwiperSlide><ProductCard/></SwiperSlide>*/}
                {/*<SwiperSlide><ProductCard/></SwiperSlide>*/}
                {/*<SwiperSlide><ProductCard/></SwiperSlide>*/}
                {/*<SwiperSlide><ProductCard/></SwiperSlide>*/}
                {/*<SwiperSlide><ProductCard/></SwiperSlide>*/}
                {/*<SwiperSlide><ProductCard/></SwiperSlide>*/}
            </Swiper>
        </div>
        )
};
export default CatalogItemsMob;