import {CartType, FormFilterDataType, ProductsAPIType, ProductType} from "../types/types";
import {BaseThunkType, InferActionsTypes} from "./store";
import {FormAction} from "redux-form";
import {ProductsAPI} from "../api/api-products";

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
    ] as Array<ProductType>,
    topProducts: [] as Array<ProductType>,
    cart: [] as Array<CartType>,
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
            let foundProduct = state.products.find(el => el.id == action.id);
            console.log(foundProduct);
            let title = foundProduct.title;
            // let newObj = {
            //     qty: 1,
            //     id: action.id,
            //     title,
            //     imageSrc,
            //     price,
            // };

            return state;
        case UPDATE_QTY:
            // let cart = [...state.cart];
            // let item = cart.find(item => item.id == action.id);
            // let newCart = cart.filter(item => item.id != action.id);
            // item.qty = action.qty;
            // newCart.push(item);

           // return  {...state, cart: [...state.cart.find(el => el.id == action.id)]}

        default:
            return state
    }
};

const actions = {
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
    dispatch(actions.setHomeCatalog(data.products))
};
export const getTopProducts = (): ThunkProductType => async (dispatch) => {
    const data = await ProductsAPI.getTopProducts();
    console.log(data.products , '---top');
    dispatch(actions.setHomeTopProducts(data.products))
};
export const getFilter = (formData: FormFilterDataType): ThunkProductType => async (dispatch) => {

};
export const getProductsOrder = (value: string): ThunkProductType => async (dispatch) => {
    console.log(value)
};
export const getProductsType = (value: string): ThunkProductType => async (dispatch) => {
    console.log(value)
};

export const addCartItem = (id: number): ThunkProductType => async (dispatch) => {
    dispatch(actions.setAddToCart(id));
};

export const updateQtyOfProduct = (id: number, qty: number):ThunkProductType => async (dispatch) =>{
    dispatch(actions.updateQty(id, qty));
};

export const getCartItem = (): ThunkProductType => async (dispatch) => {

};


export default ProductsReducer;

type ProductsInitialStateType = typeof ProductInitialState;
type ActionType = InferActionsTypes<typeof actions>;
type ThunkProductType = BaseThunkType<ActionType | FormAction>
