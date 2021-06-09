import {fetchUtils} from 'react-admin';
import {stringify} from "querystring";
import {instance} from "../../api/api";
import {AuthAPI} from "../../api/api-auth";
import {getProfileData} from "../../redux/user-reducer";


export default {
    // called when the user attempts to log in
    //@ts-ignore
    login: async ({username, password}) => {

        let data = JSON.stringify({
            email: username,
            password
        });

        try {
            return await instance.post('/api/login', data);
        } catch (err) {
            throw new Error('Email is not found')
        }

        // localStorage.setItem('username', username);
        // localStorage.setItem('password', password);
        // accept all username/password combinations
        // return Promise.resolve();
    },
    // called when the user clicks on the logout button
    logout: async () => {
        try {
            await instance.get('/api/user/logout', {});
            return Promise.resolve()
        } catch (err) {
            return Promise.reject();
        }
    },
    // called when the API returns an error
    //@ts-ignore
    checkError: ({status}) => {
        console.log(status, '.....status')
        if (status === 401 || status === 403) {
            return Promise.reject();
        }
        return Promise.resolve();
    },
    // called when the user navigates to a new location, to check for authentication
    checkAuth: async () => {
        try {
            await instance.get('/api', {});
            return Promise.resolve();
        }catch (e) {
           return Promise.reject()
        }
    },
    // called when the user navigates to a new location, to check for permissions / roles
    getPermissions: () => Promise.resolve(),
};