import React from "react";
import './catalog.scss';
import CatalogItemsDesk from "./catalog-desk";
import CatalogItemsMob from "./catalog-mob";
import { Link } from "react-router-dom";
import {useViewSize} from "../../../hooks/hooks";


const Catalog = () => {
    let {width} = useViewSize();

    return (
        <section className='home-catalog'>
            <div className="container">
                <h2 className='home-catalog__title'>Product catalog</h2>
                {width > 504 ? <CatalogItemsDesk/> : <CatalogItemsMob/> }
                <Link to='/shop' className='home-catalog__button'>To show</Link>
            </div>
        </section>
    )
};

export default Catalog;
