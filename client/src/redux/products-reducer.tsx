import {FormFilterDataType, ProductType} from "../types/types";
import {BaseThunkType, InferActionsTypes} from "./store";
import {FormAction} from "redux-form";

const SET_FILTER = 'products-reducer/SET_FILTER';
const ADD_TO_CART = 'products-reducer/ADD_TO_CART';

const ProductInitialState = {
    products: [
        {
            id: 1,
            title: 'laker',
            price: 30,
            color: 'red',
            categories: 'lakery',
            description: "ldld",
            shortDescr: 'dldldl',
            image: "https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_300/https://ima-professional.pl/wp-content/uploads/2021/01/Agate07-300x300.jpg",
            salePrice: null,
            sale: false,
            top: true,
            isNew: true,
        },
        {
            id: 2,
            title: 'laker',
            price: 30,
            color: 'green',
            categories: 'lakery',
            description: "ldld",
            shortDescr: 'dldldl',
            image: "https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_300/https://ima-professional.pl/wp-content/uploads/2021/01/Agate07-300x300.jpg",
            salePrice: 27,
            sale: false,
            top: true,
            isNew: true,

        },
        {
            id: 3,
            title: 'laker',
            price: 30,
            color: 'blue',
            categories: 'lakery',
            description: "ldld",
            shortDescr: 'dldldl',
            image: "https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_300/https://ima-professional.pl/wp-content/uploads/2021/01/Agate07-300x300.jpg",
            salePrice: null,
            sale: false,
            top: false,
            isNew: true,

        },
        {
            id: 4,
            title: 'laker',
            price: 30,
            color: 'green',
            categories: 'lakery',
            description: "ldld",
            shortDescr: 'dldldl',
            image: "https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_300/https://ima-professional.pl/wp-content/uploads/2021/01/Agate07-300x300.jpg",
            salePrice: null,
            sale: false,
            top: false,
            isNew: true,

        },
        {
            id: 5,
            title: 'base',
            price: 30,
            color: 'red',
            categories: 'base',
            description: "ldld",
            shortDescr: 'dldldl',
            image: "https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_300/https://ima-professional.pl/wp-content/uploads/2021/01/Agate07-300x300.jpg",
            salePrice: null,
            sale: false,
            top: false,
            isNew: true,

        },
        {
            id: 6,
            title: 'gel',
            price: 30,
            color: 'red',
            categories: 'base',
            description: "ldld",
            shortDescr: 'dldldl',
            image: "https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_300/https://ima-professional.pl/wp-content/uploads/2021/01/Agate07-300x300.jpg",
            salePrice: null,
            sale: false,
            top: false,
            isNew: true,

        },
        {
            id: 7,
            title: 'base',
            price: 30,
            color: 'red',
            categories: 'gel',
            description: "ldld",
            shortDescr: 'dldldl',
            image: "https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_300/https://ima-professional.pl/wp-content/uploads/2021/01/Agate07-300x300.jpg",
            salePrice: null,
            sale: false,
            top: false,
            isNew: true,

        },
        {
            id: 8,
            title: 'gel',
            price: 30,
            color: 'red',
            categories: 'gel',
            description: "ldld",
            shortDescr: 'dldldl',
            image: "https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_300/https://ima-professional.pl/wp-content/uploads/2021/01/Agate07-300x300.jpg",
            salePrice: null,
            sale: true,
            top: true,
            isNew: true,
        },
        {
            id: 9,
            title: 'gel',
            price: 30,
            color: 'red',
            categories: 'gel',
            description: "ldld",
            shortDescr: 'dldldl',
            image: "https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_300/https://ima-professional.pl/wp-content/uploads/2021/01/Agate07-300x300.jpg",
            salePrice: null,
            sale: false,
            top: false,
            isNew: true,
        }
    ] as Array<ProductType>,
    cart: []  as Array<ProductType> | []
};

const ProductsReducer = (state = ProductInitialState, action: ActionType):ProductsInitialStateType => {
    switch (action.type) {
        case SET_FILTER:
            return {...state, products: action.products};
        case ADD_TO_CART:
            return {...state, cart:[...state.cart, ...state.products.filter(el => el.id == action.id)]}
        default:
            return state
    }
};

const actions = {
    setFilter: (products: Array<ProductType>) => ({
        type: SET_FILTER,
        products,
    } as const),
    setCart: (id: number) => ({
        type: ADD_TO_CART,
        id
    } as const)
};


export const getFilter = (formData: FormFilterDataType):ThunkProductType => async (dispatch) => {
    let data = [{
        id: 1,
        title: 'laker',
        price: 30,
        color: 'red',
        categories: 'lakery',
        description: "ldld",
        shortDescr: 'dldldl',
        image: "https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_300/https://ima-professional.pl/wp-content/uploads/2021/01/Agate07-300x300.jpg",
        salePrice: null,
        sale: false,
        top: true,
        isNew: true,
    },];

    dispatch(actions.setFilter(data));
};

export const getProductsOrder = (value: string):ThunkProductType => async (dispatch) => {
    console.log(value)
};

export const getProductsType = (value: string):ThunkProductType => async (dispatch) => {
    console.log(value)
};

export const updateCartItem = (id: number):ThunkProductType => async (dispatch) => {
    dispatch(actions.setCart(id));
    let data = [];
    data.push(localStorage.getItem('cartItems'));
    data.push(id);
    localStorage.setItem('cartItems', JSON.stringify(data));
};

export const getCartItem = ():ThunkProductType => async (dispatch) => {
    let data = localStorage.getItem('cartItems');
    console.log(data);
};

export default ProductsReducer;

type ProductsInitialStateType = typeof ProductInitialState;
type ActionType = InferActionsTypes<typeof actions>;
type ThunkProductType = BaseThunkType<ActionType | FormAction>
