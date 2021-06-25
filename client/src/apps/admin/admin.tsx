import React, {FC} from 'react';
import './admin.scss'
import {NavLink, Route, RouteComponentProps, Switch, Redirect} from "react-router-dom";
import ProductList from "./admin-components/products-list";
import ProductEdit from "./admin-components/product-edit";
import {ContainerCheckout} from "../../pages/checkout/checkout";
import ProductCreate from "./admin-components/product-create";
import ProductsContainer from "./admin-components/products-container";

type PathParamsType = {
    path: string
}
type PropsType = RouteComponentProps<PathParamsType>

export const AdminApp: FC<PropsType> = ({match}) => {


    return <div className='admin'>
        <div className="container">
            <nav className="admin__sidebar">
                <NavLink to='/admin/products'>Products</NavLink>
                <NavLink to='/Category'>Categories</NavLink>
                <NavLink to='/Contacts'>Contacts</NavLink>
            </nav>
            <div className={'admin__content'}>

                {/*{match.path === '/admin' && <Redirect to='/admin/products'/>}*/}
                <Switch>
                    <Route path='/admin/products' component={ProductsContainer}/>
                </Switch>
            </div>
        </div>
    </div>
};

