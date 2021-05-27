import React, {useEffect, useState} from 'react'
import './shop.scss'
import Filter from "./filter";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {FormFilterDataType, ProductType} from "../../types/types";
import ProductCard from "../product-card/product-card";
import {getProducts, ProductsInitialStateType} from "../../redux/products-reducer";
import {useMediaQuery} from "react-responsive";
import Paginator from '../../common/paginator/pagintaor';
import {FILTER_TYPES} from "../../constants/constants";
import Preloader from "../../common/preloader/preloader";

const Shop = () => {
    console.log('render shop');
    const dispatch = useDispatch();
    const products = useSelector<AppStateType, Array<ProductType>>(state => state.products.products);
    const {totalPages, currentPage, portionSize, selectType , sort, isFetching} = useSelector<AppStateType, ProductsInitialStateType>(state => state.products);
    const isDesktop = useMediaQuery({minWidth: 943});

    useEffect(()=> {
        console.log('render shop from useEffect');
        dispatch(getProducts(currentPage, FILTER_TYPES.SELECT_TYPE.ALL, FILTER_TYPES.SORT_TYPE.MAX));
        window.scrollTo(0, 0);
    }, []);

    const showCurrentProducts = (currentPage: number) => {
        dispatch(getProducts(currentPage, selectType, sort));
        window.scrollTo(0, 0);
    };

    //todo make custom Hook for function below

    const setFilter = (data: FormFilterDataType) => {
        console.log(data);
    };

    const handleOrderPrice = (e: React.FormEvent<HTMLSelectElement>) => {
        let value = e.currentTarget.value;
        dispatch(getProducts(currentPage, selectType, value ));
    };

    const handleProductList = (e: React.FormEvent<HTMLSelectElement>) => {
        let value = e.currentTarget.value;
        dispatch(getProducts(currentPage, value, sort));
    };

    const [showMobFilter, setShowMobFilter] = useState(false);
    const handleShowMobFilter = () => {
        setShowMobFilter(prev => !prev);
    };

    return <>
        <section className="shop">
            <div className="container">
                <h2 className="shop__title">Shop</h2>
                <div className="shop__row">
                    {isDesktop &&
                    <div className="shop__sidebar"><Filter products={products} setFilter={setFilter}/></div>}
                    <div className="shop__content">
                        <div className="shop__properties">
                            {isDesktop || <button className="shop__select" onClick={handleShowMobFilter}>
                                Filter
                            </button>}
                            <select className="shop__select" value={sort} onChange={(e) => handleOrderPrice(e)}>
                                <option value={FILTER_TYPES.SORT_TYPE.MIN} className="shop__select-item">min</option>
                                <option value={FILTER_TYPES.SORT_TYPE.MAX} className="shop__select-item">max</option>
                            </select>
                            <select className="shop__select" value={selectType}
                                    onChange={(e) => handleProductList(e)}>
                                <option value={FILTER_TYPES.SELECT_TYPE.ALL} className="shop__select-item">all</option>
                                <option value={FILTER_TYPES.SELECT_TYPE.NEW} className="shop__select-item">new</option>
                                <option value={FILTER_TYPES.SELECT_TYPE.TOP} className="shop__select-item">top</option>
                                <option value={FILTER_TYPES.SELECT_TYPE.SALE} className="shop__select-item">sale</option>
                            </select>
                            {showMobFilter && !isDesktop && <Filter products={products} setFilter={setFilter}/>}
                        </div>
                        {isFetching ? <Preloader type='products-list'/> :
                        <>
                            <div className="shop__products">
                                {products.length !== 0 ? products.map(el => <ProductCard key={el.id} {...el}/>): <span className='shop__empty'>List is empty...</span> }
                            </div>
                            <Paginator currentPage={currentPage} totalPages={totalPages}  portionSize={portionSize} showCurrentProducts={showCurrentProducts}/>
                        </>}
                    </div>
                </div>
            </div>
        </section>
    </>
};

export default Shop;

