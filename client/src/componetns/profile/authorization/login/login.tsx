import React from "react";
import '../authorization.scss'
import {LoginReduxForm} from "./login-form";
import SocialAuth from "../social-auth";
import {LoginValueType} from "../authorization";

const Login = () => {

    let onSubmit = (formData: LoginValueType) => {
        let {login, password} = formData;
        console.log(login, password);
    };

    return <>
        <div className='auth__content'>
            <LoginReduxForm onSubmit={onSubmit}/>
            <button className='auth__content-btn auth__content-btn--forgot'>Forgot password?</button>
        </div>
        <SocialAuth title="Login"/>
    </>

};

export default Login;