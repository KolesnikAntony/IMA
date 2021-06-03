import React, {useCallback, useEffect, useState} from 'react';
import './App.scss';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Header from "./componetns/header/header";
import {Provider, useDispatch, useSelector} from "react-redux";
import store, {RootState} from "./redux/store";
import ProductScreen from "./pages/product/product";
import Aside from "./componetns/aside/aside";
import Home from './pages/home/home';
import Footer from "./componetns/footer/footer";
import Shop from './pages/shop/shop';
import {OpenCartContext} from './context/context';
import {checkCartItems} from "./redux/cart-reducer";
import {ContainerCheckout} from "./pages/checkout/checkout";
import {getIsAuth} from './redux/auth-reducer';
import Regulamin from './pages/regulamin/regulamin';
import Refund from './pages/refund/refund';
import Payment from "./pages/payment/payment";
import Rodo from "./pages/rodo/rodo";
import Faq from "./pages/faq/faq";
import AboutUs from "./pages/aboutus/aboutus";
import ScrollToTop from "./componetns/scroll-op/scroll-top";

function AppMain() {
    const [open, setOpen] = useState(false);
    const [currentView, setCurrentView] = useState(null);
    const isAuth = useSelector<RootState>(state => state.auth.isAuth);
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
                        <Route exact path='/' component={Home}/>
                        <Route path='/activate/:key?' render={() => <Home isNewMember={true} onClose={handleClose}/>}/>
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
}

const App = () => {
    return <BrowserRouter>
    <Provider store={store}>
    <AppMain/>
    </Provider>
    </BrowserRouter>
};
export default App;

function getNewProducts(): any {
    throw new Error('Function not implemented.');
}

