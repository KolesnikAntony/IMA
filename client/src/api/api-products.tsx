import {ProductsAPIType} from '../types/types';
import {instance} from './api';
import {FILTER_TYPES} from "../constants/constants";

export const ProductsAPI = {
    getProducts(currentPage: number, selectType: string,  sort: string) {
        let price = sort === FILTER_TYPES.SORT_TYPE.MIN ? '&sort=price' : '';
        let type = selectType !== FILTER_TYPES.SELECT_TYPE.ALL ? `&${selectType}=true`: '';

        return instance.get<ProductsAPIType>(`/api/products?page=${currentPage + type + price}`, {}).then(res => res.data);
    },
    getTopProducts() {
        return instance.get<ProductsAPIType>('/api/products?top=false', {}).then(res => res.data);
    }
};