import React, {FC} from "react";
import './profile.scss'
import Authorization from "./authorization/authorization";

interface PropsType {

}

const Profile: FC<PropsType> = () => {
    return (
        <section className='profile'>
            <h3 className='profile__title aside__title'>Profile</h3>
            <Authorization/>
        </section>
    )
};
export default Profile;