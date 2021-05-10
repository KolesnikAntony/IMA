import React, {FC} from "react";
import './catalog.scss';
import CatalogItemsDesk from "./catalog-desk";
import CatalogItemsMob from "./catalog-mob";
import { Link } from "react-router-dom";
import {useViewSize} from "../../../hooks/hooks";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../redux/store";
import {ProductType} from "../../../types/types";


const Catalog = () => {
    let {width} = useViewSize();

    const products = useSelector<AppStateType, Array<ProductType>>(state=> state.products.products);

    return (
        <section className='home-catalog'>
            <div className="container">
                <h2 className='home-catalog__title'>Product catalog</h2>
                {width > 504 ? <CatalogItemsDesk products={products} /> : <CatalogItemsMob products={products} /> }
                <Link to='/shop' className='home-catalog__button'>To show</Link>
            </div>
        </section>
    )
};

export default Catalog;
