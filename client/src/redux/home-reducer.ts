import {ProductType} from "../types/types";
import {BaseThunkType, InferActionsTypes} from "./store";
import {ProductsAPI} from "../api/api-products";
import {FormAction} from "redux-form";


const SET_HOME_NEW_PRODUCTS = 'home-reducer/SET_HOME_NEW_PRODUCTS';
const SET_HOME_TOP_PRODUCTS = 'home-reducer/SET_HOME_TOP_PRODUCTS';


const HomeInitialState = {
    topProducts: [] as Array<ProductType>,
    newProducts: [] as Array<ProductType>,
};

const homeReducer = (state = HomeInitialState, action: ActionType): HomeInitialStateType=> {
    switch (action.type) {
        case SET_HOME_NEW_PRODUCTS:
            return {...state, newProducts: action.newProducts};

        case SET_HOME_TOP_PRODUCTS:
            return {...state, topProducts: action.topProducts};
        default:
            return state
    }
};

const actionsHome =  {
    setHomeNewProducts: (newProducts: Array<ProductType>) => ({
        type: SET_HOME_NEW_PRODUCTS,
        newProducts
    } as const),
    setHomeTopProducts: (topProducts: Array<ProductType>) => ({
        type: SET_HOME_TOP_PRODUCTS,
        topProducts
    } as const),
};


export const getTopProducts = (): ThunkHomeType => async (dispatch) => {
    const data = await ProductsAPI.getTopProducts();
    dispatch(actionsHome.setHomeTopProducts(data.products));
};

export const getNewProducts = (): ThunkHomeType => async (dispatch) => {
    const data = await ProductsAPI.getNewProducts();
    dispatch(actionsHome.setHomeNewProducts(data.products));
};

type HomeInitialStateType = typeof HomeInitialState;
type ActionType = InferActionsTypes<typeof actionsHome>;
type ThunkHomeType = BaseThunkType<ActionType  | FormAction>


export default homeReducer;

