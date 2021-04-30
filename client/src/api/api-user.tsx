import {APIResponseType, instance} from './api';

export const UserAPI = {
    getUser(){
        return instance.get<userDataType>('/api/user/profile', {}).then(res => res.data.user);
    },
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