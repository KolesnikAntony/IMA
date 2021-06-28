import {instance} from './api';

export const InfoAPI = {
    getContacts(){
        return instance.post(`/api/contacts `).then(res => res.data);
    }
};

