import React, {FC} from "react";
import './catalog.scss';
import {ProductType} from "../../../types/types";
import ProductCard from "../../product-card/product-card";

type PropsType = {
    products: Array<ProductType>
}

const CatalogItemsDesk: FC<PropsType> = ({products}) => {
    return <div className='home-catalog__items'>
        {products.slice(0, 8).map(el =><ProductCard key={el.id} {...el}/>)}
    </div>
};
export default CatalogItemsDesk;