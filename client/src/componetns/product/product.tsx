import React, {FC, useEffect} from "react";
import './product.scss'
import {RouteComponentProps, withRouter} from "react-router-dom";
import TopProducts from "../home/top-products/top-products";
import {useDispatch} from "react-redux";
import {getProduct} from "../../redux/product-reducer";


type PathParamsType = {
    id: string
}

type PropsType = RouteComponentProps<PathParamsType>

const Product: FC<PropsType> = ({match}) => {
    const dispatch = useDispatch();
    let productId = +match.params.id;

    useEffect(()=> {
        dispatch(getProduct(productId));
    });


    let isCart = false;

    return (
        <section className='product'>
            <div className="container">
                <div className="product__row">
                    <div className="product__col">
                        <img className="product__img"
                             src="https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_440/https://ima-professional.pl/wp-content/uploads/2021/02/02.jpg"
                             alt=""/>
                    </div>
                    <div className="product__col product__information">
                        <h3 className="product__title">Grattol Acryl Gel 02</h3>
                        <p className="product__short-descr">Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit.</p>
                        <p className="product__description">Akrylogel Grattol polimeryzowany w lampie nie powoduje
                            pieczenia płytki paznokcia.
                            <br/><br/>
                            <b>Sposób aplikacji:</b>
                            <br/><br/>
                            1. Nałóż cienką warstwę Grattol Rubber Base na przygotowaną płytkę paznokcia bez
                            wyrównania i wysusz w lampie LED przez 30-60 sekund.
                            <br/>
                            2. Wyciśnij groszek Grattol Acryl Gel na pędzelek lub specjalną szpatułkę
                            <br/>
                            3. Przenieś groszek na paznokieć i wygładzaj go aż do momentu otrzymania jednolitej
                            powłoki

                            Sposób aplikacji :
                            <br/><br/>
                            1. Nałóż cienką warstwę Grattol Rubber Base na przygotowaną płytkę paznokcia bez
                            wyrównania i wysusz w lampie LED przez 30-60 sekund.
                            <br/>
                            2. Wyciśnij groszek Grattol Acryl Gel na pędzelek lub specjalną szpatułkę
                        </p>
                        <div className="product__action">
                            <span className="product__price">17zl</span>
                            {!isCart ? <button className="product__btn product__btn--atc">add to cart</button>
                                : <button className="product__btn product__btn--go">go to cart</button>
                            }
                        </div>

                    </div>
                </div>
                <p className="product__sub-info">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias blanditiis deserunt dicta
                    dignissimos esse excepturi fugit illo in, libero maxime praesentium provident quae quas qui
                    similique tempora temporibus, ut voluptas?
                </p>
            </div>
        </section>
    )
};

export default withRouter(Product);