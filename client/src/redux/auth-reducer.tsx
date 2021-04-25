import {BaseThunkType, InferActionsTypes} from "./store";
import {FormAction, stopSubmit} from "redux-form";
import {AuthAPI} from "../api/api-auth";

const SIGN_UP = 'auth-reducer/SIGH_UP';

const initialState = {
    email: null as string | null,
    password: null as string | null,
    isSuccessReg: false,
};

const AuthReducer = (state = initialState, action: ActionType): AuthInitialStateType => {
    switch (action.type) {
        case SIGN_UP:
            return {...state, isSuccessReg: true, email: action.email, password: action.password};

        default:
            return state;
    }
};

const actions = {
    signUpSuccess: (email: string, password: string) => ({
        type: SIGN_UP,
        email,
        password,
    } as const)
};

export const setToSignUP = (email: string, password: string): ThunkType => async (dispatch) => {
    try {
        await AuthAPI.signUp(email, password);
        dispatch(actions.signUpSuccess(email,password));
    } catch (err) {
        console.log(err.response.data);
        dispatch(stopSubmit('registration', {_error: err.response.data.message }))
    }
};


export default AuthReducer;


export type AuthInitialStateType = typeof initialState;
type ActionType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionType | FormAction>