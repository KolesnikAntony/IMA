import React from "react";
import './catalog.scss';
import {Link} from "react-router-dom";


const Catalog = () => {

    return (
        <section className='catalog'>
            <div className="container">
                <ul className='catalog__items'>
                    <li className="product-card">
                        <span className="product-card__sale product-card__mark"></span>
                        <span className="product-card__wish">0</span>
                        <img className="product-card__image" src="https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_300/https://ima-professional.pl/wp-content/uploads/2021/01/Agate07-300x300.jpg" alt=""/>
                        <div className="product-card__info">
                            <h3 className="product-card__name">laker</h3>
                            <p className="product-card__price">30 zl</p>
                        </div>
                        <div className="product-card__holder">
                            <div className="product-card__marks">
                                <span className="product-card__new product-card__mark">new</span>
                                <span className="product-card__top product-card__mark">top</span>
                            </div>
                            <Link to={`/product/${11}`}>add to cart</Link>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default Catalog;