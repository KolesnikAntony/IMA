import React, {FC, useEffect} from 'react';
import './authorization.scss'
import logo from './../../../assets/img/logo-for-IMA.png'
import {useDispatch} from "react-redux";
import {actionsAuth} from "../../../redux/auth-reducer";

interface PropsType {
    email: string | null
}

const AuthAccept: FC<PropsType> = ({email}) => {

    return <div className="auth__accept">
        <img src={logo} alt="IMA" className="auth__accept-logo"/>
        <p className="auth__accept-text">
            Na adres  <a href={`mailto:"${email}"`} className='auth__accept-email'>{email}</a> został wysłany e-mail z linkiem do potwierdzenia rejestracji...
        </p>
    </div>
};

export  default AuthAccept;