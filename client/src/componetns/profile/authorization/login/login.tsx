import React from "react";
import '../authorization.scss'
import {LoginReduxForm} from "./login-form";
import SocialAuth from "../social-auth";
import {LoginValueType} from "../authorization";
import {useDispatch} from "react-redux";
import {loginThunk} from "../../../../redux/auth-reducer";

const Login = () => {
    const dispatch = useDispatch();

    const onSubmit = (formData: LoginValueType) => {
        let {email, password} = formData;
        dispatch(loginThunk(email, password));
    };

    return <>
        <div className='auth__content'>
            <LoginReduxForm onSubmit={onSubmit}/>
            <button className='auth__content-btn auth__content-btn--forgot'>Zapomniałeś hasła?</button>
        </div>
        <SocialAuth title="Zaloguj się"/>
    </>

};

export default Login;