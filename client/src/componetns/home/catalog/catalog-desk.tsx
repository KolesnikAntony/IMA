import React from "react";
import './catalog.scss';
import ProductCard from "../../product-card/product-card";

const CatalogItemsDesk = () => {
    return  <div className='home-catalog__items'>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
    </div>
};
export default CatalogItemsDesk;