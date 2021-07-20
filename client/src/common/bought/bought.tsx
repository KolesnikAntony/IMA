import React, {FC, useCallback, useEffect, useState} from 'react'
import {Redirect, RouteComponentProps, useHistory, withRouter} from "react-router-dom";
import BackAside from "../back-aside/back-aside";
import {CustomerType} from '../../types/types';
import {OrderAPI} from "../../api/api-order";
import {checkCartItems} from "../../redux/cart-reducer";
import {useDispatch} from "react-redux";


type PathParamsType = {
    fail: string
}

type PropsType = RouteComponentProps<PathParamsType>

const Bought:FC<PropsType> = ({match, location}) => {
    const history = useHistory();
    const [showBackAside, setShowBackAside] = useState(true);
    const [customerData, setCustomerData ] = useState({} as CustomerType);
    const [status, setStatus] = useState('');

    const dispatch = useDispatch();


    useEffect(() => {
        const authResult = new URLSearchParams(location.search).get('redirect_status');
        setStatus(authResult as string);
        if(status === 'succeeded') {
            const json = localStorage.getItem('orderData');
            const data = JSON.parse(json as string);
            setCustomerData(data);
            localStorage.removeItem('cartItem');
            localStorage.setItem('cartItem', '');
            dispatch(checkCartItems());
            OrderAPI.orderSuccess(data).then(res => console.log(res));
        }
    }, [status]);


    const closeNewMemberPopup = useCallback(() => {
        history.push('/');
        setShowBackAside(false);
        localStorage.removeItem('orderData');
    }, [showBackAside]);


    return <>
       { customerData === null ? <Redirect to={"/"}/> :  <>
        <div className="new-member">
            <button onClick={closeNewMemberPopup} className="new-member__close"/>
            {status === 'succeeded' ? <>
                <h2 className="new-member__title">Gratulujemy! {customerData.name}</h2>
                <p className='new-member__text'>Szczegóły zakupu wysłane pocztą elektroniczną. Numer zamowienia: <span>{customerData.payId}</span></p>
            </> : <>
                <h2 className="new-member__title">Ooops!</h2>
                <p className='new-member__text'>Wystąpił jakiś błąd</p>
            </> }
        </div>
        <BackAside open={showBackAside} onClose={closeNewMemberPopup}/></>}
    </>
};

export default withRouter(Bought);