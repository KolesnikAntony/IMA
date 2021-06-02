import {BaseThunkType, InferActionsTypes} from "./store";
import {FormAction} from "redux-form";
import {ProductType} from "../types/types";
import {ProductsAPI} from "../api/api-products";

const SET_PRODUCT = 'product-reducer/SET_PRODUCT';
const SET_IS_FETCHING = 'product-reducer/SET_IS_FETCHING';

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
    isFetching: false
};

const ProductReducer = (state = productInitialState, action: ActionType):ProductInitialStateType => {
    switch (action.type) {
        case SET_PRODUCT:
            return {...state, product: {...action.product}};
        case SET_IS_FETCHING:
            return {...state, isFetching: action.isFetching};
        default:
            return state
    }
};

const actionsProduct = {
    setProduct: (product: ProductType) => ({
        type: SET_PRODUCT,
        product
    } as const) ,
    setIsFetching: (isFetching : boolean) => ({
        type: SET_IS_FETCHING,
        isFetching
    } as const)
};

export const getProduct = (id:string):ThunkProductType => async (dispatch) =>  {
    dispatch(actionsProduct.setIsFetching(true));
    let payload = await ProductsAPI.getProduct(id);
    dispatch(actionsProduct.setProduct(payload));
    dispatch(actionsProduct.setIsFetching(false));
};


export default ProductReducer;

type ProductInitialStateType = typeof productInitialState;
type ActionType = InferActionsTypes<typeof actionsProduct>;
type ThunkProductType = BaseThunkType<ActionType  | FormAction>