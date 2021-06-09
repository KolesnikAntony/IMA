import React from 'react';
import './admin.scss'
import {Admin, Resource} from "react-admin";
import restProvider from "ra-data-simple-rest";
import ProductList from './admin-components/products-list';
import newProvider  from './admin-provider'

const AdminApp = () => {
    return <Admin dataProvider={newProvider}>
        <Resource name='products' list={ProductList}  />
    </Admin>
};

export default AdminApp;