import React from "react";
import './cart-product.scss'

const CartProduct = () => {
    return (
        <div className="cart-product">
            <img className="cart-product__img" src="https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_300/https://ima-professional.pl/wp-content/uploads/2021/01/Agate07-300x300.jpg" alt="product" />
            <p className="cart-product__name">Color Gel LS Diamond 02 (GRATTOL)</p>
            <div className="cart-product__price">
                <div className="cart-product__price-qty">
                    <h3 className="cart-product__price-qty-title">
                        Quantity
                    </h3>
                    <div className="cart-product__price-qty-buttons">
                        <button className="cart-product__price-btn cart-product__price-btn--min"/>
                        <span className="cart-product__price-count">0</span>
                        <button className="cart-product__price-btn cart-product__price-btn--plus"/>
                    </div>
                </div>
                <p className="cart-product__price-total">70 zl</p>
            </div>
        </div>
    )
}

export default CartProduct;