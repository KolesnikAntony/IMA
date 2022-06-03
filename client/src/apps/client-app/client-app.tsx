import React, {FC, Suspense, useCallback, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {checkCartItems} from "../../redux/cart-reducer";
import {getIsAuth} from "../../redux/auth-reducer";
import {OpenCartContext} from "../../context/context";
import ScrollToTop from "../../componetns/scroll-op/scroll-top";
import Aside from "../../componetns/aside/aside";
import {NavLink, Route, RouteComponentProps, Switch} from "react-router-dom";
import Payment from "../../pages/payment/payment";
import {getContacts} from "../../redux/contacts-reducer";
import {getHomeBannerText} from "../../redux/home-reducer";
import CookieConsent from "react-cookie-consent";
import TestCheck from "../../componetns/checkText";
import {loadStripe} from "@stripe/stripe-js";
import Stripe from "../../stripe/stripe";
import Preloader from "../../common/preloader/preloader";
import Header from "../../componetns/header/header";
import Footer from "../../componetns/footer/footer";

const Home = React.lazy(() => import('../../pages/home/home'));
const ProductScreen = React.lazy(() => import('../../pages/product/product'));
const Shop = React.lazy(() => import('../../pages/shop/shop'));
const AboutUs = React.lazy(() => import('../../pages/aboutus/aboutus'));
const Regulamin = React.lazy(() => import('../../pages/regulamin/regulamin'));
const Rodo = React.lazy(() => import('../../pages/rodo/rodo'));
const Faq = React.lazy(() => import('../../pages/faq/faq'));
const Refund = React.lazy(() => import('../../pages/refund/refund'));


type PathParamsType = {
    path: string
}

type PropsType = RouteComponentProps<PathParamsType>


const ClientApp: FC<PropsType> = ({match}) => {
    const [open, setOpen] = useState(false);
    const [currentView, setCurrentView] = useState(null);
    const [headerType, setHeaderType] = useState(false);
    const dispatch = useDispatch();

    const promise = loadStripe("pk_test_bxUFP5az29DxXByl6hAxqbZt00u3JlrxbW");

    const handleOpen = useCallback((type) => {
        setCurrentView(type);
        setOpen(true)
    }, []);


    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    const handleHeaderType = useCallback((view: boolean) => {
        setHeaderType(view);
    }, []);

    useEffect(() => {
        dispatch(checkCartItems());
        dispatch(getIsAuth());
        dispatch(getContacts());
        dispatch(getHomeBannerText());
    }, []);


    const handleCheckout = (formData: any) => {
        console.log(formData)
    };

    return (<>
            <OpenCartContext.Provider value={handleOpen}>
                <Suspense fallback={<Preloader/>}>
                    {headerType ? <Header onOpen={handleOpen} classes={'header home'}/>
                        : <Header onOpen={handleOpen} classes={'header'}/>
                    }
                    <ScrollToTop>
                        <main className={'app'}>
                            <Aside open={open} view={currentView} onClose={handleClose} onOpen={handleOpen}/>
                            <Switch>
                                <Route exact path={match.path} render={() => <Home onViewHeader={handleHeaderType}/>}/>
                                <Route path='/activate/:key?'
                                       render={() => <Home isNewMember={true} onClose={handleClose}
                                                           onViewHeader={handleHeaderType}/>}/>
                                <Route exact path='/product/:id' component={ProductScreen}/>
                                <Route path='/shop' render={() => <Shop/>}/>
                                <Route path='/about-us' render={() => <AboutUs/>}/>
                                <Route path='/terms-and-conditions' render={() => <Regulamin/>}/>
                                <Route path='/rodo' render={() => <Rodo/>}/>
                                <Route path='/faq' render={() => <Faq/>}/>
                                <Route path='/shopping-and-payment' render={() => <Payment/>}/>
                                <Route path='/refund-policy' render={() => <Refund/>}/>
                                {/*@ts-ignore*/}
                                <Route path='/checkout' render={() => <Stripe/>}/>
                                <Route path='/cte' render={() => <TestCheck/>}/>
                                <Route exact path='/bought' render={() => <Home isBought={true} onClose={handleClose}
                                                                                onViewHeader={handleHeaderType}/>}/>
                            </Switch>
                        </main>
                    </ScrollToTop>
                    <Footer onOpen={handleOpen}/>
                </Suspense>
            </OpenCartContext.Provider>
            <CookieConsent buttonText="Zgoda!" buttonStyle={{background: 'red', color: 'white', fontWeight: 'bold'}}
            >Klauzula informacyjna RODO w zakresie przetwarzania danych osobowych. Możesz zobaczyć tutaj: <NavLink
                to='/rodo' className='cookies__link'>ima-professional.pl/rodo</NavLink></CookieConsent>
        </>
    )
};

export default ClientApp;