import {BaseThunkType, InferActionsTypes} from "./store";
import {FormAction} from "redux-form";
import {ProductType} from "../types/types";
import {ProductsAPI} from "../api/api-products";

const SET_PRODUCT = 'product-reducer/SET_PRODUCT'

const productInitialState = {
    product: {
        id: 1,
        title: '',
        price: 1,
        description: '',
        shortDescr: '',
        subText: '',
        imageSrc: '',
        salePrice: null,
        isCart: false
    } as ProductType,
};

const ProductReducer = (state = productInitialState, action: ActionType):ProductInitialStateType => {
    switch (action.type) {
        case SET_PRODUCT:
            return {...state, product: {...action.payload}}

        default:
            return state
    }
};

const actionsProduct = {
    setProduct: (payload: ProductType) => ({
        type: SET_PRODUCT,
        payload
    }) as const,
};

export const getProduct = (id:number):ThunkProductType => async (dispatch) =>  {
    let payload = await ProductsAPI.getProduct(id);
    console.log(payload);
};


export default ProductReducer;

type ProductInitialStateType = typeof productInitialState;
type ActionType = InferActionsTypes<typeof actionsProduct>;
type ThunkProductType = BaseThunkType<ActionType  | FormAction>