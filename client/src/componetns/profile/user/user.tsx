import React, {useCallback, useState} from "react";
import './user.scss'
import UserSelf from "./user-self/user-self";
import UserInfo from "./user-info/user-info";
import {ContainerUserInfoForm, UserInfoFormValueType} from "./user-info/user-info-form";
import {ContainerUserSelfForm, UserSelfFormValueType} from "./user-self/user-self-form";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../redux/store";
import {getNewName, getPhoto, getProfileData, UserInitialStateType} from "../../../redux/user-reducer";
import {logout} from "../../../redux/auth-reducer";


const VIEW_CHANGE_PROFILE = {
    SELF: 'SELF',
    INFO: 'INFO',
};


const User = () => {
    const [currentViewType, setCurrentViewType] = useState('');
    const dispatch = useDispatch<AppDispatch>();

    const user = useSelector<RootState, UserInitialStateType>((state) => state.user);
    const {name,  email, address, phone} = user;

    const toggleCurrentChangeList = useCallback((type) => {
        setCurrentViewType(type);
    }, [currentViewType]);


    const changeProfileData = (formData: UserInfoFormValueType) => {
        toggleCurrentChangeList('')
    };

    const changeName = (formData: UserSelfFormValueType) => {
        let {name} = formData;
        dispatch(getNewName(name))
        toggleCurrentChangeList('')
    };

    const changePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
       let photo =  e.target.files;
        if(photo !== null) dispatch(getPhoto(photo))
    };

    const onLogout = () => {
        dispatch(logout())
    };


    return <div className='user'>
        {currentViewType === VIEW_CHANGE_PROFILE.SELF ?
            <ContainerUserSelfForm onSubmit={changeName} changePhoto={changePhoto} name={name} photo={''}/>
            : <UserSelf toggleList={() => toggleCurrentChangeList(VIEW_CHANGE_PROFILE.SELF)}
                        name={name}
                        photo={''}/>}
        {currentViewType === VIEW_CHANGE_PROFILE.INFO ?
            <ContainerUserInfoForm onSubmit={changeProfileData}
                               email={email}
                               street={"address"}
                               city={address.city}
                               build={address.build}
                               flat={address.flat}
                               phone={phone}
                               kod={address.kod}/>
            : <UserInfo toggleList={() => toggleCurrentChangeList(VIEW_CHANGE_PROFILE.INFO)}
                        email={email}
                        street={"address"}
                        city={address.city}
                        build={address.build}
                        flat={address.flat}
                        phone={phone}
                        kod={address.kod}/>}


        {<div className="user__buttons">
            {/*<button className="user__button reset">Change password</button>*/}
            <button className="user__button logout" onClick={()=> onLogout()}>Log out</button>
        </div>}
    </div>
};

export default User;

