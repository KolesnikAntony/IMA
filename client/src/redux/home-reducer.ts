
import {ProductInitialState} from "./selectors";



 const homeReducer = (state = ProductInitialState, action: any): InitialStateType => {
    switch (action.type) {
        default:
            return state
    }
};

type InitialStateType = typeof  ProductInitialState;

export default homeReducer;

