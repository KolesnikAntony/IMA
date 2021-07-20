import {BaseThunkType, InferActionsTypes} from "./store";
import {FormAction} from "redux-form";
import {
    AboutImage,
    AboutList,
    AboutTextType,
    ContactsType,
    CreateProductType,
    OrderType,
    ProductType,
    ProfileDataType
} from "../types/types";
import {ProductsAPI} from "../api/api-products";
import {InfoAPI} from "../api/api-info";
import {actionsAuth} from "./auth-reducer";
import {OrderAPI} from "../api/api-order";

const SET_ADMIN_PRODUCTS = 'admin-reducer/SET_PRODUCTS';
const SET_ADMIN_PRODUCT = 'admin-reducer/SET_PRODUCT';
const SET_CATEGORY = 'admin-reducer/SET_CATEGORY';
const IS_FETCHING = 'admin-reducer/IS_FETCHING';
const IS_EDITED = 'admin-reducer/IS_EDITED';
const IS_CREATED = 'admin-reducer/IS_CREATED';
const SET_PAGINATION = 'admin-reducer/SET_PAGINATION';
const SET_CONTACTS = 'admin-reducer/SET_CONTACTS';
const SET_ABOUT_LIST = 'admin-reducer/SET_ABOUT_LIST';
const EDIT_ABOUT_CARD = 'admin-reducer/EDIT_ABOUT_CARD';
const SET_ABOUT_TEXT = 'admin-reducer/SET_ABOUT_TEXT';
const SET_BANNER_TEXT = 'admin-reducer/SET_BANNER_TEXT';
const SET_ALL_USERS = 'admin-reducer/SET_ALL_USERS';
const SET_ERROR = 'admin-reducer/SET_ERROR';
const SET_ORDER_LIST = 'admin-reducer/SET_ORDER_LIST';


const AdminInitialState = {
    products: [] as Array<ProductType>,
    product: {} as ProductType,
    categories: [] as Array<{ name: string, id: string }>,
    totalPages: 10,
    pageSize: 12,
    portionSize: 4,
    currentPage: 1,
    isFetching: false,
    isCreated: false,
    isEdited: false,
    totalProduct: 1,
    contacts: {},
    orderList: [] as Array<OrderType>,
    aboutList: [] as AboutList,
    aboutText: {
        content: '',
        id: ''
    },
    bannerText: {
        content: '',
        id: ''
    },
    users: [] as Array<ProfileDataType>,
    isError: false,

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
        case IS_EDITED:
            return {...state, isEdited: action.isEdited};
        case IS_CREATED:
            return {...state, isCreated: action.isCreated};
        case SET_PAGINATION:
            return {...state, totalProduct: action.totalProduct};
        case SET_CONTACTS :
            return {...state, contacts: action.contacts};
        case SET_ORDER_LIST:
            return {...state, orderList: action.orderList};
        case SET_ABOUT_LIST:
            return {
                ...state, aboutList: action.list.reverse().map(el => ({
                    id: el.id,
                    caption: el.caption,
                    image: el.image
                }))
            };
        case EDIT_ABOUT_CARD:
            let newCard = {
                id: action.data.id,
                caption: action.data.caption,
                image: action.data.image,
            };

            let cardList = state.aboutList.map(el => el.id === newCard.id ? newCard : el);

            return {
                ...state,
                aboutList: cardList
            };
        case SET_ABOUT_TEXT:
            return {...state, aboutText: action.payload};

        case SET_BANNER_TEXT:
            return {...state, bannerText: action.payload};

        case SET_ALL_USERS:
            return {...state, users: action.users};
        case SET_ERROR:
            return {...state, isError: action.isError};

        default:
            return state
    }
};

export const actionsAdmin = {
        setProducts: (products: Array<ProductType>) => ({
            type: SET_ADMIN_PRODUCTS,
            products: products.reverse()
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
        setIsEdited: (isEdited: boolean) => ({
            type: IS_EDITED,
            isEdited
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
        editAboutCard: (data: AboutImage) => ({
            type: EDIT_ABOUT_CARD,
            data
        } as const),
        setAboutText: (payload: AboutTextType) => ({
            type: SET_ABOUT_TEXT,
            payload
        } as const),
        setBannerText: (payload: AboutTextType) => ({
            type: SET_BANNER_TEXT,
            payload
        } as const),
        setUsers: (users: Array<ProfileDataType>) => ({
            type: SET_ALL_USERS,
            users
        } as const),
        setError: (isError: boolean) => ({
            type: SET_ERROR,
            isError,
        } as const),
        setOrder: (orderList: Array<OrderType>) => ({
            type: SET_ORDER_LIST,
            orderList
        } as const)
    }
;

export const getOrderList = ():ThunkAdminType => async (dispatch) => {
    const res = await OrderAPI.orderList();
    dispatch(actionsAdmin.setOrder(res.orders));
};

export const getAdminProducts = (currentPage: number, selectType: string, sort: string, category: Array<{ name: string, _id: string }>, colors: Array<string>, limit: number): ThunkAdminType => async (dispatch) => {
    try {
        dispatch(actionsAdmin.setIsFetching(true));
        const res = await ProductsAPI.getProducts(currentPage, selectType, sort, category, colors, limit);
        dispatch(actionsAdmin.setPagination(res.count));
        dispatch(actionsAdmin.setProducts(res.products));
        dispatch(actionsAdmin.setIsFetching(false));
    } catch (err) {
        dispatch(actionsAdmin.setIsFetching(false));
    }
};


export const getAdminProduct = (id?: string): ThunkAdminType => async (disptatch) => {
    const res = await ProductsAPI.getProduct(id);
    const category = await ProductsAPI.getAllCategory();
    disptatch(actionsAdmin.setProduct(res));
    disptatch(actionsAdmin.setCategories(category));
};

export const getAdminCategories = (): ThunkAdminType => async (dispatch) => {
    dispatch(actionsAdmin.setIsFetching(true));
    const category = await ProductsAPI.getAllCategory();
    dispatch(actionsAdmin.setCategories(category));
    dispatch(actionsAdmin.setIsFetching(false));
};

export const changeAdminProduct = (id: string, formData: ProductType): ThunkAdminType => async (dispatch) => {
    try {
        const res = await ProductsAPI.changeProduct(id, formData);
        dispatch(actionsAdmin.setProduct(res));
        dispatch(actionsAdmin.setIsCreated(true));
    } catch (err) {
        if (err.response.status === 401) {
            alert('Session was finished. Please login');
            dispatch(actionsAuth.setIsAuth(false));
        }
    }
};

export const createAdminProduct = (formData: CreateProductType): ThunkAdminType => async (dispatch) => {
    console.log(formData);
    try {
        await ProductsAPI.createProduct(formData);
        dispatch(actionsAdmin.setIsCreated(true));
    } catch (err) {
        if (err.response.status === 401) {
            alert('Session was finished. Please login');
            dispatch(actionsAuth.setIsAuth(false));
        }
    }

};

export const deleteAdmitProduct = (id: string): ThunkAdminType => async (dispatch, getState) => {
    let products = getState().admin.products;
    try {
        await ProductsAPI.deleteProduct(id);
        let newProductList = products.filter(item => item.id + '' !== id);
        dispatch(actionsAdmin.setProducts(newProductList));
        dispatch(actionsAdmin.setPagination(products.length));
    } catch (err) {
        if (err.response.status === 401) {
            alert('Session was finished. Please login');
            dispatch(actionsAuth.setIsAuth(false));
        }
    }
};

export const deleteCategory = (id: string): ThunkAdminType => async (dispatch, getState) => {
    let categories = getState().admin.categories;
    try {
        await ProductsAPI.deleteCategory(id);
        let newCategories = categories.filter(item => item.id + '' !== id);
        dispatch(actionsAdmin.setCategories(newCategories));
        dispatch(actionsAdmin.setPagination(newCategories.length));
    } catch (err) {
        if (err.response.status === 401) {
            alert('Session was finished. Please login');
            dispatch(actionsAuth.setIsAuth(false));
        }
    }
};

export const createCategory = (name: string): ThunkAdminType => async (dispatch) => {
    try {
        await ProductsAPI.createNewCategory(name);
        dispatch(actionsAdmin.setIsCreated(true));
    } catch (err) {
        if (err.response.status === 401) {
            alert('Session was finished. Please login');
            dispatch(actionsAuth.setIsAuth(false));
        } else if (err.response.status === 400) {
            alert('Please choose a photo');
        }
    }
};

const setContacts = (dispatch: any, data: ContactsType) => {
    let {address, email, id, inst, nip, phone, region} = data;
    let contacts = {address, email, id, inst, nip, phone, region};
    dispatch(actionsAdmin.setContacts(contacts));
};


export const getContacts = (): ThunkAdminType => async (dispatch) => {
    try {
        let res = await InfoAPI.getContacts();
        setContacts(dispatch, res);
    } catch (err) {
        if (err.response.status === 401) {
            alert('Session was finished. Please login');
            dispatch(actionsAuth.setIsAuth(false));
        }
    }
};

export const changeContacts = (data: ContactsType): ThunkAdminType => async (dispatch) => {
    try {
        let res = await InfoAPI.changeContacts(data);
        setContacts(dispatch, res);
        dispatch(actionsAdmin.setIsEdited(true));
    } catch (err) {
        if (err.response.status === 401) {
            alert('Session was finished. Please login');
            dispatch(actionsAuth.setIsAuth(false));
        }
    }
};

export const getAboutUsList = (): ThunkAdminType => async (dispatch) => {
    try {
        let res = await InfoAPI.getPhotoList();
        dispatch(actionsAdmin.setAboutList(res));
    } catch (err) {
        if (err.response.status === 401) {
            alert('Session was finished. Please login');
            dispatch(actionsAuth.setIsAuth(false));
        }
    }
};

export const createAboutCard = (formData: AboutImage): ThunkAdminType => async (dispatch) => {
    try {
        dispatch(actionsAdmin.setIsFetching(true));
        await InfoAPI.createAboutCard(formData);
        dispatch(actionsAdmin.setIsCreated(true));
        dispatch(actionsAdmin.setIsCreated(false));
        await dispatch(getAboutUsList());
        dispatch(actionsAdmin.setIsFetching(false));
    } catch (err) {
        if (err.response.status === 401) {
            alert('Session was finished. Please login');
            dispatch(actionsAuth.setIsAuth(false));
        }
    }
};

export const editAboutCard = (formData: AboutImage): ThunkAdminType => async (dispatch) => {
    try {
        dispatch(actionsAdmin.setIsFetching(true));
        let res = await InfoAPI.editAboutCard(formData);
        dispatch(actionsAdmin.setIsEdited(true));
        dispatch(actionsAdmin.setIsEdited(false));
        dispatch(actionsAdmin.editAboutCard(res));
        dispatch(actionsAdmin.setIsFetching(false));
    } catch (err) {
        if (err.response.status === 401) {
            alert('Session was finished. Please login');
            dispatch(actionsAuth.setIsAuth(false));
        }
    }
};

export const deleteCardAbout = (id: string): ThunkAdminType => async (dispatch) => {
    try {
        await InfoAPI.deleteCard(id);
        await dispatch(getAboutUsList());
    } catch (err) {
        if (err.response.status === 401) {
            alert('Session was finished. Please login');
            dispatch(actionsAuth.setIsAuth(false));
        }
    }
};

export const getAboutText = (): ThunkAdminType => async (dispatch) => {
    dispatch(actionsAdmin.setIsFetching(true));
    let {content, id} = await InfoAPI.getAboutText();
    let payload = {
        content, id
    };
    dispatch(actionsAdmin.setAboutText(payload));
    dispatch(await getAboutUsList());
    dispatch(actionsAdmin.setIsFetching(false));
};

export const getBannerText = (): ThunkAdminType => async (dispatch) => {
    let {content, id} = await InfoAPI.getBannerText();
    let payload = {
        content, id
    };
    dispatch(actionsAdmin.setBannerText(payload))
};


const editTextBlock = (id: string, content: string, action: any, dispatch: any) => {
    let payload = {
        content, id
    };
    dispatch(actionsAdmin.setIsEdited(true));
    dispatch(action(payload));
    dispatch(actionsAdmin.setIsEdited(false));
};

export const editAboutText = (text: string, _id: string,): ThunkAdminType => async (dispatch) => {
    try {
        let {content, id} = await InfoAPI.editAboutText(text, _id);
        editTextBlock(id, content, actionsAdmin.setAboutText, dispatch);
    } catch (err) {
        if (err.response.status === 401) {
            alert('Session was finished. Please login');
            dispatch(actionsAuth.setIsAuth(false));
        }
    }
};

export const editBannerText = (text: string, _id: string,): ThunkAdminType => async (dispatch) => {
    try {
        let {content, id} = await InfoAPI.editBannerText(text, _id);
        editTextBlock(id, content, actionsAdmin.setBannerText, dispatch);
    } catch (err) {
        if (err.response.status === 401) {
            alert('Session was finished. Please login');
            dispatch(actionsAuth.setIsAuth(false));
        }
    }
};

export const getAllUsers = (): ThunkAdminType => async (dispatch) => {
    try {
        dispatch(actionsAdmin.setIsFetching(true));
        let res = await InfoAPI.getUsers();
        console.log(res);
        dispatch(actionsAdmin.setUsers(res));
        dispatch(actionsAdmin.setIsFetching(false));
    } catch (err) {
        if (err.response.status === 401) {
            alert('Session was finished. Please login');
            dispatch(actionsAuth.setIsAuth(false));
        }
    }
};


export default adminReducer;

type AdminInitialStateType = typeof AdminInitialState;
type ActionType = InferActionsTypes<typeof actionsAdmin>;
type ThunkAdminType = BaseThunkType<ActionType | FormAction>