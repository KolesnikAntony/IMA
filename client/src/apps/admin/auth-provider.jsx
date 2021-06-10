import {AUTH_CHECK, AUTH_ERROR, AUTH_LOGOUT, fetchUtils} from 'react-admin';
import {stringify} from "querystring";
import {instance} from "../../api/api";
import {AuthAPI} from "../../api/api-auth";
import {getProfileData} from "../../redux/user-reducer";


import {AUTH_LOGIN} from 'react-admin';

export default async (type: any, params: any) => {
    if (type === AUTH_LOGIN) {

        const {username, password} = params;

        let data = JSON.stringify({
            email: username,
            password
        });

        try {
            await instance.post('/api/login', data);
        } catch (e) {
            throw  Error("Try again")
        }
    }

    if (type === AUTH_LOGOUT) {
        console.log('auth__logout');
        try {
            await instance.get('/api/user/logout')
        } catch (e) {
            // throw  Error("Try again")
        }
    }
    if (type === AUTH_ERROR) {
        console.log('auth__error');
        const status = params.status;
        if (status === 401 || status === 403) {
            return Promise.reject();
        }
        return Promise.resolve();
    }
    if (type === AUTH_CHECK) {
        console.log('auth__check');

        try {
            await instance.get('/api');
        } catch (e) {
            throw new Error("Try again")
        }

    }
    return Promise.resolve();
}
