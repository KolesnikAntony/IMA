import {CartType, ProductType} from "../types/types";
import {BaseThunkType, InferActionsTypes} from "./store";
import {FormAction} from "redux-form";
import {ProductsAPI} from "../api/api-products";
import {FILTER_TYPES} from "../constants/constants";


const SET_SHOP_PRODUCTS = 'products-reducer/SET_SHOP_PRODUCTS';
const SET_CURRENT_PAGE = 'products-reducer/SET_CURRENT_PAGE';
const SET_TOTAL_PAGE = 'products-reducer/SET_TOTAL_PAGE';


const REMOVE_FROM_CART = 'products-reducer/REMOVE_FROM_CART';
const ADD_TO_CART = 'products-reducer/ADD_TO_CART';
const UPDATE_QTY = 'products-reducer/UPDATE_QTY';
const CHECK_IS_IN_CART = 'products-reducer/CHECK_IS_IN_CART';
const SET_IS_IN_CART = 'products-reducer/SET_IS_IN_CART';
const SET_SORT = 'products-reducer/SET_SORT';

const IS_FETCHING = 'products-reducer/IS_FETCHING';


const ProductsInitialState = {
    products: [
        {
            id: 1,
            title: '',
            price: 1,
            color: '',
            category: {
                name: '',
                _id: ''
            },
            description: '',
            shortDescr: '',
            subText: '',
            imageSrc: '',
            salePrice: null,
            sale: false,
            top: false,
            itsNew: false,
            isCart: false
        },
    ] as Array<ProductType>,

    totalPages: 10,
    pageSize: 8,
    portionSize: 4,
    currentPage: 1,
    selectType: FILTER_TYPES.SELECT_TYPE.ALL,
    sort: FILTER_TYPES.SORT_TYPE.MAX,
    cart: [] as Array<CartType> | any,
    isFetching: false,
};

const ProductsReducer = (state = ProductsInitialState, action: ActionType): ProductsInitialStateType => {
    switch (action.type) {
        case SET_SHOP_PRODUCTS:
            return {...state, products: action.products};

        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            };
        case SET_TOTAL_PAGE:
            return {
                ...state,
                totalPages: action.totalPages
            };

        case ADD_TO_CART:
            //@ts-ignore
            let {title, salePrice, price, imageSrc} = state.products.find(el => el.id == action.id);
            let productInCart = {
                id: action.id,
                qty: 1,
                title,
                imageSrc,
                price,
                salePrice,
            };
            return {...state, cart: [...state.cart, productInCart]};

        case UPDATE_QTY:
            let newCart = state.cart.map((item: CartType) => item.id == action.id ? {
                ...item,
                qty: action.qty
            } : {...item, qty: item.qty});
            return {...state, cart: newCart};

        case REMOVE_FROM_CART:
            return {...state, cart: state.cart.filter((el: CartType) => el.id != action.id)};

        case CHECK_IS_IN_CART:
            return {...state};

        case SET_IS_IN_CART:
            let arrayIsCart = state.products.map(el => el.id === action.id ? {...el, isCart: action.isCart} : {
                ...el,
                isCart: el.isCart
            });
            return {...state, products: arrayIsCart};

        case SET_SORT:
            return {...state, sort: action.sort, selectType: action.selectType};

        case IS_FETCHING:
            return {...state, isFetching: action.isFetching};

        default:
            return state
    }
};

export const actionsProducts = {
    setShopProducts: (products: Array<ProductType>) => ({
        type: SET_SHOP_PRODUCTS,
        products
    } as const),
    setTotalPage: (totalPages: number) => ({
        type: SET_TOTAL_PAGE,
        totalPages,
    } as const),
    setCurrentPage: (currentPage: number) => ({
        type: SET_CURRENT_PAGE,
        currentPage,
    } as const),
    setAddToCart: (id: number) => ({
        type: ADD_TO_CART,
        id,
        qty: 1,
    } as const),
    updateQty: (id: number, qty: number) => ({
        type: UPDATE_QTY,
        id,
        qty
    } as const),
    removeFromCart: (id: number) => ({
        type: REMOVE_FROM_CART,
        id,
    } as const),
    checkIsInCart: () => ({
        type: CHECK_IS_IN_CART,
    } as const),
    setIsInCart: (id: number, isCart: boolean) => ({
        type: SET_IS_IN_CART,
        id,
        isCart
    } as const),
    setSort: (selectType: string, sort: string) => ({
        type: SET_SORT,
        selectType,
        sort
    } as const),
    setFetching: (isFetching: boolean) => ({
        type: IS_FETCHING,
        isFetching
    } as const)
};

export const getProducts = (currentPage: number, selectType: string, sort: string): ThunkProductType => async (dispatch) => {
    dispatch(actionsProducts.setCurrentPage(currentPage));
    dispatch(actionsProducts.setFetching(true));
    const data = await ProductsAPI.getProducts(currentPage, selectType, sort);
    console.log(data, '----products');
    dispatch(actionsProducts.setShopProducts(data.products));
    dispatch(actionsProducts.setTotalPage(data.pages));
    dispatch(actionsProducts.setSort(selectType, sort));
    dispatch(actionsProducts.setFetching(false));
};

export default ProductsReducer;

export type ProductsInitialStateType = typeof ProductsInitialState;
type ActionType = InferActionsTypes<typeof actionsProducts>;
type ThunkProductType = BaseThunkType<ActionType | FormAction>
