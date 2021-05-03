import React, {FC} from "react";
import './catalog.scss';
import ProductCard from "../../product-card/product-card";
import {ProductType} from "../../../types/types";
import {AppStateType} from "../../../redux/store";

type PropsType = Array<ProductType>;



const CatalogItemsDesk:FC<Array<ProductType>> = ({}) => {

    return  <div className='home-catalog__items'>

        {/*{map(el => <ProductCard key={el.id} {...props}/>)}*/}

        {/*<ProductCard/>*/}
        {/*<ProductCard/>*/}
        {/*<ProductCard/>*/}
        {/*<ProductCard/>*/}
        {/*<ProductCard/>*/}
        {/*<ProductCard/>*/}
        {/*<ProductCard/>*/}
        {/*<ProductCard/>*/}
    </div>
};
export default CatalogItemsDesk;