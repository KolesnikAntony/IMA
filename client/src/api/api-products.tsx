import {ProductsAPIType, ProfileAPIDataType, ProfileFormValueType} from '../types/types';
import {instance} from './api';

export const ProductsAPI = {
    getProducts(currentPage: number, top: boolean, itsNew: boolean, sale: boolean, sort: boolean) {

        let price = sort ? '&sort=price' : '';
        let topQuery = top ? '&top=true' : '';
        let saleQuery = sale ? '&sale=true' : '';
        let itsNewQuery = itsNew ? '&itsNew=true' : '';
        console.log(`page=${currentPage + topQuery + saleQuery + itsNewQuery + price}`);
        return instance.get<ProductsAPIType>(`/api/products?page=${currentPage + topQuery + saleQuery + itsNewQuery + price}`, {}).then(res => res.data);
        //return instance.get<ProductsAPIType>(`/api/products?sort=${price}`, {}).then(res => res.data);
    },
    getTopProducts() {
        return instance.get<ProductsAPIType>('/api/products?top=false', {}).then(res => res.data);
    }
};