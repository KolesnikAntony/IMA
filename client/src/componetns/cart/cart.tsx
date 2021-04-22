import React, {FC} from "react";
import CartProduct from "./cart-product/cart-product";
import './cart.scss'

const Cart = () => {

    return (
        <section className='cart'>
            <h3 className="cart__title aside__title">Cart</h3>
            <div className="cart__products">
                <CartProduct/>
                <CartProduct/>
                <CartProduct/>
            </div>
            <div className="cart__actions">
                <form className="cart__promo">
                    <div className="cart__promo-form">
                        <input type="text" className='cart__promo-input' placeholder='Have a promo?'/>
                        <button className='cart__promo-btn'/>
                    </div>
                    <p className="cart__actions-sum">
                        Subtotal 50 zl
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