import React, {FC} from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../../../../common/formControls/form-controls";
import {ProfileFormValueType, ProfilePropsType} from "../../../../types/types";
import {connect} from "react-redux";
import {AppStateType} from "../../../../redux/store";
import avatar from "../../../../assets/img/avatar.svg";
import {required} from "../../../../helpers/validation/validation";

interface PropsType {

}

const UserInfoForm: FC<InjectedFormProps<ProfileFormValueType,
    ProfilePropsType<PropsType>> & ProfilePropsType<PropsType>> = ({handleSubmit}) => {
    return (
        // @ts-ignore
        <form onSubmit={handleSubmit} className="user__form--info">
            <div className="user__self">
                <h4 className="user__name">
                    <Field component={'input'} name='name' placeholder='Imię' type='text' validate={[required]}
                           autoFocus/>
                    {/*{createField<UserFormValueTypeKeys>(Input, 'name', "Email", 'text',[required], autoFocus )}*/}
                </h4>
            </div>
            <ul className="user__info">
                <button className="user__change--info user__change user__change--done"/>
                <li className="user__info-item--field user__info-item">
                    <span className="user__info-caption">Email: </span>
                    {createField<ProfileFormValueTypeKeys>(Input, 'email', 'Email', 'text', [])}
                </li>
                <li className="user__info-item--field user__info-item">
                    <span className="user__info-caption">Telefon: </span>
                    {createField<ProfileFormValueTypeKeys>(Input, 'phone', 'Telefon', 'text', [])}
                </li>
                <li className="user__info-item--field user__info-item">
                    <span className="user__info-caption">Miasto: </span>
                    {createField<ProfileFormValueTypeKeys>(Input, 'city', 'Miasto', 'text', [])}
                </li>
                <li className="user__info-item--field user__info-item">
                    <span className="user__info-caption">Ulica: </span>
                    {createField<ProfileFormValueTypeKeys>(Input, 'street', 'Ulica', 'text', [])}
                </li>
                <li className="user__info-item--field user__info-item">
                    <span className="user__info-caption">Dom: </span>
                    {createField<ProfileFormValueTypeKeys>(Input, 'build', 'Dom', 'text', [])}
                </li>
                <li className="user__info-item--field user__info-item">
                    <span className="user__info-caption">Mieszkanie: </span>
                    {createField<ProfileFormValueTypeKeys>(Input, 'flat', 'Mieszkanie', 'text', [])}
                </li>
                <li className="user__info-item--field user__info-item">
                    <span className="user__info-caption">Kod: </span>
                    {createField<ProfileFormValueTypeKeys>(Input, 'kod', 'Kod pocztowy', 'text', [])}
                </li>
            </ul>
        </form>
    )
}

const UserInfoReduxForm = reduxForm<ProfileFormValueType, ProfilePropsType<PropsType>>({form: 'user_info'})(UserInfoForm);

const mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        initialValues: {
            email: state.user.email,
            phone: state.user.phone,
            street: state.user.address.street,
            build: state.user.address.build,
            flat: state.user.address.flat,
            city: state.user.address.city,
            kod: state.user.address.kod,
            name: state.user.name,
        },
    }
};
export const ContainerUserInfoForm = connect(mapStateToProps, {})(UserInfoReduxForm);

interface mapStateToPropsType {
    initialValues: ProfileFormValueType
}

type ProfileFormValueTypeKeys = Extract<keyof ProfileFormValueType, string>