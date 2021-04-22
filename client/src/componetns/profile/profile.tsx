import React, {FC} from "react";
import './profile.scss'
import Authorization from "./authorization/authorization";
import User from "./user/user";

interface PropsType {

}

const Profile: FC<PropsType> = () => {
    let isAuth = false;
    return (
        <section className='profile'>
            <h3 className='profile__title aside__title'>Profile</h3>
            {isAuth ? <User/> : <Authorization/> }
        </section>
    )
};
export default Profile;