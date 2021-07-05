import {instance} from './api';
import {AboutImage, ContactsType} from "../types/types";

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
    },
    getPhotoList(){
       return instance.get('/api/imgWithCaption').then(res => res.data.getImgWithCap);
    },
    editAboutCard(data: AboutImage){
        let {id, caption, img} = data;
        let formData = new FormData();
        img && formData.append('image', img);
        formData.append('caption', caption);
        return instance.put(`/api/imgWithCaption/${id}`, formData).then(res => res.data.editImgWithCap);
    },
    createAboutCard(data: AboutImage){
        let {caption, img} = data;
        let formData = new FormData();
        img && formData.append('image', img);
        formData.append('caption', caption);
        return instance.post(`/api/imgWithCaption/`, formData).then(res => res);
    },
    deleteCard(id: string){
        return instance.delete(`/api/imgWithCaption/${id}`).then(res => res.data);
    },
    getAboutText(){
        return instance.get('/api/text').then(res => res.data.textBlock[0]);
    },
    editAboutText(content: string, id:string ){
        let data = {
            content
        };
        return instance.patch(`/api/text/${id}`, data).then(res=> res.data.textBlock);
    },
    getBannerText(){
        return instance.get('/api/banner').then(res => res.data.banner[0]);
    },
    editBannerText(content: string, id:string ){
        let data = {
            content
        };
        return instance.patch(`/api/banner/${id}`, data).then(res=> res.data.banner);
    },
    getUsers(){
        return instance.get(`/api/user/all_info?page=1&limit=1000`).then(res=> res.data);
    }
};

