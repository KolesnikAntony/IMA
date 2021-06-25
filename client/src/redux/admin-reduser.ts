import {BaseThunkType, InferActionsTypes} from "./store";
import {FormAction} from "redux-form";
import {CreateProductType, ProductType} from "../types/types";
import {FILTER_TYPES} from "../constants/constants";
import {ProductsAPI} from "../api/api-products";
import {push} from "connected-react-router";

const SET_ADMIN_PRODUCTS = 'admin-reducer/SET_PRODUCTS';
const SET_ADMIN_PRODUCT = 'admin-reducer/SET_PRODUCT';
const SET_CATEGORY = 'admin-reducer/SET_CATEGORY';
const IS_FETCHING = 'admin-reducer/IS_FETCHING';
const IS_CREATED = 'admin-reducer/IS_CREATED';
const SET_PAGINATION = 'admin-reducer/SET_PAGINATION';


const ProductsInitialState = {
    products: [] as Array<ProductType>,
    product: {} as ProductType,
    categories: [] as Array<{ name: string, id: string }>,
    totalPages: 10,
    pageSize: 12,
    portionSize: 4,
    currentPage: 1,
    selectType: FILTER_TYPES.SELECT_TYPE.ALL,
    sort: FILTER_TYPES.SORT_TYPE.MAX,
    isFetching: false,
    isCreated: false,
    totalProduct: 1
};

const adminReducer = (state = ProductsInitialState, action: ActionType): ProductsInitialStateType => {
    switch (action.type) {
        case SET_ADMIN_PRODUCTS:
            return {...state, products: [...action.products]};
        case SET_ADMIN_PRODUCT:
            return {...state, product: {...action.product}};
        case SET_CATEGORY:
            return {...state, categories: [...action.categories]};
        case IS_FETCHING:
            return {...state, isFetching: action.isFetching};
        case IS_CREATED:
            return {...state, isCreated: action.isCreated};
        case SET_PAGINATION:
            return {...state, totalProduct: action.totalProduct};
        default:
            return state
    }
};

export const actionsAdmin = {
        setProducts: (products: Array<ProductType>) => ({
            type: SET_ADMIN_PRODUCTS,
            products
        } as const),
        setProduct: (product: ProductType) => ({
            type: SET_ADMIN_PRODUCT,
            product
        } as const),
        setCategories: (categories: Array<{ name: string, id: string }>) => ({
            type: SET_CATEGORY,
            categories
        } as const),
        setIsFetching: (isFetching: boolean) => ({
            type: IS_FETCHING,
            isFetching
        } as const),
        setIsCreated: (isCreated: boolean) => ({
            type: IS_CREATED,
            isCreated
        } as const),
        setPagination: ( totalProduct: number) => ({
            type: SET_PAGINATION,
            totalProduct,
        } as const)
    }
;


export const getAdminProducts = (currentPage: number, selectType: string, sort: string, category: Array<{ name: string, _id: string }>, colors: Array<string>, limit: number): ThunkProductsType => async (disptatch) => {
    const res = await ProductsAPI.getProducts(currentPage, selectType, sort, category, colors, limit);
    console.log('respoce', res.page, res.count)
    disptatch(actionsAdmin.setPagination(res.count));
    disptatch(actionsAdmin.setProducts(res.products))
};


export const getAdminProduct = (id?: string): ThunkProductsType => async (disptatch) => {
    const res = await ProductsAPI.getProduct(id);
    const category = await ProductsAPI.getAllCategory();
    disptatch(actionsAdmin.setProduct(res));
    disptatch(actionsAdmin.setCategories(category));
};

export const getAdminCategories = (): ThunkProductsType => async (dispatch) => {
    const category = await ProductsAPI.getAllCategory();
    dispatch(actionsAdmin.setCategories(category));
};

export const changeAdminProduct = (id: string, formData: ProductType): ThunkProductsType => async (dispatch) => {
    const res = await ProductsAPI.changeProduct(id, formData);
    console.log(res, '---reducer');
    dispatch(actionsAdmin.setProduct(res));
    dispatch(actionsAdmin.setIsCreated(true));
};

export const createAdminProduct = (formData: CreateProductType): ThunkProductsType => async (dispatch) => {
    try {
        await ProductsAPI.createProduct(formData);
        dispatch(actionsAdmin.setIsCreated(true));
    } catch (err) {
        alert(err.response.data.message);
    }

};

export const deleteAdmitProduct = (id: string): ThunkProductsType => async (dispatch, getState) => {
    let products = getState().admin.products;
    try {
        await ProductsAPI.deleteProduct(id);
        let newProductList = products.filter(item => item.id + '' !== id);
        dispatch(actionsAdmin.setProducts(newProductList));
        dispatch(actionsAdmin.setPagination(products.length));
    } catch (e) {
        console.log(e);
    }

}


export default adminReducer;

type ProductsInitialStateType = typeof ProductsInitialState;
type ActionType = InferActionsTypes<typeof actionsAdmin>;
type ThunkProductsType = BaseThunkType<ActionType | FormAction>