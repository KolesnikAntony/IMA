import React from "react";
import '../authorization.scss'
import {LoginReduxForm} from "./login-form";
import SocialAuth from "../social-auth";
import {LoginValueType} from "../authorization";
import {useDispatch} from "react-redux";
import {loginThunk} from "../../../../redux/auth-reducer";

const Login = () => {
    const dispatch = useDispatch();

    let onSubmit = (formData: LoginValueType) => {
        let {email, password} = formData;
        console.log(email, password);
        dispatch(loginThunk(email, password));
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