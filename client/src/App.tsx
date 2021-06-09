import React from 'react';
import './App.scss';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import AdminApp from "./apps/admin/admin";
import ClientApp from './apps/client-app/client-app';
import store from "./redux/store";
import {Provider} from "react-redux";


const App = () => {
    return <BrowserRouter>
            <Switch>
                <Route path={'/admin'} component={AdminApp}/>
                <React.StrictMode>
                <Provider store={store}>
                <Route path={'/'} component={ClientApp}/>
                </Provider>
                </React.StrictMode>
            </Switch>
    </BrowserRouter>
};
export default App;


