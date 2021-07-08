import React, {FC, useEffect, useMemo, useState} from "react";
import './checkout.scss'
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/store";
import {CartType, ProfileFormValueType, ProfilePropsType} from "../../types/types";
import {createField, Input, TextAria} from "../../common/formControls/form-controls";
import {required} from "../../helpers/validation/validation";
import {Link} from "react-router-dom";

interface PropsType {
    cartProducts: Array<CartType>
}

const Checkout: FC<InjectedFormProps<ProfileFormValueType, ProfilePropsType<PropsType>> & ProfilePropsType<PropsType>> = ({cartProducts}) => {
    const products = cartProducts;
    const productsClasses = useMemo(() => products.length <= 3 ? 'checkout__products' : 'checkout__products scroll', [products] );

    const [delivery, setDelivery] = useState('paczkomat');
    const [checkPolicy, setCheckPolicy] = useState(false);

    const [totalPrice, setTotalPrice] = useState(0);
    useEffect(() => {
        let total = 0;
        let delPrice = delivery === 'paczkomat' ? 10.99 :  12.99;
        cartProducts.forEach(item => total += item.qty * item.price);
        setTotalPrice(total !== 0 ? total + delPrice : 0);
    }, [products, delivery]);



    return <section className="checkout">
        <div className="container">
            <form className="checkout__form">
                <div className="checkout__row">
                    <div className="checkout__col checkout__info">
                        <h3 className="checkout__title">
                            Dane płatności
                        </h3>
                        <ul className="checkout__list">
                            <li className="checkout__item">
                                <div className="checkout__item-separator">
                                    <div className="checkout__item-wrap">
                                        <span className="checkout__item-caption">Imię <span>*</span></span>
                                        {createField<ProfileFormValueTypeKeys>(Input, 'name', 'Imię', 'text', [required])}
                                    </div>
                                    <div className="checkout__item-wrap">
                                        <span className="checkout__item-caption">Nazwisko <span>*</span></span>
                                        {createField<ProfileFormValueTypeKeys>(Input, 'surname', 'Nazwisko', 'text', [required])}
                                    </div>
                                </div>
                            </li>
                            <li className="checkout__item">
                                <span className="checkout__item-caption">Nazwa firmy (opcjonalne)</span>
                                {createField<ProfileFormValueTypeKeys>(Input, 'company', 'Nazwa firmy', 'text', [])}
                            </li>
                            <li className="checkout__item">
                                <span className="checkout__item-caption">Kraj / region <span>*</span></span>
                                {createField<ProfileFormValueTypeKeys>(Input, 'country', 'Kraj / region', 'text', [required])}
                            </li>
                            <li className="checkout__item">
                                <div className="checkout__item-line">
                                    <span className="checkout__item-caption">Ulica <span>*</span></span>
                                    {createField<ProfileFormValueTypeKeys>(Input, 'street', 'Ulica', 'text', [required])}
                                </div>
                                <div className="checkout__item-separator">
                                    <div className="checkout__item-wrap">
                                        <span className="checkout__item-caption">Budynek <span>*</span></span>
                                        {createField<ProfileFormValueTypeKeys>(Input, 'build', 'Budynek', 'text', [required])}
                                    </div>
                                    <div className="checkout__item-wrap">
                                        <span className="checkout__item-caption">Mieszkanie</span>
                                        {createField<ProfileFormValueTypeKeys>(Input, 'flat',
                                            'Mieszkanie', 'text', [])}
                                    </div>
                                </div>
                            </li>
                            <li className="checkout__item">
                                <div className="checkout__item-separator">
                                    <div className="checkout__item-wrap">
                                        <span className="checkout__item-caption">Miasto <span>*</span></span>
                                        {createField<ProfileFormValueTypeKeys>(Input, 'city',
                                            'Miasto', 'text', [required])}
                                    </div>
                                    <div className="checkout__item-wrap">
                                        <span className="checkout__item-caption">Kod pocztowy<span>*</span></span>
                                        {createField<ProfileFormValueTypeKeys>(Input, 'kod',
                                            'Kod pocztowy', 'text', [required])}
                                    </div>
                                </div>
                            </li>
                            <li className="checkout__item">
                                <span className="checkout__item-caption">Telefon<span>*</span></span>
                                {createField<ProfileFormValueTypeKeys>(Input, 'phone',
                                    'Telefon', 'text', [required])}
                            </li>
                            <li className="checkout__item">
                                <span className="checkout__item-caption">Email <span>*</span></span>
                                {createField<ProfileFormValueTypeKeys>(Input, 'email',
                                    'Email', 'text', [required])}
                            </li>
                        </ul>
                    </div>
                    <div className="checkout__col checkout__payments">
                        <h3 className="checkout__title">
                            Twoje zamówienie
                        </h3>
                        <ul className="checkout__list">
                            <li className="checkout__payments-item">
                                <h5 className="checkout__payments-title">
                                    PRODUKT
                                </h5>
                                <h5 className="checkout__payments-title not">
                                    KWOTA
                                </h5>
                            </li>
                            <li className="checkout__payments-item">
                                <ul className={productsClasses}>
                                    {products.map(item =>
                                        <li className="checkout__products-item">
                                            <div className="checkout__products-name">
                                            <span className="checkout__products-title">
                                                {item.title}
                                            </span>
                                                <span className="checkout__products-qry"> × {item.qty}</span>
                                            </div>
                                            <span className="checkout__products-price">zł{item.qty * item.price}</span>
                                        </li>)}
                                </ul>
                            </li>
                            <li className="checkout__payments-item column">
                                <h5 className="checkout__payments-title not">
                                    WYSYŁKA
                                </h5>
                                <div className="checkout__delivery">
                                    <label htmlFor='paczkomat' className='checkout__delivery-label' >
                                        <Field component='input' type='radio' name="delivery" value='paczkomat'
                                               id='paczkomat' checked={delivery === 'paczkomat'}
                                               onClick={()=> setDelivery('paczkomat')}/>
                                        <span className="checkout__delivery-checkmark"/>
                                        <span className='checkout__delivery-text'>
                                            InPost paczkomat (prosimy o podanie adresu paczkomatu):
                                            <span className='checkout__delivery-price'>zł10.99</span>
                                        </span>
                                    </label>
                                    {delivery === 'paczkomat' && createField<ProfileFormValueTypeKeys>(TextAria, 'post_box', 'Prosimy o podanie adresu paczkomatu', 'text', [required])}
                                    <label htmlFor='kurier' className='checkout__delivery-label'>
                                        <Field component='input' type='radio' name="delivery"
                                               value='kurier' id='kurier' checked={delivery === 'kurier'}
                                               onClick={()=> setDelivery('kurier')}/>
                                        <span className="checkout__delivery-checkmark"/>
                                        <span className='checkout__delivery-text'>
                                            Kurier:
                                        </span>
                                        <span className='checkout__delivery-price'>zł12,99</span>
                                    </label>
                                </div>
                            </li>
                            <li className="checkout__payments-item checkout__total">
                                <h5 className="checkout__payments-title">
                                    SUMA
                                </h5>
                                <span className="checkout__total-price">
                                    zł{totalPrice}
                                </span>
                            </li>
                        </ul>
                        <div className="checkout__policy">
                            <p className="checkout__policy-info">
                                Twoje dane osobowe będą wykorzystywane w celu realizacji Twojego zamówienia, wsparcia Twojego doświadczenia na tej stronie oraz do innych celów opisanych w naszej <Link to='/'>polityce prywatności</Link>.
                            </p>
                            <p className="checkout__policy-info checkout__delivery">
                                <Field component='input' type='checkbox' name="policy" value='true' validate={required}
                                       checked={checkPolicy} onClick={() => setCheckPolicy(!checkPolicy)}/>
                                <span className="checkout__delivery-checkmark"/>
                                <span>Przeczytałem/am i akceptuję <Link to='/'>regulamin *</Link></span>
                            </p>
                        </div>
                        <button className="checkout__submit" disabled={!checkPolicy} >KUPUJĘ I PŁACĘ</button>
                    </div>
                </div>
            </form>
        </div>
    </section>
};

const CheckoutForm = reduxForm<ProfileFormValueType, ProfilePropsType<PropsType> >({form: 'checkout'})(Checkout);

const mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        initialValues: {
            email: state.user.email,
            phone: state.user.phone,
            street: state.user.address.street,
            build: state.user.address.build,
            flat: state.user.address.flat,
            city: state.user.address.city,
            kod: state.user.address.kod,
            name: state.user.name,
            surname: '',
            company: '',
            country: 'Polska',
            post_box: '',

        },
        cartProducts: state.cart.cart
    }
};

export const ContainerCheckout = connect(mapStateToProps, {})(CheckoutForm);

interface mapStateToPropsType {
    initialValues: ProfileFormValueType
    cartProducts: Array<CartType>
}

type ProfileFormValueTypeKeys = Extract<keyof ProfileFormValueType, string>