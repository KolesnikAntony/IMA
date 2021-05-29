import React, {FC, useEffect, useState} from "react";
import {actionsProducts} from "../../../redux/products-reducer";
import './cart-product.scss'
import {useDispatch} from "react-redux";

interface CartPropsType {
    title: string
    image: string
    currentPrice: number
    id: string
}

const CartProduct:FC<CartPropsType> = ({title, currentPrice, image, id }) => {

    const [totalProductPrice, setTotalProductPrice] = useState(currentPrice);
    const dispatch = useDispatch();

    const [quantity, setQuantity] = useState(1);

    const addQnt = () => {
        if(quantity <= 100) {
            setQuantity(quantity + 1);
        }
    };

    const removeQnt = () => {
        if(quantity > 1){
            setQuantity(quantity - 1);
        }else{
            dispatch(actionsProducts.removeFromCart(id));
            dispatch(actionsProducts.setIsInCart(id, false));
        }
    };

    useEffect(() => {
        console.log('render')
        setTotalProductPrice(quantity * currentPrice);
        quantity >= 1 && dispatch(actionsProducts.updateQty(id,quantity));
    }, [quantity]);

    return (
        <div className="cart-product">
            <img className="cart-product__img" src={image} alt="product" />
            <p className="cart-product__name">{title}</p>
            <div className="cart-product__price">
                <div className="cart-product__price-qty">
                    <h3 className="cart-product__price-qty-title">
                        Quantity
                    </h3>
                    <div className="cart-product__price-qty-buttons">
                        <button className="cart-product__price-btn cart-product__price-btn--min" onClick={removeQnt}/>
                        <span className="cart-product__price-count">{quantity}</span>
                        <button className="cart-product__price-btn cart-product__price-btn--plus" onClick={addQnt}/>
                    </div>
                </div>
                <p className="cart-product__price-total">{totalProductPrice}zl</p>
            </div>
        </div>
    )
}

export default CartProduct;