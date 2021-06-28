import {instance} from './api';
import {ContactsType} from "../types/types";

export const InfoAPI = {
    getContacts(){
        return instance.get(`/api/contacts `).then(res => res.data.contacts[0]);
    }
};

