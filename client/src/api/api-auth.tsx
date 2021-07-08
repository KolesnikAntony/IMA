import {instance} from './api';

export const AuthAPI = {
    signUp(email: string, password: string){
        let data = JSON.stringify({
            email,
            password
        });
        return instance.post('/api/signup', data).then(res => res);
    },
    login(email: string, password: string) {
        let data = JSON.stringify({
            email,
            password
        });
        return instance.post('/api/login', data).then(res => res);
    },
    logout(){
        return instance.get('/api/user/logout', {}).then(res => console.log(res));
    },
    activateUser(key: string) {
        let data = JSON.stringify({
            activationToken: key,
        });

        return instance.post('/api/activate', data).then(res => res);
    },
    me() {
        return instance.get('/api', {}).then(res => res);
    },
    google() {
        return instance.post('/api/google_login', {}).then(res => res);
    },

};