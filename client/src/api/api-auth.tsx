import axios from "axios";
import {instance} from './api';

export const AuthAPI = {
    signUp(email: string, password: string) {
        return instance.post('/signup', {email, password}).then(res => console.log(res))
    }
};