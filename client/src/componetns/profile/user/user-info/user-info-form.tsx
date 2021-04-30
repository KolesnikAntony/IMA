import React, {FC} from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../../../../common/formControls/form-controls";
import {required} from "../../../../helpers/validation/validation";
import {UserInfoPropsType} from "../../../../types/types";
import {connect} from "react-redux";
import {AppStateType} from "../../../../redux/store";


const UserInfoForm: FC<InjectedFormProps<UserInfoFormValueType, UserInfoPropsType> & UserInfoPropsType> = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit} className="user__form--info">
            <ul className="user__info">
                <button className="user__change--info user__change user__change--done"/>

                <li className="user__info-item--field user__info-item">
                    <span className="user__info-caption">Email: </span>
                    {createField<UserFormValueTypeKeys>(Input, 'email', 'Email', 'text', [])}
                </li>
                <li className="user__info-item--field user__info-item">
                    <span className="user__info-caption">Phone: </span>
                    {createField<UserFormValueTypeKeys>(Input, 'phone', 'Phone', 'text', [])}
                </li>
                <li className="user__info-item--field user__info-item">
                    <span className="user__info-caption">City: </span>
                    {createField<UserFormValueTypeKeys>(Input, 'city', 'City', 'text', [])}
                </li>
                <li className="user__info-item--field user__info-item">
                    <span className="user__info-caption">Address: </span>
                    {createField<UserFormValueTypeKeys>(Input, 'street', 'Address', 'text', [])}
                </li>
                <li className="user__info-item--field user__info-item">
                    <span className="user__info-caption">Build: </span>
                    {createField<UserFormValueTypeKeys>(Input, 'build', 'Build', 'text', [])}
                </li>
                <li className="user__info-item--field user__info-item">
                    <span className="user__info-caption">Flat: </span>
                    {createField<UserFormValueTypeKeys>(Input, 'flat', 'Flat', 'text', [])}
                </li>
                <li className="user__info-item--field user__info-item">
                    <span className="user__info-caption">Kod: </span>
                    {createField<UserFormValueTypeKeys>(Input, 'kod', 'Index', 'text', [])}
                </li>
            </ul>
        </form>
    )
}

const UserInfoReduxForm = reduxForm<UserInfoFormValueType, UserInfoPropsType>({form: 'user_info'})(UserInfoForm);

const mapStateToProps = (state: AppStateType):mapStateToPropsType  => {
    return {
        initialValues: {
            email: state.user.email,
            phone: state.user.phone,
            street: state.user.address.street,
            build: state.user.address.build,
            flat: state.user.address.flat,
            city: state.user.address.city,
            kod: state.user.address.kod
        }
    }
}
export const ContainerUserInfoForm = connect(mapStateToProps, {})(UserInfoReduxForm);

interface mapStateToPropsType {
    initialValues: {
        email: string
        phone: string
        city: string
        street: string
        flat: string
        build: string
        kod: string
    }
}
export interface UserInfoFormValueType {
    email: string
    phone: string
    city: string
    street: string
    flat: string
    build: string
    kod: string
}

type UserFormValueTypeKeys = Extract<keyof UserInfoFormValueType, string>