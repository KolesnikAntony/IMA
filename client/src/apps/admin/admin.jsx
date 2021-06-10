import React from 'react';
import './admin.scss'
import {Admin, Resource} from "react-admin";
import ProductList from './admin-components/products-list';
import CategoryList from './admin-components/category-list';
import newProvider  from './admin-provider'
import ProductCreate from "./admin-components/product-create";
import authProvider from './auth-provider';
import CategoryCreate from "./admin-components/category-create";

const AdminApp = () => {

    return <Admin authProvider={authProvider} dataProvider={newProvider} >
        <Resource name='products' list={ProductList} create={ProductCreate} />
        <Resource name='category' list={CategoryList} create={CategoryCreate} />
    </Admin>
};

export default AdminApp;