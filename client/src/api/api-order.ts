import {instance} from './api';
import {AboutImage, ContactsType, CustomerType} from "../types/types";

export const OrderAPI = {
    orderSuccess(data: CustomerType){
        return instance.post(`/api/order `, data).then(res => res.data);
    },
};

