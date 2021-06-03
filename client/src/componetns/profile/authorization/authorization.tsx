import React, {useCallback, useState} from "react";
import './authorization.scss'
import {LOGIN_TYPES} from "../../../constants/constants";
import Login from "./login/login";
import Registration from "./registration/registration";


const Authorization = () => {

    const [showForm, setShowForm] = useState(LOGIN_TYPES.LOGIN);

    const handleShowForm = useCallback((type)=> {
        setShowForm(type);
    }, [showForm]);


    const renderForm = () => {
        if(showForm === LOGIN_TYPES.LOGIN) return <Login />;
        if(showForm === LOGIN_TYPES.SIGNUP) return <Registration/>
    };

    return <>
        <div className="auth__buttons">
            <button className={`auth__button ${showForm === LOGIN_TYPES.LOGIN ? 'active' : null}`}
                    onClick={()=>handleShowForm(LOGIN_TYPES.LOGIN)}>Zaloguj się</button>
            <button className={`auth__button ${showForm === LOGIN_TYPES.SIGNUP ? 'active' : null}`}
                    onClick={()=>handleShowForm(LOGIN_TYPES.SIGNUP)}>Zalóż konto</button>
        </div>
        {renderForm()}
        </>

};
export default Authorization;

export interface LoginValueType {
    email: string
    password: string
}