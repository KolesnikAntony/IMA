import React from 'react';
import './App.scss';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {AdminApp} from "./apps/admin/admin";
import ClientApp from './apps/client-app/client-app';
import store from "./redux/store";
import {Provider} from "react-redux";


const App = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <Switch>
                <Route path={'/admin'} component={AdminApp}/>
                <React.StrictMode>
                <Route path={'/'} component={ClientApp}/>
                </React.StrictMode>
            </Switch>
        </Provider>
    </BrowserRouter>
};
export default App;


