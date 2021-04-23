import React from "react";
import '../authorization.scss'
import SocialAuth from "../social-auth";
import {LoginValueType} from "../authorization";
import {RegistrationReduxForm} from "./registration-form";
import {useDispatch} from "react-redux";
import {setToSignUP} from "../../../../redux/auth-reducer";


const Registration = () => {

    const dispatch = useDispatch();

    let onSubmit = (formData: LoginValueType) => {
        let {login, password} = formData;
        dispatch(setToSignUP(login,password))
    };

    return <>
        <div className='auth__content'>
            <RegistrationReduxForm onSubmit={onSubmit}/>
        </div>
        <SocialAuth title="Sign Up"/>
    </>

};

export default Registration;