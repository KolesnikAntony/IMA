import React from "react";
import './product-card.scss'
import {Link} from "react-router-dom";

const ProductCard = () => {
    let sale = true;
    let top = true;
    let newProduct = true;

    const putToCart = (e:any) => {
        e.preventDefault();
        console.log('click')
    }

    return <div className="product-card">
        <Link to={`/product/${11}`}>
            <div className="product-card__marks">
                {sale && <span className="product-card__mark--sale product-card__mark">sale</span>}
                {newProduct && <span className="product-card__mark--new product-card__mark">new</span>}
                {top && <span className="product-card__mark--top product-card__mark">top</span>}
            </div>
            {/*<span className="product-card__wish">0</span>*/}
            <img className="product-card__image"
                 src="https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_300/https://ima-professional.pl/wp-content/uploads/2021/01/Agate07-300x300.jpg"
                 alt=""/>
            <div className="product-card__info">
                <p className="product-card__name">Laker lala 5 color black ok 50ml and red</p>
                <p className="product-card__price">30 zl</p>
            </div>
           <button className="product-card__add" onClick={(e) => putToCart(e)}>add to cart</button>
        </Link>
    </div>
};

export default ProductCard;