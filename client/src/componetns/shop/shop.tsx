import React, {useState} from 'react'
import './shop.scss'
import Filter from "./filter";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {FormFilterDataType, ProductType} from "../../types/types";
import ProductCard from "../product-card/product-card";
import {getFilter, getProductsOrder, getProductsType} from "../../redux/products-reducer";

const Shop = () => {
    const dispatch = useDispatch();
    const products = useSelector<AppStateType, Array<ProductType>>(state=> state.products.products)

    //todo make custom Hook for function below

    const [orderOfPrice, setOrderOfPrice] = useState('def');
    const [productTypeList, setProductTypeList] = useState('all');

    const setFilter = (data: FormFilterDataType) => {
        dispatch(getFilter(data))
    };

    const handleOrderPrice = (e:React.FormEvent<HTMLSelectElement>) => {
        let value = e.currentTarget.value;
        dispatch(getProductsOrder(value));
        setOrderOfPrice(value);
    };
    const handleProductList = (e:React.FormEvent<HTMLSelectElement>) => {
        let value = e.currentTarget.value;
        dispatch(getProductsType(value));
        setProductTypeList(value);
    };

    return <>
        <section className="shop">
            <div className="container">
                <h2 className="shop__title">Shop</h2>
                <div className="shop__row">
                    <div className="shop__sidebar">
                        <Filter products={products} setFilter={setFilter} />
                    </div>
                    <div className="shop__content">
                        <div className="shop__properties">
                            <select className="shop__select" value={orderOfPrice} onChange={(e) => handleOrderPrice(e) }>
                                <option value="def" className="shop__select-item" >def</option>
                                <option value="min" className="shop__select-item" >min</option>
                                <option value="max" className="shop__select-item">max</option>
                            </select>
                            <select className="shop__select" value={productTypeList} onChange={(e) => handleProductList(e)}>
                                <option value="all" className="shop__select-item">all</option>
                                <option value="new" className="shop__select-item">new</option>
                                <option value="top" className="shop__select-item">top</option>
                                <option value="sale" className="shop__select-item">sale</option>
                            </select>
                        </div>
                        <div className="shop__products">
                            {products.map(el => <ProductCard key={el.id} {...el}/>)}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
};

export default Shop;

