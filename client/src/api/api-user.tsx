import {APIResponseType, instance} from './api';

export const UserAPI = {
    getUser(){
        return instance.get<userDataType>('/api/user/profile', {}).then(res => res.data.user);
    },
    uploadUser(userInfo:ProfileDataType ){
        let data = JSON.stringify({
            data: userInfo
        });

        return instance.patch<userDataType>('/api/user/profile/update', data).then(res => res.data.user);
    }
};

export type userDataType = {
    user: {
        address: {
            build: string
            city: string
            flat: string
            kod: string
            street: string
        }
        email: string
        name: string
        phone: string
    }
}

export type ProfileDataType = {
    address: {
        kod: string
        street: string
        build: string
        flat: string
        city: string
    },
    email: string
    phone: string
    name: string
    photo?: string
}