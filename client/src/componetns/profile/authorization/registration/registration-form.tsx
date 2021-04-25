import React, {FC} from "react";
import '../authorization.scss'
import {createField, Input} from "../../../../common/formControls/form-controls";
import {required} from "../../../../helpers/validation/validation";
import  {reduxForm, InjectedFormProps} from "redux-form";
import {LoginValueType} from "../authorization";


type  LoginFormValueTypeKeys = Extract<keyof LoginValueType, string>

const RegistrationForm:FC<InjectedFormProps<LoginValueType>> = ({handleSubmit, error}) => {
    console.log(error);
    return <form  onSubmit={handleSubmit} className={`auth__form`}>
        {error && <span>{error}</span>}
        {createField<LoginFormValueTypeKeys>(Input, 'login','Login', 'email',[required] )}
        {createField<LoginFormValueTypeKeys>(Input, 'password','Password', 'password',[required] )}
        <button className='auth__content-btn auth__content-btn--login'>Sign Up</button>
    </form>

};

export const RegistrationReduxForm = reduxForm<LoginValueType>({form: 'registration'})(RegistrationForm);