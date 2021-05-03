import {ProductInitialState} from "./selectors";



const ProductsReducer = (state = ProductInitialState, action: any): InitialStateType => {
    switch (action.type) {
        default:
            return state
    }
}

type InitialStateType = typeof  ProductInitialState;

export default ProductsReducer;

