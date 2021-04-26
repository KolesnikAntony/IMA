import {BaseThunkType, InferActionsTypes} from "./store";
import {FormAction, stopSubmit} from "redux-form";
import {AuthAPI} from "../api/api-auth";

const SIGN_UP = 'auth-reducer/SIGH_UP';
const LOGIN = 'auth-reducer/LOGIN';
const LOGOUT = 'auth-reducer/LOGOUT';

const initialState = {
    email: null as string | null,
    password: null as string | null,
    isSuccessReg: false,
    isAuth: false,
};

const AuthReducer = (state = initialState, action: ActionType): AuthInitialStateType => {
    switch (action.type) {
        case SIGN_UP:
            return {...state, isSuccessReg: true, email: action.email};
        case LOGIN:
            return {...state, isAuth: true, email: action.email};
        case LOGOUT:
            return {...state, isAuth: false};

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
    } as const),
    logout: () => ({
        type: LOGOUT
    } as const)
};

export const setIsAuth = ():ThunkType => async (dispatch) => {
    try {
        let res = await AuthAPI.me()
        console.log(res)
    }catch (err) {
        console.log(err.response);
    }
};


export const signUpThunk = (email: string, password: string): ThunkType => async (dispatch) => {
    try {
        const response = await AuthAPI.signUp(email, password);
        console.log(response);
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

export const activateUser = (key: string):ThunkType => async (dispatch) => {
    try {
        const response = await AuthAPI.activateUser(key);
        console.log(response)
    }catch (err) {
        console.log(err.response)
    }
};

export const logout = ():ThunkType => async (dispatch) => {
    try {
        const response = await AuthAPI.logout();
        console.log (response)
        dispatch(actions.logout())
    }catch (err) {
        console.log(err.response)
    }
};




export default AuthReducer;


export type AuthInitialStateType = typeof initialState;
type ActionType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionType | FormAction>