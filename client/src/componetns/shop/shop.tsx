import React from 'react'
import './shop.scss'
import Filter from "./filter";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {ProductType} from "../../types/types";
import ProductCard from "../product-card/product-card";

const Shop = () => {
    const dispatch = useDispatch();
    const products = useSelector<AppStateType, Array<ProductType>>(state=> state.products.products);

    return <>
        <section className="shop">
            <div className="container">
                <h2 className="shop__title">Shop</h2>
                <div className="shop__row">
                    <div className="shop__sidebar">
                        <Filter products={products} />
                    </div>
                    <div className="shop__content">
                        <div className="shop__properties">
                            <select className="shop__select">
                                <option value="" className="shop__select-item">min</option>
                                <option value="" className="shop__select-item">max</option>
                            </select>
                            <select className="shop__select">
                                <option value="" className="shop__select-item">new</option>
                                <option value="" className="shop__select-item">top</option>
                                <option value="" className="shop__select-item">sale</option>
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

