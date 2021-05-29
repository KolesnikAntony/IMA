import React, {FC, useEffect} from "react";
import './product.scss'
import {RouteComponentProps, withRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getProduct} from "../../redux/product-reducer";
import {AppStateType} from "../../redux/store";
import {ProductType} from "../../types/types";
import cap from "../../assets/img/nail-polish.png";


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

    const {title, description, imageSrc, price, salePrice, shortDescr, subText} = useSelector<AppStateType, ProductType>(state => state.productPage.product);

    const addDefaultSrc = (e: any) => {e.target.src = cap};

    let isCart = false;

    return (
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
                            <span className="product__price">{salePrice ? price + "/" + salePrice : price}zl</span>
                            {!isCart ? <button className="product__btn product__btn--atc">add to cart</button>
                                : <button className="product__btn product__btn--go">go to cart</button>
                            }
                        </div>

                    </div>
                </div>
                <p className="product__sub-info">{subText}</p>
            </div>
        </section>
    )
};

export default withRouter(Product);