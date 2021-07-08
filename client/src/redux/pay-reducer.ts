import {BaseThunkType, InferActionsTypes} from "./store";
import {FormAction} from "redux-form";
import {actionsAuth} from "./auth-reducer";


const SET_USER_INFO = 'pay-reducer/SET_USER_INFO';

const initialState = {

};

const payReducer = (state = initialState, action: ActionType): PayInitialStateType => {
    switch (action.type) {
        case SET_USER_INFO:
            return {...state}
        default:
            return state
    }
};

export const actionsPay = {
    setUserInfo: (info: any) => ({
        type: SET_USER_INFO,
        info
    } as const)
};

// const getUserPayInfo = (info: any):ThunkType => (dispatch) =>{
//
// };

export default payReducer;

export type PayInitialStateType = typeof initialState;
type ActionType = InferActionsTypes<typeof actionsPay>
type ThunkType = BaseThunkType<ActionType>