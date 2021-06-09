import React from 'react';
import './admin.scss'
import {Admin, Resource} from "react-admin";
import ProductList from './admin-components/products-list';
import newProvider  from './admin-provider'
import authProvider from './auth-provider';
import ProductCreate from "./admin-components/product-create";

const AdminApp = () => {

    return <Admin dataProvider={newProvider} authProvider={authProvider}>
        <Resource name='products' list={ProductList} create={ProductCreate} />
    </Admin>
};

export default AdminApp;