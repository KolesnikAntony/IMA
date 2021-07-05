import React, {useEffect, useRef, useState} from 'react'
import './shop.scss'
import Filter from "./filter";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {FormFilterDataType, ProductType} from "../../types/types";
import {filterOfCategories, getProducts, ProductsInitialStateType} from "../../redux/products-reducer";
import {useMediaQuery} from "react-responsive";
import Paginator from '../../common/paginator/pagintaor';
import {FILTER_TYPES} from "../../constants/constants";
import Preloader from "../../common/preloader/preloader";
import ProductCard from "../../componetns/product-card/product-card";
import {useOutsideAlerter} from "../../hooks/hooks";

const Shop = () => {
    const dispatch = useDispatch();
    const products = useSelector<AppStateType, Array<ProductType>>(state => state.products.products);
    const {totalPages, currentPage, portionSize, selectType , sort, isFetching} = useSelector<AppStateType, ProductsInitialStateType>(state => state.products);
    const isDesktop = useMediaQuery({minWidth: 1031});

    useEffect(()=> {
        console.log('render shop from useEffect');
        dispatch(getProducts(1, FILTER_TYPES.SELECT_TYPE.ALL, FILTER_TYPES.SORT_TYPE.MAX));
        dispatch(filterOfCategories([],[]))
    }, []);

    const showCurrentProducts = (currentPage: number) => {
        dispatch(getProducts(currentPage, selectType, sort));
        window.scrollTo(0, 0);
    };

    //todo make custom Hook for function below


    const getTrueObjectKeys = (obj: {}) => {
        let objectKeys = !obj ? [] :  Object.keys(obj) as Array<keyof typeof obj>;
        return objectKeys.filter(key => obj[key]);
    };


    const setFilter = (data: FormFilterDataType) => {
        const categories = getTrueObjectKeys(data.categories);
        const colors = getTrueObjectKeys(data.colors);

         dispatch(filterOfCategories(categories,colors))
    };

    const handleOrderPrice = (e: React.FormEvent<HTMLSelectElement>) => {
        let value = e.currentTarget.value;
        dispatch(getProducts(currentPage, selectType, value ));
    };

    const handleProductList = (e: React.FormEvent<HTMLSelectElement>) => {
        let value = e.currentTarget.value;
        dispatch(getProducts(1, value, sort));
    };

    const [showMobFilter, setShowMobFilter] = useState(false);

    const handleShowMobFilter = () => {
        setShowMobFilter(prev => !prev);
    };

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, handleShowMobFilter);

    return <>
        <section className="shop">
            <div className="container">
                <div className="shop__row">
                    {isDesktop &&
                    <div className="shop__sidebar"><Filter setFilter={setFilter}/></div>}
                    <div className="shop__content">
                        <div className="shop__prop-wrap">
                            <h2 className="shop__title">Sklep</h2>
                            <div className="shop__properties">
                                {isDesktop || <button className="shop__select" onClick={handleShowMobFilter}>
                                    Filter
                                </button>}
                                {showMobFilter && !isDesktop && <div ref={wrapperRef} className='shop__form--div'><Filter  setFilter={setFilter}/></div>}
                                <select className="shop__select" value={sort} onChange={(e) => handleOrderPrice(e)}>
                                    <option value={FILTER_TYPES.SORT_TYPE.MIN} className="shop__select-item">min</option>
                                    <option value={FILTER_TYPES.SORT_TYPE.MAX} className="shop__select-item">max</option>
                                </select>
                                <select className="shop__select" value={selectType}
                                        onChange={(e) => handleProductList(e)}>
                                    <option value={FILTER_TYPES.SELECT_TYPE.ALL} className="shop__select-item">wszystko</option>
                                    <option value={FILTER_TYPES.SELECT_TYPE.NEW} className="shop__select-item">new</option>
                                    <option value={FILTER_TYPES.SELECT_TYPE.TOP} className="shop__select-item">top</option>
                                    <option value={FILTER_TYPES.SELECT_TYPE.SALE} className="shop__select-item">sale</option>
                                </select>

                            </div>
                        </div>
                            <div className="shop__products">
                                { isFetching ? <Preloader type='products-list'/> :products.length !== 0 ? products.map(el => <ProductCard key={el._id} {...el}/>): <span className='shop__empty'>List is empty...</span> }
                            </div>
                        {isFetching || <Paginator currentPage={currentPage} totalPages={totalPages}  portionSize={portionSize} showCurrentProducts={showCurrentProducts}/>}
                    </div>
                </div>
            </div>
        </section>
    </>
};

export default Shop;

