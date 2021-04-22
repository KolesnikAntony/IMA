import React, {FC} from 'react';
import './home.scss';
import Home from "./home";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/store";
import { getProducts } from '../../redux/selectors';
import {ProductType} from "../../types/types";


const HomeContainer: FC<MapStateToPropsType> = ({products}) => {
    //@ts-ignore
    return <Home products={products}/>
};

export type MapStateToPropsType = {
    products: Array<ProductType>
}
const mapStateToProps = (state: AppStateType):MapStateToPropsType =>({
    products : getProducts(state)
})

export default  connect(mapStateToProps, {})(HomeContainer) ;