import React, {FC} from "react";
import '../authorization.scss'
import {createField, Input} from "../../../../common/formControls/form-controls";
import {required} from "../../../../helpers/validation/validation";
import  {reduxForm, InjectedFormProps} from "redux-form";
import {LoginValueType} from "../authorization";



type  LoginFormValueTypeKeys = Extract<keyof LoginValueType, string>

const LoginForm:FC<InjectedFormProps<LoginValueType>> = ({handleSubmit, error}) => {
    return <form  onSubmit={handleSubmit} className={`auth__form`}>
        {error && <span>{error}</span>}
        {createField<LoginFormValueTypeKeys>(Input, 'email','Email', 'email',[required])}
        {createField<LoginFormValueTypeKeys>(Input, 'password','Password', 'password',[required] )}
        <button className='auth__content-btn auth__content-btn--login'>Login</button>
    </form>

};

export const LoginReduxForm = reduxForm<LoginValueType>({form: 'login'})(LoginForm);