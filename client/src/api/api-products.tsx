import {ProductsAPIType, ProfileAPIDataType, ProfileFormValueType} from '../types/types';
import {instance} from './api';

export const ProductsAPI = {
    getProducts(currentPage: number) {
        return instance.get<ProductsAPIType>(`/api/products?page=${currentPage}`, {}).then(res => res.data);
    },
    getTopProducts() {
        return instance.get<ProductsAPIType>('/api/products?top=false', {}).then(res => res.data);
    }
};