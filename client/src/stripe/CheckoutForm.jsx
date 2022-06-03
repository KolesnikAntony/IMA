import React, {useEffect, useMemo, useState} from "react";
import {P24BankElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import './checkout.scss'

export default function CheckoutForm() {
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState('');
    const [payId, setPayId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const products = useSelector((state) => state.cart.cart);
    const productsClasses = useMemo(() => products.length <= 3 ? 'checkout__products' : 'checkout__products scroll', [products] );

    const [delivery, setDelivery] = useState('paczkomat');
    const [customerType, setCustomerType] = useState('indywidualny');
    const [checkPolicy, setCheckPolicy] = useState(false);
    const [addressMatch, setAddressMatch] = useState(true);

    const [totalPrice, setTotalPrice] = useState(0);
    const [custProducts, setCustProducts] = useState(products);

    useEffect(() => {
        let total = 0;
        let delPrice = delivery === 'paczkomat' ? 10.99 :  12.99;
        products.forEach(item => total += item.qty * item.price);
        setTotalPrice(total !== 0 ? total + delPrice : 0);
        setCustProducts(products);
    }, [products, delivery]);

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        let amount = totalPrice;
       products.length && amount !== 0 &&  window
            .fetch("/api/stripePay", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({amount})
            })
            .then(res => {
                return res.json();
            })
            .then(data => {
                setClientSecret(data.clientSecret);
                setPayId(data.pay_id);
            });
    }, [products,totalPrice]);


    const P24_ELEMENT_OPTIONS = {
        // Custom styling can be passed to options when creating an Element
        style: {
            base: {
                padding: '8px',
                color: '#3B3F45',
                fontSize: '16px',
                '::placeholder': {
                    color: '#3B3F45'
                },
                 borderBottom: "1px solid #D9C3B6",
            },
        },
    };

    function P24BankSection() {
        return (
            <label style={{width: "100%"}}>
                <P24BankElement options={P24_ELEMENT_OPTIONS} empty={false} onChange={
                    () =>  setDisabled(false)
                } />
            </label>
        );
    };

    const handleSubmit = async ev => {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        const user = {};
        for (let entry of formData.entries()) {
            user[entry[0]] = entry[1]
        }
        const {policy, ...data} = user;

        localStorage.setItem('orderData', JSON.stringify({...data, payId, amount: totalPrice, products: custProducts.map(el=> ({ title: el.title, price: el.price, qty: el.qty, id: el.id}))}));

        const payload = await stripe.confirmP24Payment(clientSecret, {
            payment_method: {
                p24: elements.getElement(P24BankElement),
                billing_details: {
                    email: user.email,
                    "address": {
                        "city": user.city,
                        "postal_code": user.kod,
                    },
                    "name": user.name + ' ' + user.surname,
                    "phone": user.phone,
                },

            },
            payment_method_options: {
                p24: {
                    tos_shown_and_accepted: true,
                }
            },
            return_url: 'http://localhost:3000/bought',
        });

        if (payload.error) {
            setError(`Payment failed ${payload.error.message}`);
            setProcessing(false);
        } else {
            setError(null);
            setProcessing(false);
            setSucceeded(true);
        }
    };
    const banks =  useMemo(() => {
        return <P24BankSection/>
    }, []);


    return (
        <section className="checkout">
            <div className="container">
                <form className="checkout__form" id="payment-form" onSubmit={handleSubmit}>
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
                                            <input type="text" name='name' placeholder='Imię' required={true}/>
                                        </div>
                                        <div className="checkout__item-wrap">
                                            <span className="checkout__item-caption">Nazwisko <span>*</span></span>
                                            <input type="text" name='surname' placeholder='Nazwisko' required={true}/>
                                        </div>
                                    </div>
                                </li>
                                <li className="checkout__item">
                                    <span className="checkout__item-caption">Kraj / region <span>*</span></span>
                                    <input type="text" name='country' placeholder='Kraj / region' required={true}/>
                                </li>
                                <li className="checkout__item">
                                    <div className="checkout__item-line">
                                        <span className="checkout__item-caption">Ulica <span>*</span></span>
                                        <input type="text" name='street' placeholder='Ulican' required={true}/>
                                    </div>
                                    <div className="checkout__item-separator">
                                        <div className="checkout__item-wrap">
                                            <span className="checkout__item-caption">Budynek <span>*</span></span>
                                            <input type="text" name='build' placeholder='Budynek' required={true}/>
                                        </div>
                                        <div className="checkout__item-wrap">
                                            <span className="checkout__item-caption">Mieszkanie</span>
                                            <input type="text" name='flat' placeholder='Mieszkanie' required={false}/>
                                        </div>
                                    </div>
                                </li>
                                <li className="checkout__item">
                                    <div className="checkout__item-separator">
                                        <div className="checkout__item-wrap">
                                            <span className="checkout__item-caption">Miasto <span>*</span></span>
                                            <input type="text" name='city' placeholder='Miasto' required={true}/>
                                        </div>
                                        <div className="checkout__item-wrap">
                                            <span className="checkout__item-caption">Kod pocztowy<span>*</span></span>
                                            <input type="text" name='kod' placeholder='Kod pocztowy' required={true}/>
                                        </div>
                                    </div>
                                </li>
                                <li className="checkout__item">
                                    <span className="checkout__item-caption">Telefon<span>*</span></span>
                                    <input type="text" name='phone' placeholder='Telefon' required={true}/>
                                </li>
                                <li className="checkout__item">
                                    <span className="checkout__item-caption">Email <span>*</span></span>
                                    <input type="text" name='email' placeholder='Email' required={true}/>
                                </li>
                                <li className="checkout__item column">
                                    <h5 className="checkout__payments-title not">
                                        Jesteś osobą:
                                    </h5>
                                    <div className="checkout__delivery checkout__factura">
                                        <label htmlFor='indywidualny' className='checkout__delivery-label'>
                                            <input type='radio' name="customerType" value='indywidualny'
                                                   id='indywidualny' checked={customerType === 'indywidualny'}
                                                   onClick={() => setCustomerType('indywidualny')}/>
                                            <span className="checkout__delivery-checkmark"/>
                                            <span className='checkout__delivery-text'>
                                            Indywidualną
                                        </span>
                                        </label>
                                        <label htmlFor='prawny' className='checkout__delivery-label'>
                                            <input type='radio' name="customerType"
                                                   value='prawny' id='prawny' checked={customerType === 'prawny'}
                                                   onClick={() => setCustomerType('prawny')}/>
                                            <span className="checkout__delivery-checkmark"/>
                                            <span className='checkout__delivery-text'>
                                            Prawną
                                        </span>
                                        </label>
                                    </div>
                                </li>
                                {customerType === 'prawny' && <>
                                    <li className="checkout__item">
                                        <span className="checkout__item-caption">Nazwa firmy<span>*</span></span>
                                        <input type="text" name='company' required={true} placeholder='Nazwa firmy'/>
                                    </li>
                                    <li className="checkout__item">
                                        <span className="checkout__item-caption">NIP<span>*</span></span>
                                        <input type="text" name='nip' required={true} placeholder='NIP'/>
                                    </li>
                                   <li className='checkout__delivery'>
                                       <h5 className="checkout__payments-title not">
                                           Adres korespondencyjny:
                                       </h5>
                                       <label htmlFor='address' className='checkout__delivery-label'>
                                           <input type='checkbox' name="addressFirm"
                                                  id='address' checked={addressMatch}
                                                  onClick={() => setAddressMatch(!addressMatch)}/>
                                           <span className="checkout__delivery-checkmark"/>
                                           <span className='checkout__delivery-text'>
                                               taki sam jak adres dostawy
                                        </span>
                                       </label>
                                   </li>
                                    {
                                        !addressMatch && <>
                                            <li className="checkout__item">
                                                <div className="checkout__item-separator">
                                                    <div className="checkout__item-wrap">
                                                        <span className="checkout__item-caption">Miasto <span>*</span></span>
                                                        <input type="text" name='cityFirm' placeholder='Miasto' required={true}/>
                                                    </div>
                                                    <div className="checkout__item-wrap">
                                                        <span className="checkout__item-caption">Kod pocztowy<span>*</span></span>
                                                        <input type="text" name='kodFirm' placeholder='Kod pocztowy' required={true}/>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="checkout__item">
                                                <div className="checkout__item-line">
                                                    <span className="checkout__item-caption">Ulica <span>*</span></span>
                                                    <input type="text" name='streetFirm' placeholder='Ulica' required={true}/>
                                                </div>
                                                <div className="checkout__item-separator">
                                                    <div className="checkout__item-wrap">
                                                        <span className="checkout__item-caption">Budynek <span>*</span></span>
                                                        <input type="text" name='buildFirm' placeholder='Budynek' required={true}/>
                                                    </div>
                                                    <div className="checkout__item-wrap">
                                                        <span className="checkout__item-caption">Mieszkanie</span>
                                                        <input type="text" name='flatFirm' placeholder='Mieszkanie' required={false}/>
                                                    </div>
                                                </div>
                                            </li>

                                        </>
                                    }
                                </>}
                            </ul>
                            {/*<label htmlFor='faktura' className='checkout__delivery-label'/>*/}
                            {/*    <input type='radio' name="faktura"  id="fakturaa"/>*/}
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
                                            <li className="checkout__products-item" key={item.title}>
                                                <div className="checkout__products-name">
                                            <span className="checkout__products-title">
                                                {item.title}
                                            </span>
                                                    <span className="checkout__products-qry"> × {item.qty}</span>
                                                </div>
                                                <span
                                                    className="checkout__products-price">zł{item.qty * item.price}</span>
                                            </li>)}
                                    </ul>
                                </li>
                                <li className="checkout__payments-item column">
                                    <h5 className="checkout__payments-title not">
                                        WYSYŁKA
                                    </h5>
                                    <div className="checkout__delivery">
                                        <label htmlFor='paczkomat' className='checkout__delivery-label'>
                                            <input type='radio' name="delivery" value='paczkomat'
                                                   id='paczkomat' checked={delivery === 'paczkomat'}
                                                   onClick={() => setDelivery('paczkomat')}/>
                                            <span className="checkout__delivery-checkmark"/>
                                            <span className='checkout__delivery-text'>
                                            InPost paczkomat (prosimy o podanie adresu paczkomatu):
                                            <span className='checkout__delivery-price'>zł10.99</span>
                                        </span>
                                        </label>
                                        {delivery === 'paczkomat' &&
                                        <textarea name="post_box" placeholder={'Prosimy o podanie adresu paczkomatu'}
                                                  required={true}/>}
                                        <label htmlFor='kurier' className='checkout__delivery-label'>
                                            <input type='radio' name="delivery"
                                                   value='kurier' id='kurier' checked={delivery === 'kurier'}
                                                   onClick={() => setDelivery('kurier')}/>
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
                                <li className="checkout__payments-item checkout__total">
                                    {banks}
                                </li>
                            </ul>
                            <div className="checkout__policy">
                                <p className="checkout__policy-info">
                                    Twoje dane osobowe będą wykorzystywane w celu realizacji Twojego zamówienia,
                                    wsparcia Twojego doświadczenia na tej stronie oraz do innych celów opisanych w
                                    naszej <Link to='/'>polityce prywatności</Link>.
                                </p>
                                <p className="checkout__policy-info checkout__delivery">
                                    <input type="checkbox" name='policy' value='true' required={true}
                                           checked={checkPolicy} onChange={() => setCheckPolicy(!checkPolicy)}/>
                                    <span className="checkout__delivery-checkmark"/>
                                    <span>Przeczytałem/am i akceptuję <Link to='/'>regulamin *</Link></span>
                                </p>
                            </div>
                            <button className="checkout__submit" disabled={!checkPolicy || disabled || processing}>KUPUJĘ I PŁACĘ</button>
                        </div>
                    </div>
                    {error && (
                        <div className="card-error" role="alert">
                            {error}
                        </div>
                    )}
                </form>
            </div>
        </section>

    );
}
