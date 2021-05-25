import {CartType, FormFilterDataType, ProductsAPIType, ProductType} from "../types/types";
import {BaseThunkType, InferActionsTypes} from "./store";
import {FormAction} from "redux-form";
import {ProductsAPI} from "../api/api-products";
import index from "swiper";

const SET_FILTER = 'products-reducer/SET_FILTER';
const SET_HOME_CATALOG = 'products-reducer/SET_HOME_CATALOG';
const SET_HOME_TOP_PRODUCTS = 'products-reducer/SET_HOME_TOP_PRODUCTS';
const SET_CURRENT_PRODUCTS_PRICE = 'products-reducer/SET_CURRENT_PRODUCTS_PRICE';
const REMOVE_FROM_CART = 'products-reducer/REMOVE_FROM_CART';
const ADD_TO_CART = 'products-reducer/ADD_TO_CART';
const UPDATE_QTY ='products-reducer/UPDATE_QTY';


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
        },
    ] as Array<ProductType> ,
    topProducts: [] as Array<ProductType>,
    cart: [] as Array<CartType> | any,
    totalPrice: 0 as number,
    currentProductsPrice: 0 as number
};

const ProductsReducer = (state = ProductInitialState, action: ActionType): ProductsInitialStateType => {
    switch (action.type) {
        case SET_FILTER:
            return {...state, products: action.products};
        case SET_HOME_CATALOG:
            return {...state, products: action.products};
        case SET_HOME_TOP_PRODUCTS:
            return {...state, topProducts: action.products};
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
            let newCart = state.cart.map((item: CartType) => item.id == action.id ? {...item, qty: action.qty} : {...item, qty: item.qty});
            return {...state, cart: newCart};
        case REMOVE_FROM_CART:

            return {...state, cart: state.cart.filter((el: CartType)=> el.id != action.id)}
        default:
            return state
    }
};

export const actionsProducts = {
    setFilter: (products: Array<ProductType>) => ({
        type: SET_FILTER,
        products,
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
    updateQty:(id:number, qty: number) => ({
        type: UPDATE_QTY,
        id,
        qty
    } as const),
    removeFromCart: (id: number) => ({
        type: REMOVE_FROM_CART,
        id,
    } as const),
};

export const getProducts = (): ThunkProductType => async (dispatch) => {
    const data = await ProductsAPI.getProducts();
    console.log(data.products, '---all');
    dispatch(actionsProducts.setHomeCatalog(data.products))
};
export const getTopProducts = (): ThunkProductType => async (dispatch) => {
    const data = await ProductsAPI.getTopProducts();
    console.log(data.products , '---top');
    dispatch(actionsProducts.setHomeTopProducts(data.products))
};
export const getFilter = (formData: FormFilterDataType): ThunkProductType => async (dispatch) => {

};
export const getProductsOrder = (value: string): ThunkProductType => async (dispatch) => {
    console.log(value)
};
export const getProductsType = (value: string): ThunkProductType => async (dispatch) => {
    console.log(value)
};

export default ProductsReducer;

type ProductsInitialStateType = typeof ProductInitialState;
type ActionType = InferActionsTypes<typeof actionsProducts>;
type ThunkProductType = BaseThunkType<ActionType | FormAction>
