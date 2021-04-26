import React, {FC} from "react";
import {Field, WrappedFieldProps} from "redux-form";
import {ValidatorsFieldType} from "../../helpers/validation/validation";
import './form-controls.scss'

const FormControls: FC<WrappedFieldProps> = ({input, meta, ...props}) => {
    let hasError = meta.touched && meta.error;
    return <div className={` ${hasError ? 'form-controls error' : 'form-controls'}`}>
        {props.children}
        <span>{hasError && meta.error}</span>
    </div>
}

export const Input: FC<WrappedFieldProps> = props => {
    let {input, meta, ...restProps} = props;

    return <FormControls {...props}><input {...input} {...restProps} /></FormControls>
}


export function createField<KeyOfName extends string>(component: FC<WrappedFieldProps>,
                                                      name: KeyOfName,
                                                      placeholder: string | null,
                                                      type: string,
                                                      validators: Array<ValidatorsFieldType>
){
    return <Field component={component} name={name} placeholder={placeholder} type={type} validate={validators} />
}