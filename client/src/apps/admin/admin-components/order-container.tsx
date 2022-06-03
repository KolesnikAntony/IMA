import React, {FC, useCallback, useState} from 'react';
import ProductList from "./products-list";
import ProductCreate from "./product-create";
import ProductEdit from "./product-edit";
import OrderList from "./order-list";


export interface PropsTypeAdminProducts {
    setTitle: (title: string) => void
}

const OrderContainer:FC<PropsTypeAdminProducts> = ({setTitle}) => {


    const [mode, setMode] = useState('list');
    const [orderId, setOrderId] = useState('');

    const handleMode = useCallback((type: string) => {
        if (type === 'list') {
            return <OrderList setMode={setMode} setTitle={setTitle} setOrderId={setOrderId}/>
        } else if (type === 'show') {
            return <div>Test</div>
        }
    }, [mode]);

    return (<>
            {handleMode(mode)}
        </>
    );
};

export default OrderContainer;