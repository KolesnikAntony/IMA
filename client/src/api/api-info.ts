import {instance} from './api';
import {ContactsType} from "../types/types";

export const InfoAPI = {
    getContacts(){
        return instance.get(`/api/contacts `).then(res => res.data.contacts[0]);
    },
    changeContacts(data: ContactsType){
        let {id, address, region, inst, email , nip , phone} = data;
        let formData = {
            address, region, inst, email , nip , phone
        };
        return instance.put(`/api/contacts/${id}`, JSON.stringify(formData)).then(res => res.data.contacts);
    }
};

