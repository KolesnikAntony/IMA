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

const Shop = () => {
    console.log('render shop');
    const dispatch = useDispatch();
    const products = useSelector<AppStateType, Array<ProductType>>(state => state.products.products);
    const {totalPages, currentPage, portionSize, sale, itsNew, top , sort} = useSelector<AppStateType, ProductsInitialStateType>(state => state.products);
    const isDesktop = useMediaQuery({minWidth: 943});

    useEffect(()=> {
        console.log('render shop from useEffect');
        dispatch(getProducts(currentPage, false, false, false, false));
        window.scrollTo(0, 0);
    }, []);

    const showCurrentProducts = (currentPage: number) => {
        dispatch(getProducts(currentPage, sale, itsNew, top , sort));
        window.scrollTo(0, 0);
    };

    //todo make custom Hook for function below

    const [orderOfPrice, setOrderOfPrice] = useState('max');
    const [productTypeList, setProductTypeList] = useState('all');

    const setFilter = (data: FormFilterDataType) => {
        console.log(data);
    };

    const handleOrderPrice = (e: React.FormEvent<HTMLSelectElement>) => {
        let value = e.currentTarget.value;
        setOrderOfPrice(value);
        if(value === 'min'){
            dispatch(getProducts(currentPage, top, itsNew, sale, true));
        }else if(value === 'max') {
            dispatch(getProducts(currentPage, top, itsNew, sale,  false));
        }
    };

    const handleProductList = (e: React.FormEvent<HTMLSelectElement>) => {
        let value = e.currentTarget.value;
        setProductTypeList(value);
        if( value === 'all') {
            dispatch(getProducts(currentPage, false, false, false , sort));
        }else if(value === 'new'){
            dispatch(getProducts(currentPage, false, true, false , sort));
        }else if(value === 'top'){
            dispatch(getProducts(currentPage, true, false, false , sort));
        }else if(value === 'sale'){
            dispatch(getProducts(currentPage, false, false, true , sort));
        }
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
                            <select className="shop__select" value={orderOfPrice} onChange={(e) => handleOrderPrice(e)}>
                                <option value="min" className="shop__select-item">min</option>
                                <option value="max" className="shop__select-item">max</option>
                            </select>
                            <select className="shop__select" value={productTypeList}
                                    onChange={(e) => handleProductList(e)}>
                                <option value="all" className="shop__select-item">all</option>
                                <option value="new" className="shop__select-item">new</option>
                                <option value="top" className="shop__select-item">top</option>
                                <option value="sale" className="shop__select-item">sale</option>
                            </select>
                            {showMobFilter && !isDesktop && <Filter products={products} setFilter={setFilter}/>}
                        </div>
                        <div className="shop__products">
                            {products.map(el => <ProductCard key={el.id} {...el}/>)}
                        </div>
                        <Paginator currentPage={currentPage} totalPages={totalPages}  portionSize={portionSize} showCurrentProducts={showCurrentProducts}/>
                    </div>
                </div>
            </div>
        </section>
    </>
};

export default Shop;

