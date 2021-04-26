import React, {useCallback, useEffect, useState} from 'react';
import './App.scss';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Header from "./componetns/header/header";
import {Provider, useDispatch, useSelector} from "react-redux";
import store, {RootState} from "./redux/store";
import ProductScreen from "./componetns/product-screen/product-screen";
import Aside from "./componetns/aside/aside";
import Home from './componetns/home/home';
import BackAside from "./common/back-aside/back-aside";
import {getIsAuth} from './redux/auth-reducer';


function AppMain() {
    const [open, setOpen] = useState(false);
    const [currentView, setCurrentView] = useState(null);
    const isAuth = useSelector<RootState>(state => state.auth.isAuth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [open]);

    useEffect(() => {
        dispatch(getIsAuth());
        console.log('is auth effect')
    }, [isAuth]);

    const handleOpen = useCallback((type) => {
        setCurrentView(type);
        setOpen(true)
    }, []);

    const handleClose = useCallback(() => setOpen(false), []);
    return (<>
            <Header onOpen={handleOpen}/>
            <main className={'app'}>
                <Aside open={open} view={currentView} onClose={handleClose}/>
                <BackAside open={open} onClose={handleClose}/>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/activate/:key?' render={() => <Home isNewMember={true}/>}/>
                    <Route exact path='/product/:id' component={ProductScreen}/>
                    {/*ProfileEdit*/}
                    {/*Catalog*/}
                    {/*About Us*/}
                    {/*Contacts*/}
                    {/*CheckOut*/}
                </Switch>
            </main>
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
