import React, {useCallback, useEffect, useState} from 'react';
import './App.scss';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Header from "./componetns/header/header";
import {Provider, useDispatch, useSelector} from "react-redux";
import store, {RootState} from "./redux/store";
import ProductScreen from "./componetns/product/product";
import Aside from "./componetns/aside/aside";
import Home from './componetns/home/home';
import {getIsAuth} from './redux/auth-reducer';
import Footer from "./componetns/footer/footer";
import Shop from './componetns/shop/shop';
import {OpenCartContext} from './context/context';

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

    return (<>
            <OpenCartContext.Provider value={handleOpen}>
            <Header onOpen={handleOpen}/>
            <main className={'app'}>
                <Aside open={open} view={currentView} onClose={handleClose}/>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/activate/:key?' render={() => <Home isNewMember={true} onClose={handleClose}/>}/>
                    <Route exact path='/product/:id' component={ProductScreen}/>
                    <Route path='/shop' render={() => <Shop/>}/>
                    {/*ProfileEdit*/}
                    {/*About Us*/}
                    {/*Contacts*/}
                    {/*CheckOut*/}
                </Switch>
            </main>
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

