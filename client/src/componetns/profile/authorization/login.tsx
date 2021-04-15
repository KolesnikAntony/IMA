import React, {FC} from "react";
import './authorization.scss'
import {createField, Input} from "../../../common/formControls/form-controls";
import {required} from "../../../helpers/validation/validation";
import  {reduxForm, InjectedFormProps} from "redux-form";
import {LoginValueType} from "./authorization";


type  LoginFormValueTypeKeys = Extract<keyof LoginValueType, string>
interface LoginOwnProps {
    onSubmit:() => void;
}

const LoginForm:FC<InjectedFormProps<LoginValueType>> = ({handleSubmit}) => {
    return <form  onSubmit={handleSubmit} className={`test login`}>
        {createField<LoginFormValueTypeKeys>(Input, 'login','LoginForm', 'email',[required] )}
        {createField<LoginFormValueTypeKeys>(Input, 'password','Password', 'password',[required] )}
    </form>

};

export const LoginReduxForm = reduxForm<LoginValueType>({form: 'login'})(LoginForm);