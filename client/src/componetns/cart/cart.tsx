import React, {useCallback, useEffect, useState} from "react";
import CartProduct from "./cart-product/cart-product";
import './cart.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {CartType} from "../../types/types";
import { actionsProducts } from "../../redux/products-reducer";


const Cart = () => {
    const cartProducts = useSelector<AppStateType, Array<CartType>>(state => state.products.cart);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        //dispatch(getCartItem());
        let total = 0;
        cartProducts.forEach(item => total += item.qty * item.price);
        setTotalPrice(total);

    }, [cartProducts]);

    return (
        <section className='cart'>
            <h3 className="cart__title aside__title">Cart</h3>
            <div className="cart__products">
                {cartProducts.map(el =>  <CartProduct  key={el._id} id={el._id} title={el.title} image={el.imageSrc} currentPrice={el.salePrice ? el.salePrice : el.price}/>)}
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