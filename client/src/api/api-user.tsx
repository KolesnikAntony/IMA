import {ProfileAPIDataType, ProfileFormValueType} from '../types/types';
import { instance} from './api';

export const UserAPI = {
    getUser() {
        return instance.get<ProfileAPIDataType>('/api/user/profile', {}).then(res => res.data.user);
    },
    uploadUser(userInfo: ProfileFormValueType){
       let {name, build, city, email, flat, kod, phone, street} = userInfo;
       let data = {
           name,
           email,
           phone,
           address: {
               build,
               city,
               flat,
               kod,
               street
           },
        };

        return instance.patch<ProfileAPIDataType>('/api/user/profile/update', data).then(res => {
            return res.data.user
        });
    },
    uploadAvatar(avatar: File){
        let formData = new FormData();
        formData.append("avatar", avatar);

        return instance.patch('/api/user/profile/avatar', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => console.log(res.data))
    }
};

