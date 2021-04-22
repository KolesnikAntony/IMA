import React from "react";
import '../authorization.scss'
import {LoginReduxForm} from "../login/login-form";
import SocialAuth from "../social-auth";
import {LoginValueType} from "../authorization";
import {RegistrationReduxForm} from "./registration-form";


const Registration = () => {
    let onSubmit = (formData: LoginValueType) => {
        let {login, password} = formData;
        console.log(login, password);
    };

    return <>
        <div className='auth__content'>
            <RegistrationReduxForm onSubmit={onSubmit}/>
        </div>
        <SocialAuth title="Sign Up"/>
    </>

};

export default Registration;