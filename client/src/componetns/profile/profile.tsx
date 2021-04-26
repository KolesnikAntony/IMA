import React, {FC} from "react";
import './profile.scss'
import Authorization from "./authorization/authorization";
import User from "./user/user";
import AuthAccept from "./authorization/auth-accept";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {AuthInitialStateType} from "../../redux/auth-reducer";

interface PropsType {

}

const Profile: FC<PropsType> = () => {

    const {email,isAuth, isSuccessReg} = useSelector<RootState, AuthInitialStateType>(state => state.auth);

    return (
        <section className='profile'>
            <h3 className='profile__title aside__title'>Profile</h3>
            {isSuccessReg ? <AuthAccept email={email}/> : (isAuth ? <User/> : <Authorization/>) }
        </section>
    )
};
export default Profile;