import React, {FC, useCallback, useEffect, useState} from "react";
import {Provider, useDispatch} from "react-redux";
import store from "../../redux/store";
import {checkCartItems} from "../../redux/cart-reducer";
import {getIsAuth} from "../../redux/auth-reducer";
import {OpenCartContext} from "../../context/context";
import Header from "../../componetns/header/header";
import ScrollToTop from "../../componetns/scroll-op/scroll-top";
import Aside from "../../componetns/aside/aside";
import {Route, RouteComponentProps, Switch} from "react-router-dom";
import Home from "../../pages/home/home";
import ProductScreen from "../../pages/product/product";
import Shop from "../../pages/shop/shop";
import AboutUs from "../../pages/aboutus/aboutus";
import Regulamin from "../../pages/regulamin/regulamin";
import Rodo from "../../pages/rodo/rodo";
import Faq from "../../pages/faq/faq";
import Payment from "../../pages/payment/payment";
import Refund from "../../pages/refund/refund";
import {ContainerCheckout} from "../../pages/checkout/checkout";
import Footer from "../../componetns/footer/footer";


type PathParamsType = {
    path: string
}

type PropsType = RouteComponentProps<PathParamsType>


const ClientApp: FC<PropsType> = ({match}) => {
    const [open, setOpen] = useState(false);
    const [currentView, setCurrentView] = useState(null);
    const dispatch = useDispatch();

    const handleOpen = useCallback((type) => {
        setCurrentView(type);
        setOpen(true)
    }, []);

    const handleClose = useCallback(() => setOpen(false), []);

    useEffect(() => {
        dispatch(checkCartItems());
        dispatch(getIsAuth());
    }, []);


    return (<>
            <OpenCartContext.Provider value={handleOpen}>
                <Header onOpen={handleOpen}/>
                <ScrollToTop>
                    <main className={'app'}>
                        <Aside open={open} view={currentView} onClose={handleClose} onOpen={handleOpen}/>
                        <Switch>
                            <Route exact path={match.path} component={Home}/>
                            <Route path='/activate/:key?'
                                   render={() => <Home isNewMember={true} onClose={handleClose}/>}/>
                            <Route exact path='/product/:id' component={ProductScreen}/>
                            <Route path='/shop' render={() => <Shop/>}/>
                            <Route path='/about-us' render={() => <AboutUs/>}/>
                            <Route path='/terms-and-conditions' render={() => <Regulamin/>}/>
                            <Route path='/rodo' render={() => <Rodo/>}/>
                            <Route path='/faq' render={() => <Faq/>}/>
                            <Route path='/shopping-and-payment' render={() => <Payment/>}/>
                            <Route path='/refund-policy' render={() => <Refund/>}/>
                            {/*@ts-ignore*/}
                            <Route path='/checkout' render={() => <ContainerCheckout/>}/>
                        </Switch>
                    </main>
                </ScrollToTop>
                <Footer onOpen={handleOpen}/>
            </OpenCartContext.Provider>
        </>
    )
};

export default ClientApp;