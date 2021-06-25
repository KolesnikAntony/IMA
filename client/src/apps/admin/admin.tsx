import React, {FC} from 'react';
import './admin.scss'
import {NavLink, Route, RouteComponentProps, Switch} from "react-router-dom";
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

