import React, {useCallback, useState} from "react";
import './authorization.scss'
import {LOGIN_TYPES} from "../../../constants/constants";
import {LoginReduxForm} from "./login";
import Registration from "./registration";

export interface LoginValueType {
    login: string
    password: string
}

const Authorization = () => {

    const [showForm, setShowForm] = useState(LOGIN_TYPES.LOGIN);

    const handleShowForm = useCallback((type)=> {
        setShowForm(type);
    }, [showForm]);

    let onSubmit = (formData:LoginValueType)  => {
        let {login, password} = formData;
        console.log(login,password );
    };

    const renderForm = () => {
        if(showForm === LOGIN_TYPES.LOGIN) return <LoginReduxForm onSubmit={onSubmit}/>;
        if(showForm === LOGIN_TYPES.SIGNUP) return <Registration/>
    };

    return <>
        <div className="auth__buttons">
            <button className={`auth__button ${showForm === LOGIN_TYPES.LOGIN ? 'active' : null}`}
                    onClick={()=>handleShowForm(LOGIN_TYPES.LOGIN)}>LogIn</button>
            <button className={`auth__button ${showForm === LOGIN_TYPES.SIGNUP ? 'active' : null}`}
                    onClick={()=>handleShowForm(LOGIN_TYPES.SIGNUP)}>SignUp</button>
        </div>
        {renderForm()}
        </>

};
export default Authorization;