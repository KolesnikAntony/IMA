import React from "react";
import './catalog.scss';
import ProductCard from "../../product-card/product-card";


const Catalog = () => {

    return (
        <section className='home-catalog'>
            <div className="container">
                <h2 className='home-catalog__title'>Product catalog</h2>
                <ul className='home-catalog__items'>
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                </ul>
            </div>
        </section>
    )
}

export default Catalog;