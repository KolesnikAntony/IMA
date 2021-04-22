import React, {FC} from "react";
import avatar from "../../../../assets/img/avatar.svg";
import {InjectedFormProps, reduxForm, Field} from "redux-form";
import {createField, Input} from "../../../../common/formControls/form-controls";
import {required} from "../../../../helpers/validation/validation";
import {connect} from "react-redux";
import {AppStateType} from "../../../../redux/store";
import {UserSelfPropsType} from "../../../../types/types";

const UserSelfForm:FC<InjectedFormProps<UserSelfFormValueType, UserSelfPropsType> & UserSelfPropsType> = ({handleSubmit,changePhoto}) => {

    return ( <form onSubmit={handleSubmit}  className="user__self">
            <button className="user__change--self user__change user__change--done"/>
            <div className="user__img">
                <img src={avatar} alt="" className="user__img--content"/>
                <label htmlFor="change-photo">
                    Change Photo
                    <input className="user__change-photo" id="change-photo" type="file" onChange={changePhoto}/>
                </label>
            </div>
            <h4 className="user__name">
                <Field component={'input'} name='name' placeholder='Name' type='text' validate={[required]} autoFocus />
                    {/*{createField<UserFormValueTypeKeys>(Input, 'name', "Email", 'text',[required], autoFocus )}*/}
            </h4>
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


