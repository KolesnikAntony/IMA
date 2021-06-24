import {BaseThunkType, InferActionsTypes} from "./store";
import {FormAction} from "redux-form";
import {ProductType} from "../types/types";
import {FILTER_TYPES} from "../constants/constants";
import {ProductsAPI} from "../api/api-products";

const SET_ADMIN_PRODUCTS = 'admin-reducer/SET_PRODUCTS';
const SET_ADMIN_PRODUCT = 'admin-reducer/SET_PRODUCT';
const SET_CATEGORY = 'admin-reducer/SET_CATEGORY';
const IS_FETCHING = 'admin-reducer/IS_FETCHING';


const ProductsInitialState = {
    products: [] as Array<ProductType>,
    product: {} as ProductType,
    categories: [] as Array<{name: string , id: string}>,
    totalPages: 10,
    pageSize: 8,
    portionSize: 4,
    currentPage: 1,
    selectType: FILTER_TYPES.SELECT_TYPE.ALL,
    sort: FILTER_TYPES.SORT_TYPE.MAX,
    isFetching: false
};

const adminReducer = (state = ProductsInitialState, action: ActionType):ProductsInitialStateType => {
    switch (action.type) {
        case SET_ADMIN_PRODUCTS:
            return {...state, products: [...action.products]};
        case SET_ADMIN_PRODUCT:
            return {...state, product: {...action.product}};
        case SET_CATEGORY:
            return {...state, categories: [...action.categories]};
        case IS_FETCHING:
            return {...state, isFetching: action.isFetching};
        default:
            return state
    }
};

const actionsProducts = {
    setProducts: (products: Array<ProductType>) => ({
        type: SET_ADMIN_PRODUCTS,
        products
    } as const) ,
    setProduct: (product: ProductType) => ({
        type: SET_ADMIN_PRODUCT,
        product
    } as const),
    setCategories: (categories: Array<{name: string , id: string}>) => ({
        type: SET_CATEGORY,
            categories
    } as const),
    setIsFetching: (isFetching: boolean) => ({
        type: IS_FETCHING,
        isFetching
    } as const)
};


export const getAdminProducts = (currentPage: number, selectType: string, sort: string, category: Array<{ name: string, _id: string }>, colors: Array<string>):ThunkProductsType => async (disptatch) => {
    const res = await ProductsAPI.getProducts(currentPage, selectType, sort, category, colors);
    disptatch(actionsProducts.setProducts(res.products))
};


export const getAdminProduct = (id: string):ThunkProductsType => async (disptatch) => {
    const res = await ProductsAPI.getProduct(id);
    const category = await ProductsAPI.getAllCategory();
    disptatch(actionsProducts.setProduct(res));
    disptatch(actionsProducts.setCategories(category));
    disptatch(actionsProducts.setIsFetching(true));
};

export const changeAdminProduct = (id: string, formData: ProductType):ThunkProductsType => async (disptatch) => {
    const res = await ProductsAPI.changeProduct(id,formData);
    console.log(res)
    //disptatch(actionsProducts.setProduct(res));
};


export default adminReducer;

type ProductsInitialStateType = typeof ProductsInitialState;
type ActionType = InferActionsTypes<typeof actionsProducts>;
type ThunkProductsType = BaseThunkType<ActionType  | FormAction>