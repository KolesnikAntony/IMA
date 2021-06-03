import React, {useCallback, useState} from "react";
import './user.scss'
import UserInfo from "./user-info/user-info";
import {ContainerUserInfoForm} from "./user-info/user-info-form";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../redux/store";
import {getPhoto, updateUserInfo} from "../../../redux/user-reducer";
import {logout} from "../../../redux/auth-reducer";
import {ProfileFormValueType} from "../../../types/types";


const VIEW_CHANGE_PROFILE = {
    SELF: 'SELF',
    INFO: 'INFO',
};


const User = () => {
    const [currentViewType, setCurrentViewType] = useState('');
    const dispatch = useDispatch();

    const {name, email, address, phone} = useSelector((state: RootState) => state.user);

    const toggleCurrentChangeList = useCallback((type) => {
        setCurrentViewType(type);
    }, [currentViewType]);

    //todo Will make disable button then response of updateUserInfo
    //todo Change callback toggleCurrentChangeList

    const changeProfileData = async (formData: ProfileFormValueType) => {
        await dispatch(updateUserInfo(formData));
        toggleCurrentChangeList('');
    };

    const changePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        let photo = e.target.files;
        if (photo !== null) dispatch(getPhoto(photo));
    };

    const onLogout = () => {
        dispatch(logout())
    };


    return <div className='user'>
        {currentViewType === VIEW_CHANGE_PROFILE.INFO ?
            <ContainerUserInfoForm onSubmit={changeProfileData}
                                   email={email}
                                   street={address.street}
                                   city={address.city}
                                   build={address.build}
                                   flat={address.flat}
                                   phone={phone}
                                   kod={address.kod}
                                   changePhoto={changePhoto}
                                   name={name}
                                   photo={''}/>
            : <UserInfo toggleList={() => toggleCurrentChangeList(VIEW_CHANGE_PROFILE.INFO)}
                        email={email}
                        street={address.street}
                        city={address.city}
                        build={address.build}
                        flat={address.flat}
                        phone={phone}
                        kod={address.kod}
                        name={name}
                        photo={''}/>}


        {<div className="user__buttons">
            {/*<button className="user__button reset">Change password</button>*/}
            <button className="user__button logout" onClick={() => onLogout()}>Wyjść</button>
        </div>}
    </div>
};

export default User;

