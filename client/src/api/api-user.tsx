import {instance} from './api';

export const UserAPI = {
    getUser(){
        return instance.post('/api/user/info', {}).then(res => res);
        console.log();
    },
};