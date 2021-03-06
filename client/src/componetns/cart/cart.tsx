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
            <h3 className="cart__title aside__title">Koszyk</h3>
            <div className="cart__products">
                {cartProducts.length === 0 ? <h4>Koszyk jest pusty...</h4>:
                    cartProducts.map(el =>  <CartProduct  key={el._id} id={el._id} title={el.title} qty={el.qty} image={el.imageSrc} currentPrice={el.salePrice ? el.salePrice : el.price}/>)}
            </div>
            <div className="cart__actions">
                <form className="cart__promo">
                    {/*<div className="cart__promo-form">*/}
                    {/*    <input type="text" className='cart__promo-input' placeholder='Have a promo?'/>*/}
                    {/*    <button className='cart__promo-btn'/>*/}
                    {/*</div>*/}
                    <p className="cart__actions-sum">
                        Suma {totalPrice} zł
                    </p>
                </form>
                <div className="cart__buttons">
                    <Link to="/shop" className='cart__buttons-back' onClick={onClose}>Powrót do sklepu</Link>
                    <Link to="/checkout" onClick={onClose} className={checkoutClasses}>sprawdzić</Link>
                </div>
            </div>
        </section>
    )
}

export default Cart;