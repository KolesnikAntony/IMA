import React, {FC} from 'react';
import './admin.scss'
import {NavLink, Route, RouteComponentProps, Switch} from "react-router-dom";
import ProductList from "./admin-components/products-list";
import ProductEdit from "./admin-components/product-edit";
import {ContainerCheckout} from "../../pages/checkout/checkout";

type PathParamsType = {
    path: string
}
type PropsType = RouteComponentProps<PathParamsType>

export const AdminApp: FC<PropsType> = ({match}) => {


    return <div className='admin'>
        <div className="container">
            <nav className="admin__sidebar">
                <NavLink to='/products'>Products</NavLink>
                <NavLink to='/Category'>Categories</NavLink>
                <NavLink to='/Contacts'>Contacts</NavLink>
            </nav>
            <div className={'admin__content'}>
                <Switch>
                    <Route exact path={match.path} component={ProductList}/>
                    <Route exact path='/admin/product/:id' component={ProductEdit}/>
                </Switch>
            </div>
        </div>
    </div>
};

