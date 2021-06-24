import React from 'react';
import './admin.scss'
import {Admin, Resource, ShowGuesser, MenuItemLink} from "react-admin";
import ProductList from './admin-components/products-list';
import CategoryList from './admin-components/category-list';
import newProvider  from './admin-provider'
import ProductCreate from "./admin-components/product-create";
import authProvider from './auth-provider';
import CategoryCreate from "./admin-components/category-create";
import ProductEdit from "./admin-components/product-edit";
import Menu from "./admin-components/admin-menu";
import customRoutes from "./admin-components/custom-routers";

const AdminApp = () => {

    return <Admin customRoutes={customRoutes} menu={Menu} authProvider={authProvider} dataProvider={newProvider} >
        <Resource name='Products' list={ProductList} create={ProductCreate} edit={ProductEdit}/>
        <Resource name='Category' list={CategoryList} create={CategoryCreate} />
    </Admin>
};

export default AdminApp;