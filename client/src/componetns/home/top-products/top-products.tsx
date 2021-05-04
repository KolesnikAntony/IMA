import React, {useCallback} from "react";
import ProductCard from "../../product-card/product-card";
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import './top-products.scss';
import {useViewSize} from "../../../hooks/hooks";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../redux/store";
import {ProductType} from "../../../types/types";



const TopProducts = () => {
    const products = useSelector<AppStateType, Array<ProductType>>(state => state.products.products);

    SwiperCore.use([Navigation]);
    let {width} = useViewSize();

    let getCountOfSlide = useCallback( (width: number) => {
        if(width > 991) {
            return 4
        }else if(width > 814){
            return 3
        }else if(width > 504){
            return 2
        }else{
            return 1
        }
    }, [width]);

    return (
        <section className="top">
            <div className="container">
                <h2 className='top__title'>Top products</h2>
                    <Swiper spaceBetween={20}
                            slidesPerView={getCountOfSlide(width)}
                            navigation
                            onSlideChange={() => console.log('slide change')}
                            onSwiper={(swiper) => console.log(swiper)}>
                        {products.map(el=> <SwiperSlide><ProductCard {...el}/></SwiperSlide> )}
                    </Swiper>

                {/*{dimensions.width > 504 ? <CatalogItemsDesk/> : <CatalogItemsMob/> }*/}
            </div>
        </section>
    )
};

export default TopProducts;