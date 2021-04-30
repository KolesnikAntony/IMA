import {instance} from './api';

export const UserAPI = {
    getUser(){
        return instance.get('/api/user/profile', {}).then(res => res);
    },
};