import React, {FC, useContext, useEffect, useMemo} from "react";
import './product.scss'
import {RouteComponentProps, withRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getProduct} from "../../redux/product-reducer";
import {RootState} from "../../redux/store";
import {CartType} from "../../types/types";
import cap from "../../assets/img/nail-polish.png";
import Preloader from "../../common/preloader/preloader";
import {getAddToCart} from "../../redux/cart-reducer";
import {OpenCartContext} from "../../context/context";
import {VIEW_TYPES} from "../../constants/constants";


type PathParamsType = {
    id: string
}

type PropsType = RouteComponentProps<PathParamsType>

const Product: FC<PropsType> = ({match}) => {
    const dispatch = useDispatch();

    let productId = match.params.id;

    useEffect(()=> {
        dispatch(getProduct(productId));
    }, []);


    const {product ,isFetching } = useSelector((state:RootState)  => state.productPage);
    const {title, description, imageSrc, price, salePrice, shortDescr, subText} = product;

    const cart = useSelector<RootState, Array<CartType>>((state) => state.cart.cart);
    const isCart = useMemo(()=> cart.some(el => el._id == productId), [cart]);

    const addDefaultSrc = (e: any) => {e.target.src = cap};

    const putToCart = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
        e.preventDefault();
        dispatch(getAddToCart(id));
    };

    const openCart = useContext(OpenCartContext);

    const openCartHandler = (e: React.MouseEvent<HTMLButtonElement>)=> {
        e.preventDefault();
        openCart(VIEW_TYPES.CART);
    };
    console.log(isCart);
    return (<>
        {isFetching ? <Preloader type={'product'}/> :
        <section className='product'>
            <div className="container">
                <div className="product__row">
                    <div className="product__col">
                        <img className="product__img"
                             src={imageSrc ? imageSrc : cap}
                             onError={(e) => addDefaultSrc(e)}
                             alt="image"/>
                    </div>
                    <div className="product__col product__information">
                        <h3 className="product__title">{title}</h3>
                        <p className="product__short-descr">{shortDescr}</p>
                        <p className="product__description">{description}</p>
                        <div className="product__action">
                            <span className="product__price">{salePrice ? price + "/" + salePrice : price}zł</span>
                            {!isCart
                                ? <button className="product__btn product__btn--atc" onClick={(e) => putToCart(e, productId)}>dodaj do koszyka</button>
                                : <button className="product__btn product__btn--go" onClick={(e)=> openCartHandler(e)}>sprawdź koszyk</button>
                            }
                        </div>

                    </div>
                </div>
                <p className="product__sub-info">{subText}</p>
            </div>
        </section>}
        </>
    )
};

export default withRouter(Product);