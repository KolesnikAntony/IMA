import React, {FC, useEffect, useMemo, useState} from "react";
import CartProduct from "./cart-product/cart-product";
import './cart.scss'
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {Link} from "react-router-dom";

interface PropsType {
    onClose: ()=> void
}

const Cart:FC<PropsType> = ({onClose}) => {
    let cartProducts = useSelector((state: RootState) => state.cart.cart);
    const [totalPrice, setTotalPrice] = useState(0);

    const checkoutClasses = useMemo(() => !!cartProducts.length ? 'cart__buttons-checkout': 'cart__buttons-checkout cart__buttons-checkout--disable', [cartProducts] )

    useEffect(() => {
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
                    <Link to="/checkout" onClick={onClose} className={checkoutClasses}>checkout</Link>
                </div>
            </div>
        </section>
    )
}

export default Cart;