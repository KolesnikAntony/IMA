import {CartType, FilterType, ProductsAPIType, ProductType} from '../types/types';
import {instance} from './api';
import {FILTER_TYPES} from "../constants/constants";

export const ProductsAPI = {
    getProducts(currentPage: number, selectType: string,  sort: string) {
        let price = sort === FILTER_TYPES.SORT_TYPE.MIN ? '&sort=price' : '';
        let type = selectType !== FILTER_TYPES.SELECT_TYPE.ALL ? `&${selectType}=true`: '';

        return instance.get<ProductsAPIType>(`/api/products?page=${currentPage + type + price}`, {}).then(res => res.data);
    },
    getTopProducts() {
        return instance.get<ProductsAPIType>('/api/products?top=true', {}).then(res => res.data);
    },

    getNewProducts() {
        return instance.get<ProductsAPIType>('/api/products?itsNew=true', {}).then(res => res.data);
    },

    getProduct(id:string){
        return instance.get<{product: ProductType}>(`/api/products/${id}`, {}).then(res => res.data.product);
    },
    getFilterData(){
        return instance.get<FilterType>(`/api/category/ctgs_clrs`, {}).then(res => res.data);
    },
    getCartProducts(ids: string | null){
       if(ids != ""){
           return instance.get<{cartItems: Array<CartType>}>(`/api/cart?id=${ids}`, {}).then(res => res.data.cartItems);
       }else{
           return instance.get<{cartItems: Array<CartType>}>(`/api/cart`, {}).then(res => res.data.cartItems);
       }
    },
    getCategoriesData(categories: Array<string>, colors: Array<string>){
        let categoriesLength = categories.length;
        let colorLength = colors.length;
        console.log(colorLength)
        console.log(categoriesLength)
        let properties;
        if(categoriesLength && colorLength){
            properties =  `?category=${categories}&color=${colors}`;
        }else if (categoriesLength && !colorLength) {
            properties = `?category=${categories}`;
        }else if (!categoriesLength && colorLength ) {
            properties =  `?color=${colors}`;
        }else {
            return false
        }
        console.log(`/api/products/color_category${properties}`);
        return instance.get<ProductsAPIType>(`/api/products/color_category${properties}`, {}).then(res => res.data);
    }
};