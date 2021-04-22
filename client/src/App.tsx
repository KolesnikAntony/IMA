import React, {useCallback, useState} from 'react';
import './App.scss';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Header from "./componetns/header/header";
import HomeContainer from "./componetns/home/homeContainer";
import {Provider} from "react-redux";
import store from "./redux/store";
import ProductScreen from "./componetns/product-screen/product-screen";
import Aside from "./componetns/aside/aside";


function App() {
    const [open, setOpen] = useState(false)
    const [currentView, setCurrentView] = useState(null);

    const handleOpen = useCallback((type) => {
            setCurrentView(type);
            setOpen(true)
    }, []);
    const handleClose = useCallback(() => setOpen(false), []);

    return (<>
            <BrowserRouter>
                <Provider store={store}>
                    <Header onOpen={handleOpen}/>
                    <main className="app">
                        <Aside open={open} view={currentView} onClose={handleClose}/>
                        <Switch>
                            <Route exact path='/' component={HomeContainer}/>
                            <Route exact path='/product/:id' component={ProductScreen}/>
                            {/*ProfileEdit*/}
                            {/*Catalog*/}
                            {/*About Us*/}
                            {/*Contacts*/}
                            {/*CheckOut*/}
                        </Switch>
                    </main>
                </Provider>
            </BrowserRouter>
        </>
    )
}

export default App;