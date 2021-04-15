import React from "react";
import '../authorization.scss'
import {LoginReduxForm} from "./login-form";
import {Link} from "react-router-dom";

export interface LoginValueType {
    login: string
    password: string
}

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

        <div className="auth__social">
            <h3 className="auth__social-title">
                Login with social
            </h3>
            <div className="auth__social-links">
                <Link to='' className="auth__social-link">Google</Link>
                <Link to='' className="auth__social-link">FaceBook</Link>
                <Link to='' className="auth__social-link">Apple</Link>
            </div>
        </div>
    </>

};

export default Login;