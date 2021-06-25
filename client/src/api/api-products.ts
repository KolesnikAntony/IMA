import {CartType, CreateProductType, FilterType, ProductsAPIType, ProductType} from '../types/types';
import {instance} from './api';
import {FILTER_TYPES} from "../constants/constants";

export const ProductsAPI = {
    getProducts(currentPage: number, selectType: string,  sort: string, categories: Array<{name: string, _id: string}>, colors: Array<string>, limit?: number) {
        let price = sort === FILTER_TYPES.SORT_TYPE.MIN ? '&sort=price' : '';
        let type = selectType !== FILTER_TYPES.SELECT_TYPE.ALL ? `&${selectType}=true`: '';
        let limitSet = limit ? `&limit=${limit}` : '';

        let categoriesLength = categories.length;
        let colorLength = colors.length;
        let properties;
        if(categoriesLength && colorLength){
            properties =  `&category=${categories}&color=${colors}`;
        }else if (categoriesLength && !colorLength) {
            properties = `&category=${categories}`;
        }else if (!categoriesLength && colorLength ) {
            properties =  `&color=${colors}`;
        }else{
            properties = '';
        }

        return instance.get<ProductsAPIType>(`/api/products?page=${currentPage + type + price+properties+limitSet}`, {}).then(res => res.data);
    },
    getTopProducts() {
        return instance.get<ProductsAPIType>('/api/products?top=true', {}).then(res => res.data);
    },

    getNewProducts() {
        return instance.get<ProductsAPIType>('/api/products?itsNew=true', {}).then(res => res.data);
    },

    getProduct(id?:string){
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
    getAllCategory(){
        return instance.get(`/api/category?limit=100`).then(res => res.data.categories);
    },
    changeProduct(id: string, data: ProductType){

        const formData = createFormData(data);

        return instance.put(`/api/products/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data.editedProduct);
    },
    createProduct(data: CreateProductType){
        const formData = createFormData(data);

        return instance.post(`/api/products`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data);
    },
    deleteProduct(id: string){
        return instance.delete(`/api/products/${id}`).then(res => res.data);
    }
};


const createFormData = (data:ProductType | CreateProductType) => {
    let formData = new FormData();
    let {category, color, img, salePrice, sale, top, itsNew, description, shortDescr, subText, title, price} = data;
    console.log(top,itsNew,  sale);

    img && formData.append('imageSrc', img as File);
    // formData.append('data', JSON.stringify(newData));
    formData.append('category', category._id);
    formData.append('color', color);
    formData.append('sale', JSON.stringify(sale));
    formData.append('top', JSON.stringify(top));
    formData.append('itsNew', JSON.stringify(itsNew));
    formData.append('description',description);
    formData.append('shortDescr', shortDescr);
    formData.append('subText',subText);
    formData.append('title', title);
    formData.append('price', JSON.stringify(price));
    formData.append('salePrice', salePrice == null ? '' : JSON.stringify(salePrice));
    return formData;
}