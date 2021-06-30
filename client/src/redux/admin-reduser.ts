import {BaseThunkType, InferActionsTypes} from "./store";
import {FormAction} from "redux-form";
import {AboutImage, AboutList, ContactsType, CreateProductType, ProductType} from "../types/types";
import {FILTER_TYPES} from "../constants/constants";
import {ProductsAPI} from "../api/api-products";
import {push} from "connected-react-router";
import {InfoAPI} from "../api/api-info";

const SET_ADMIN_PRODUCTS = 'admin-reducer/SET_PRODUCTS';
const SET_ADMIN_PRODUCT = 'admin-reducer/SET_PRODUCT';
const SET_CATEGORY = 'admin-reducer/SET_CATEGORY';
const IS_FETCHING = 'admin-reducer/IS_FETCHING';
const IS_CREATED = 'admin-reducer/IS_CREATED';
const SET_PAGINATION = 'admin-reducer/SET_PAGINATION';
const SET_CONTACTS = 'admin-reducer/SET_CONTACTS';
const SET_ABOUT_LIST = 'admin-reducer/SET_ABOUT_LIST';
const EDIT_ABOUT_CARD = 'admin-reducer/EDIT_ABOUT_CARD';


const AdminInitialState = {
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
    totalProduct: 1,
    contacts: {},
    aboutList: [] as AboutList,
};

const adminReducer = (state = AdminInitialState, action: ActionType): AdminInitialStateType => {
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
        case SET_CONTACTS :
            return {...state, contacts: action.contacts};
        case SET_ABOUT_LIST:
            return {
                ...state, aboutList: action.list.map(el => ({
                    id: el.id,
                    caption: el.caption,
                    image: el.image
                }))
            };
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
        setPagination: (totalProduct: number) => ({
            type: SET_PAGINATION,
            totalProduct,
        } as const),
        setContacts: (contacts: ContactsType) => ({
            type: SET_CONTACTS,
            contacts,
        } as const),
        setAboutList: (list: AboutList) => ({
            type: SET_ABOUT_LIST,
            list
        } as const),
        editAboutCard:(data: AboutImage) => ({
            type: EDIT_ABOUT_CARD,
            data
        } as const)
    }
;


export const getAdminProducts = (currentPage: number, selectType: string, sort: string, category: Array<{ name: string, _id: string }>, colors: Array<string>, limit: number): ThunkAdminType => async (disptatch) => {
    const res = await ProductsAPI.getProducts(currentPage, selectType, sort, category, colors, limit);
    console.log('respoce', res.page, res.count);
    disptatch(actionsAdmin.setPagination(res.count));
    disptatch(actionsAdmin.setProducts(res.products))
};


export const getAdminProduct = (id?: string): ThunkAdminType => async (disptatch) => {
    const res = await ProductsAPI.getProduct(id);
    const category = await ProductsAPI.getAllCategory();
    disptatch(actionsAdmin.setProduct(res));
    disptatch(actionsAdmin.setCategories(category));
};

export const getAdminCategories = (): ThunkAdminType => async (dispatch) => {
    const category = await ProductsAPI.getAllCategory();
    dispatch(actionsAdmin.setCategories(category));
};

export const changeAdminProduct = (id: string, formData: ProductType): ThunkAdminType => async (dispatch) => {
    const res = await ProductsAPI.changeProduct(id, formData);
    console.log(res, '---reducer');
    dispatch(actionsAdmin.setProduct(res));
    dispatch(actionsAdmin.setIsCreated(true));
};

export const createAdminProduct = (formData: CreateProductType): ThunkAdminType => async (dispatch) => {
    try {
        await ProductsAPI.createProduct(formData);
        dispatch(actionsAdmin.setIsCreated(true));
    } catch (err) {
        alert(err.response.data.message);
    }

};

export const deleteAdmitProduct = (id: string): ThunkAdminType => async (dispatch, getState) => {
    let products = getState().admin.products;
    try {
        await ProductsAPI.deleteProduct(id);
        let newProductList = products.filter(item => item.id + '' !== id);
        dispatch(actionsAdmin.setProducts(newProductList));
        dispatch(actionsAdmin.setPagination(products.length));
    } catch (e) {
        console.log(e);
    }
};

export const deleteCategory = (id: string): ThunkAdminType => async (dispatch, getState) => {
    let categories = getState().admin.categories;
    try {
        await ProductsAPI.deleteCategory(id);
        let newCategories = categories.filter(item => item.id + '' !== id);
        dispatch(actionsAdmin.setCategories(newCategories));
        dispatch(actionsAdmin.setPagination(newCategories.length));
    } catch (e) {
        console.log(e);
    }
};

export const createCategory = (name: string): ThunkAdminType => async (dispatch) => {
    try {
        await ProductsAPI.createNewCategory(name);
        dispatch(actionsAdmin.setIsCreated(true));
    } catch (err) {
        alert(err.response.data.message);
    }
};

const setContacts = (dispatch: any, data: ContactsType) => {
    let {address, email, id, inst, nip, phone, region} = data;
    let contacts = {address, email, id, inst, nip, phone, region};
    dispatch(actionsAdmin.setContacts(contacts));
};


export const getContacts = (): ThunkAdminType => async (dispatch) => {
    let res = await InfoAPI.getContacts();
    setContacts(dispatch, res);
};

export const changeContacts = (data: ContactsType): ThunkAdminType => async (dispatch) => {
    let res = await InfoAPI.changeContacts(data);
    setContacts(dispatch, res);
};

export const getAboutUsList = (): ThunkAdminType => async (dispatch) => {
    let res = await InfoAPI.getPhotoList();
    dispatch(actionsAdmin.setAboutList(res));
};

export const createAboutCard = (formData: AboutImage): ThunkAdminType => async (dispatch) => {
    dispatch(actionsAdmin.setIsFetching(true));
    await InfoAPI.createAboutCard(formData);
    dispatch(actionsAdmin.setIsCreated(true));
    dispatch(actionsAdmin.setIsCreated(false));
    await dispatch(getAboutUsList());
    dispatch(actionsAdmin.setIsFetching(false));
};

export const editAboutCard = (formData: AboutImage): ThunkAdminType => async (dispatch) => {
    dispatch(actionsAdmin.setIsFetching(true));
    let res = await InfoAPI.editAboutCard(formData);
    dispatch(actionsAdmin.setIsCreated(true));
    dispatch(actionsAdmin.setIsCreated(false));
    dispatch(actionsAdmin.setIsFetching(false));
    dispatch(actionsAdmin.editAboutCard(res));
};

export const deleteCardAbout = (id: string): ThunkAdminType => async (dispatch) => {
    await InfoAPI.deleteCard(id);
    await dispatch(getAboutUsList());
};

export default adminReducer;

type AdminInitialStateType = typeof AdminInitialState;
type ActionType = InferActionsTypes<typeof actionsAdmin>;
type ThunkAdminType = BaseThunkType<ActionType | FormAction>