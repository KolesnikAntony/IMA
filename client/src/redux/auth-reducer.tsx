import {BaseThunkType, InferActionsTypes} from "./store";
import {FormAction, stopSubmit} from "redux-form";
import {AuthAPI} from "../api/api-auth";

const SIGN_UP = 'auth-reducer/SIGH_UP';
const LOGIN = 'auth-reducer/LOGIN';

const initialState = {
    email: null as string | null,
    password: null as string | null,
    isSuccessReg: false,
    isAuth: false,
};

const AuthReducer = (state = initialState, action: ActionType): AuthInitialStateType => {
    switch (action.type) {
        case SIGN_UP:
            return {...state, isSuccessReg: true};
        case LOGIN:
            return {...state, isAuth: true, email: action.email};

        default:
            return state;
    }
};

const actions = {
    signUpSuccess: (email: string, password: string) => ({
        type: SIGN_UP,
        email,
        password,
    } as const),
    loginSuccess: (email: string) => ({
        type: LOGIN,
        email,
    } as const)
};

export const signUpThunk = (email: string, password: string): ThunkType => async (dispatch) => {
    try {
        await AuthAPI.signUp(email, password);
        dispatch(actions.signUpSuccess(email,password));
    } catch (err) {
        dispatch(stopSubmit('registration', {_error: err.response.data.message }))
    }
};

export const loginThunk = (email: string, password: string):ThunkType => async (dispatch) => {
    try {
        await AuthAPI.login(email,password);
        dispatch(actions.loginSuccess(email));
    }catch (err) {
       dispatch(stopSubmit('login', {_error: err.response.data.message}));
    }
};



export default AuthReducer;


export type AuthInitialStateType = typeof initialState;
type ActionType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionType | FormAction>