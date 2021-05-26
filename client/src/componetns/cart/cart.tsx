import React, {useEffect, useState} from "react";
import CartProduct from "./cart-product/cart-product";
import './cart.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {ProductType} from "../../types/types";
import {getCartItem} from "../../redux/products-reducer";

const Cart = () => {
    const dispatch = useDispatch();
   // const cartProducts = useSelector<AppStateType, Array<ProductType>>(state => state.products.cart);
    const [totalPrice, setTotalPrice] = useState(0);
    const [testArray, setTestArray] = useState([]);

    // useEffect(() => {
    //     dispatch(getCartItem());
    //
    //     // const totalPrice = cartProducts.length ? cartProducts
    //     //     .map((el) => el.salePrice ? el.salePrice : el.price)
    //     //     .reduce((prev, current) => prev + current) : 0;
    //     //
    //     // setTotalPrice(totalPrice);
    //
    // }, [cartProducts]);

    return (
        <section className='cart'>
            <h3 className="cart__title aside__title">Cart</h3>
            <div className="cart__products">
            </div>
            <div className="cart__actions">
                <form className="cart__promo">
                    <div className="cart__promo-form">
                        <input type="text" className='cart__promo-input' placeholder='Have a promo?'/>
                        <button className='cart__promo-btn'/>
                    </div>
                    <p className="cart__actions-sum">
                        Subtotal {totalPrice} zl
                    </p>
                </form>
                <div className="cart__buttons">
                    <a href="" className='cart__buttons-back'>Back to shopping</a>
                    <button className='cart__buttons-checkout'>checkout</button>
                </div>
            </div>
        </section>
    )
}

export default Cart;