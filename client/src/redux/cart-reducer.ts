import {BaseThunkType, InferActionsTypes} from "./store";
import {CartType} from "../types/types";
import {ProductsAPI} from "../api/api-products";
import {actionsProducts, ProductsActionType} from "./products-reducer";
import {actionsHome, HomeActionType} from "./home-reducer";


const REMOVE_FROM_CART = 'products-reducer/REMOVE_FROM_CART';
const UPDATE_QTY = 'products-reducer/UPDATE_QTY';
const SET_IN_CART = 'products-reducer/SET_IN_CART';


const cartInitialState = {
    cart: [] as Array<CartType>,
};

const CartReducer = (state = cartInitialState, action: ActionType): cartInitialStateType => {
    switch (action.type) {
        case SET_IN_CART:
            return {...state, cart: action.cart};
        case UPDATE_QTY:
            let newCart = state.cart.map((item: CartType) => item._id == action.id ? {
                ...item,
                qty: action.qty
            } : {...item, qty: item.qty});
            return {...state, cart: newCart};

        case REMOVE_FROM_CART:
            return {...state, cart: state.cart.filter((el: CartType) => el._id != action.id)};
        default:
            return state
    }
};

export const actionsCart = {
    setInCart: (cart: Array<CartType>) => ({
        type: SET_IN_CART,
        cart
    } as const),
    updateQty: (id: string, qty: number) => ({
        type: UPDATE_QTY,
        id,
        qty
    } as const),
    removeFromCart: (id: string) => ({
        type: REMOVE_FROM_CART,
        id,
    } as const),
};

export const checkCartItems = (): ThunkCartType => async (dispatch) => {
    if (localStorage.getItem('cartItem') == null) {
        localStorage.setItem('cartItem', '');
    } else {
        let cartIds = localStorage.getItem('cartItem');
        let cartItems = await ProductsAPI.getCartProducts(cartIds);
        dispatch(actionsCart.setInCart(cartItems));
    }
};


export const getAddToCart = (id: string): ThunkCartType => async (dispatch) => {
    let cartIds = localStorage.getItem('cartItem');

    if (cartIds != null && !cartIds.includes(id)) {
        let newCartIds = cartIds !== '' ? `${cartIds},${id}` : id;
        localStorage.setItem('cartItem', newCartIds);

        let cartItems = await ProductsAPI.getCartProducts(newCartIds);

        dispatch(actionsCart.setInCart(cartItems));

        let cartIdsArray = newCartIds.split(',');
        dispatch(actionsProducts.setIsCart(cartIdsArray));
        dispatch(actionsHome.setIsCartItems(cartIdsArray));
    }
};

export const removeFromCart = (id: string): ThunkCartType => async (dispatch) => {
    let cartIds = localStorage.getItem('cartItem');
    if (cartIds != null && cartIds.includes(id)) {
        let newCartIds = cartIds.split(",").filter(el => el !== id).join(",");
        localStorage.setItem('cartItem', newCartIds);
        dispatch(actionsCart.removeFromCart(id));

        let cartIdsArray = newCartIds.split(',');
        dispatch(actionsProducts.setIsCart(cartIdsArray));
        dispatch(actionsHome.setIsCartItems(cartIdsArray));
    }
};


type cartInitialStateType = typeof cartInitialState;
type ActionType = InferActionsTypes<typeof actionsCart>;
type ThunkCartType = BaseThunkType<ActionType | ProductsActionType | HomeActionType>


export default CartReducer;

