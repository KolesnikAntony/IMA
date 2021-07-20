import React, {FC, useCallback, useEffect, useState} from 'react'
import './bought.scss'
import {Redirect, useHistory } from "react-router-dom";
import BackAside from "../back-aside/back-aside";
import {useDisableBodyScroll} from "../../hooks/hooks";
import { CustomerType } from '../../types/types';
import {OrderAPI} from "../../api/api-order";

interface PropsType {

}

const BuyError:FC<PropsType> = () => {
    const history = useHistory();
    const [showBackAside, setShowBackAside] = useState(true);

    useEffect(() => {
        delete localStorage.orderData;
    }, []);

    useDisableBodyScroll(showBackAside);

    const closeNewMemberPopup = useCallback(() => {
        history.push('/');
        setShowBackAside(false);
    }, [showBackAside]);


    return <>
            <div className="new-member">
                <button onClick={closeNewMemberPopup} className="new-member__close"/>
                <h2 className="new-member__title">Ooops!</h2>
                <p className='new-member__text'>Wystąpił jakiś błąd</p>
            </div>
            <BackAside open={showBackAside} onClose={closeNewMemberPopup}/></>

};

export default BuyError;