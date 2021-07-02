import {ProductType} from "../types/types";
import {BaseThunkType, InferActionsTypes} from "./store";
import {ProductsAPI} from "../api/api-products";
import {FormAction} from "redux-form";
import {actionsProducts} from "./products-reducer";
import {InfoAPI} from "../api/api-info";


const SET_HOME_NEW_PRODUCTS = 'home-reducer/SET_HOME_NEW_PRODUCTS';
const SET_HOME_TOP_PRODUCTS = 'home-reducer/SET_HOME_TOP_PRODUCTS';
const SET_IS_CART_HOME = 'home-reducer/SET_IS_CART_HOME';
const SET_BUNNER_TEXT = 'home-reducer/SET_BUNNER_TEXT';


const HomeInitialState = {
    topProducts: [] as Array<ProductType>,
    newProducts: [] as Array<ProductType>,
    bannerText : ''
};

const homeReducer = (state = HomeInitialState, action: HomeActionType): HomeInitialStateType=> {
    switch (action.type) {
        case SET_HOME_NEW_PRODUCTS:
            return {...state, newProducts: action.newProducts};

        case SET_HOME_TOP_PRODUCTS:
            return {...state, topProducts: action.topProducts};

        case SET_IS_CART_HOME:
            let topIsCart = state.topProducts.map(el => action.ids.includes(el._id) ? {...el, isCart:true}: {...el, isCart:false});
            let newIsCart = state.newProducts.map(el => action.ids.includes(el._id) ? {...el, isCart:true}: {...el, isCart:false});

            return {...state, topProducts: topIsCart, newProducts: newIsCart};
        case SET_BUNNER_TEXT: {
            return {...state, bannerText: action.text};
        }
        default:
            return state
    }
};

export const actionsHome =  {
    setHomeNewProducts: (newProducts: Array<ProductType>) => ({
        type: SET_HOME_NEW_PRODUCTS,
        newProducts
    } as const),
    setHomeTopProducts: (topProducts: Array<ProductType>) => ({
        type: SET_HOME_TOP_PRODUCTS,
        topProducts
    } as const),
    setIsCartItems: (ids: Array<string>) => ({
        type: SET_IS_CART_HOME,
        ids
    }as const),
     setBannerText: (text: string) => ({
         type: SET_BUNNER_TEXT,
         text
     } as const)
};


const checkIsCartProduct = () => {
    if(localStorage.getItem('cartItem') != null){
        let cartIds = localStorage.getItem('cartItem');
        return cartIds != null ? cartIds.split(',') : [];
    }else{
        return []
    }
};

export const getTopProducts = (): ThunkHomeType => async (dispatch) => {
    const data = await ProductsAPI.getTopProducts();
    dispatch(actionsHome.setHomeTopProducts(data.products));
    dispatch(actionsHome.setIsCartItems(checkIsCartProduct()));
};

export const getNewProducts = (): ThunkHomeType => async (dispatch) => {
    const data = await ProductsAPI.getNewProducts();
    dispatch(actionsHome.setHomeNewProducts(data.products));
    dispatch(actionsHome.setIsCartItems(checkIsCartProduct()));
};

export const getHomeBannerText = (): ThunkHomeType => async (dispatch) => {
    const {content} = await InfoAPI.getBannerText();
  dispatch(actionsHome.setBannerText(content))
};

type HomeInitialStateType = typeof HomeInitialState;
export type HomeActionType = InferActionsTypes<typeof actionsHome>;
type ThunkHomeType = BaseThunkType<HomeActionType  | FormAction>


export default homeReducer;

