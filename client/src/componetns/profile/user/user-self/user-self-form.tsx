import React, {FC} from "react";
import avatar from "../../../../assets/img/avatar.svg";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {required} from "../../../../helpers/validation/validation";
import {connect} from "react-redux";
import {AppStateType} from "../../../../redux/store";
import {UserSelfPropsType} from "../../../../types/types";

const UserSelfForm:FC<InjectedFormProps<UserSelfFormValueType, UserSelfPropsType> & UserSelfPropsType> = ({handleSubmit,changePhoto}) => {

    return ( <form onSubmit={handleSubmit}  className="user__self">
            <button className="user__change--self user__change user__change--done"/>

        </form>
    )
};
const UserSelfReduxForm = reduxForm<UserSelfFormValueType, UserSelfPropsType>({form: 'user_self'})(UserSelfForm);

const mapStateToProps = (state:AppStateType):mapStateToPropsType => {
    return {
        initialValues: {
            name: state.user.name,
        },
    }
}

export const ContainerUserSelfForm  = connect(mapStateToProps,{})(UserSelfReduxForm);

export interface UserSelfFormValueType {
    name: string | null
    photo: string | null

}

interface mapStateToPropsType  {
    initialValues: {
        name: string | null
    }
}

type UserFormValueTypeKeys = Extract<keyof UserSelfFormValueType, string>


