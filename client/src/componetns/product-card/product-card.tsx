import React, {FC} from "react";
import './product-card.scss'
import {Link} from "react-router-dom";
import {ProductType} from "../../types/types";


const ProductCard: FC<ProductType> = ({title, image, price, salePrice, sale, top, isNew, id}) => {

    const putToCart = (e: any) => {
        e.preventDefault();
        console.log('click')
    };

    return <div className="product-card">
        <Link to={`/product/${id}`}>
            <div className="product-card__marks">
                {sale && <span className="product-card__mark--sale product-card__mark">sale</span>}
                {isNew && <span className="product-card__mark--new product-card__mark">new</span>}
                {top && <span className="product-card__mark--top product-card__mark">top</span>}
            </div>
            {/*<span className="product-card__wish">0</span>*/}
            <img className="product-card__image"
                 src={image}
                 alt={title}/>
            <div className="product-card__info">
                <p className="product-card__name">{title}</p>
                <p className="product-card__price">{salePrice ? price + "/" + salePrice : price}zl</p>
            </div>
            <button className="product-card__add" onClick={(e) => putToCart(e)}>add to cart</button>
        </Link>
    </div>
};

export default ProductCard;