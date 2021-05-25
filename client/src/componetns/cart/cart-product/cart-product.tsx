import React, {FC, useEffect, useState} from "react";
import { updateQtyOfProduct } from "../../../redux/products-reducer";
import './cart-product.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../redux/store";
import {ProductType} from "../../../types/types";

interface CartPropsType {
    title: string
    image: string
    price: number
    salePrice: number | null
    setTestArray: (initArray: any) => void;
    id: number
}

const CartProduct:FC<CartPropsType> = ({title, salePrice, price, image, setTestArray, id}) => {
    const currentPrice = salePrice ? salePrice : price;
    const [totalProductPrice, setTotalProductPrice] = useState(currentPrice);


    const dispatch = useDispatch();
    //const cart = useSelector<AppStateType, Array<ProductType & {qty?: number}>>(state => state.products.cart);
    // setTestArray((initArray: any) => [...initArray, totalProductPrice ]);
    //let qty  = cart.find(el => el.id === id && el.qty);
    //console.log(qty)
    const [quantity, setQuantity] = useState(1);

    const addQnt = () => {
        if(quantity <= 100) {
            setQuantity(quantity + 1);
            dispatch(updateQtyOfProduct(id,quantity + 1))
        }
    };

    const removeQnt = () => {
        if(quantity >= 2) {
            setQuantity(quantity - 1);
            dispatch(updateQtyOfProduct(id,quantity - 1))
        }
    };

    useEffect(() => {
       dispatch(updateQtyOfProduct(id,quantity));
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