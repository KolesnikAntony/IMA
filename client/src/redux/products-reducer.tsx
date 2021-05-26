import {CartType, FormFilterDataType, ProductsAPIType, ProductType} from "../types/types";
import {BaseThunkType, InferActionsTypes} from "./store";
import {FormAction} from "redux-form";
import {ProductsAPI} from "../api/api-products";
import index from "swiper";

const SET_SHOP_PRODUCTS = 'products-reducer/SET_SHOP_PRODUCTS';
const SET_CURRENT_PAGE = 'products-reducer/SET_CURRENT_PAGE';
const SET_TOTAL_PAGE = 'products-reducer/SET_TOTAL_PAGE';


const SET_HOME_CATALOG = 'products-reducer/SET_HOME_CATALOG';
const SET_HOME_TOP_PRODUCTS = 'products-reducer/SET_HOME_TOP_PRODUCTS';
const REMOVE_FROM_CART = 'products-reducer/REMOVE_FROM_CART';
const ADD_TO_CART = 'products-reducer/ADD_TO_CART';
const UPDATE_QTY = 'products-reducer/UPDATE_QTY';
const CHECK_IS_IN_CART = 'products-reducer/CHECK_IS_IN_CART';
const SET_IS_IN_CART = 'products-reducer/SET_IS_IN_CART';
const SET_SORT = 'products-reducer/SET_SORT'


const ProductInitialState = {
    products: [
        {
            id: 1,
            title: 'laker',
            price: 30,
            color: 'red',
            category: {
                name: 'lala',
                _id: 'faff'
            },
            description: "ldld",
            shortDescr: 'dldldl',
            imageSrc: "https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_300/https://ima-professional.pl/wp-content/uploads/2021/01/Agate07-300x300.jpg",
            salePrice: null,
            sale: false,
            top: true,
            itsNew: true,
            isCart: false
        },
    ] as Array<ProductType>,
    totalPages: 10,
    pageSize: 8,
    portionSize: 4,
    currentPage: 1,
    sale: true,
    top: true,
    itsNew: true,
    sort: false,
    topProducts: [] as Array<ProductType>,
    cart: [] as Array<CartType> | any,
    totalPrice: 0 as number,
    currentProductsPrice: 0 as number
};

const ProductsReducer = (state = ProductInitialState, action: ActionType): ProductsInitialStateType => {
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

        case SET_HOME_CATALOG:
            return {...state, products: action.products};

        case SET_HOME_TOP_PRODUCTS:
            return {...state, products: action.products};

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
            return {...state, sort: action.sort, top: action.top, itsNew: action.itsNew, sale: action.sale}
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

    setHomeCatalog: (products: Array<ProductType>) => ({
        type: SET_HOME_CATALOG,
        products
    } as const),
    setHomeTopProducts: (products: Array<ProductType>) => ({
        type: SET_HOME_TOP_PRODUCTS,
        products
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
    setSort: (top: boolean, itsNew: boolean, sale: boolean, sort: boolean) => ({
        type: SET_SORT,
        top,
        itsNew,
        sale,
        sort
    } as const )
};

export const getProducts = (currentPage: number,  top: boolean, itsNew: boolean, sale: boolean, sort: boolean): ThunkProductType => async (dispatch) => {
    dispatch(actionsProducts.setCurrentPage(currentPage));
    const data = await ProductsAPI.getProducts(currentPage, top, itsNew, sale, sort);
    console.log(data, '----products')
    dispatch(actionsProducts.setShopProducts(data.products));
    dispatch(actionsProducts.setTotalPage(data.pages));
    dispatch(actionsProducts.setSort(top, itsNew, sale, sort));
};


export const getTopProducts = (): ThunkProductType => async (dispatch) => {
    const data = await ProductsAPI.getTopProducts();
    dispatch(actionsProducts.setHomeTopProducts(data.products));
    dispatch(actionsProducts.setHomeCatalog(data.products));
};

export default ProductsReducer;

export type ProductsInitialStateType = typeof ProductInitialState;
type ActionType = InferActionsTypes<typeof actionsProducts>;
type ThunkProductType = BaseThunkType<ActionType | FormAction>
