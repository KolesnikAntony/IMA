import React, {FC, useContext} from "react";
import './product-card.scss'
import {Link} from "react-router-dom";
import {ProductType} from "../../types/types";
import {useDispatch} from "react-redux";
import cap from './../../assets/img/nail-polish.png'
import {VIEW_TYPES} from "../../constants/constants";
import {OpenCartContext} from "../../context/context";
import {getAddToCart} from "../../redux/cart-reducer";


const ProductCard: FC<ProductType> = ({title, imageSrc, price, salePrice, sale, top, itsNew, _id, isCart}) => {

    const dispatch = useDispatch();

    const putToCart = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
        e.preventDefault();
        console.log(id);
        dispatch(getAddToCart(id));
    };

    const openCart = useContext(OpenCartContext);

    const openCartHandler = (e: React.MouseEvent<HTMLButtonElement>)=> {
        e.preventDefault();
        openCart(VIEW_TYPES.CART);
    };

    const addDefaultSrc = (e: any) => {e.target.src = cap};


    return <div className="product-card">
        <Link to={`/product/${_id}`}>
            <div className="product-card__marks">
                {sale && <span className="product-card__mark--sale product-card__mark">sale</span>}
                {itsNew && <span className="product-card__mark--new product-card__mark">new</span>}
                {top && <span className="product-card__mark--top product-card__mark">top</span>}
            </div>
            {/*<span className="product-card__wish">0</span>*/}
            <div className='product-card__image-wrapp'><img className="product-card__image"
                      src={imageSrc ? imageSrc : cap}
                      alt={title}
                      onError={(e) => addDefaultSrc(e)}/></div>
            <div className="product-card__info">
                <p className="product-card__name">{title}</p>
                <p className="product-card__price">{salePrice ? price + "/" + salePrice : price}zł</p>
            </div>

            {!isCart ?
                <button className="product-card__add" onClick={(e) => putToCart(e, _id)}>dodaj do koszyka</button>:
                <button className="product-card__go" onClick={(e)=> openCartHandler(e)} >sprawdź koszyk</button>
            }
        </Link>
    </div>
};

export default ProductCard;