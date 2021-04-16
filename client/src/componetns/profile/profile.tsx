import React, {FC} from "react";
import './profile.scss'
import Authorization from "./authorization/authorization";
import UserInfo from "./user-info/user-info";

interface PropsType {

}

const Profile: FC<PropsType> = () => {
    let isAuth = true;
    return (
        <section className='profile'>
            <h3 className='profile__title aside__title'>Profile</h3>
            {isAuth ? <UserInfo/> : <Authorization/> }
        </section>
    )
};
export default Profile;