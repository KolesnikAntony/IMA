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
    }
};