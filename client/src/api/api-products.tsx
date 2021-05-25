import {ProductsAPIType, ProfileAPIDataType, ProfileFormValueType} from '../types/types';
import {instance} from './api';

export const ProductsAPI = {
    getProducts() {
        return instance.get<ProductsAPIType>('/api/products', {}).then(res => res.data);
    },
    getTopProducts() {
        return instance.get<ProductsAPIType>('/api/products?top=false', {}).then(res => res.data);
    }
};