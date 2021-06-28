import React, {FC, useCallback, useState} from 'react';
import ProductList from "./products-list";
import ProductCreate from "./product-create";
import ProductEdit from "./product-edit";


export interface PropsTypeAdminProducts {
    setTitle: (title: string) => void
}

const ProductContainer:FC<PropsTypeAdminProducts> = ({setTitle}) => {


    const [mode, setMode] = useState('list');
    const [productId, setProductId] = useState('');

    const handleMode = useCallback((type: string) => {
        if (type === 'list') {
            return <ProductList setMode={setMode} setTitle={setTitle} setProductId={setProductId}/>
        } else if (type === 'edit') {
            return <ProductEdit setMode={setMode} setTitle={setTitle} productId={productId}/>
        } else if (type === 'create') {
            return <ProductCreate setTitle={setTitle} setMode={setMode}/>
        }
    }, [mode]);

    return (<>
            {handleMode(mode)}
        </>
    );
};

export default ProductContainer;