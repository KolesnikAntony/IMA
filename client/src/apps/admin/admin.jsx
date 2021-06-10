import React from 'react';
import './admin.scss'
import {Admin, Resource} from "react-admin";
import ProductList from './admin-components/products-list';
import newProvider  from './admin-provider'
import ProductCreate from "./admin-components/product-create";
import authProvider from './auth-provider';

const AdminApp = () => {

    return <Admin authProvider={authProvider} dataProvider={newProvider} >
        <Resource name='products' list={ProductList} create={ProductCreate} />
    </Admin>
};

export default AdminApp;