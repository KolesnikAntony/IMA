import React, {FC, useCallback, useEffect, useState} from 'react'
import './bought.scss'
import {Redirect, useHistory } from "react-router-dom";
import BackAside from "../back-aside/back-aside";
import {useDisableBodyScroll} from "../../hooks/hooks";
import { CustomerType } from '../../types/types';

interface PropsType {

}

const Bought:FC<PropsType> = () => {
    const history = useHistory();
    const [showBackAside, setShowBackAside] = useState(true);
    const [customerData, setCustomerData ] = useState({} as CustomerType);

    useEffect(() => {
        const json = localStorage.getItem('orderData');
        const data = JSON.parse(json as string);
        setCustomerData(data);
        console.log(data);
        delete localStorage.cartItem
    }, []);

    useDisableBodyScroll(showBackAside);

    const closeNewMemberPopup = useCallback(() => {
        history.push('/');
        setShowBackAside(false);
        delete localStorage.orderData;
    }, [showBackAside]);


    return <>
       { customerData === null ? <Redirect to={"/"}/> :  <>
        <div className="new-member">
            <button onClick={closeNewMemberPopup} className="new-member__close"/>
            <h2 className="new-member__title">Gratulujemy! {customerData.name}</h2>
            <p className='new-member__text'>Szczegóły zakupu wysłane pocztą elektroniczną. Numer zamowienia: {customerData.payId}</p>
        </div>
        <BackAside open={showBackAside} onClose={closeNewMemberPopup}/></>}
    </>
};

export default Bought;