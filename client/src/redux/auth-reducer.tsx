import {BaseThunkType, InferActionsTypes} from "./store";
import {FormAction, stopSubmit} from "redux-form";
import {AuthAPI} from "../api/api-auth";
import {getProfileData} from "./user-reducer";
import {ErrorType} from "../types/types";

const SIGN_UP = 'auth-reducer/SIGH_UP';
const IS_AUTH = 'auth-reducer/IS_AUTH';
const IS_FETCHING = 'auth-reducer/IS_FETCHING';
const SET_ERROR = 'auth-reducer/SET_ERROR';

const initialState = {
    email: null as string | null,
    password: null as string | null,
    isSuccessReg: false,
    isAuth: false,
    isFetching: false,
    isError: {
        errorText: '',
        toggle: false,
    } as ErrorType,
};

const AuthReducer = (state = initialState, action: ActionType): AuthInitialStateType => {
    switch (action.type) {
        case SIGN_UP:
            return {...state, isSuccessReg: true, email: action.email};
        case IS_AUTH:
            return {...state, isAuth: action.isAuth};
        case IS_FETCHING:
            return {...state, isFetching: action.isFetching};
        case SET_ERROR :
            return {...state, isError: action.isError};
        default:
            return state;
    }
};

export const actionsAuth = {
    signUpSuccess: (email: string) => ({
        type: SIGN_UP,
        email,
    } as const),
    setIsAuth: (isAuth: boolean) => ({
        type: IS_AUTH,
        isAuth
    } as const),
    setIsFetching: (isFetching: boolean) => ({
        type: IS_FETCHING,
        isFetching
    } as const),
    setError: (isError: ErrorType) => ({
        type: SET_ERROR,
        isError,
    } as const)


};

export const getIsAuth = ():ThunkType => async (dispatch) => {
    dispatch(actionsAuth.setIsFetching(true));
    try {
        await AuthAPI.me();
        dispatch(await getProfileData());
        dispatch(actionsAuth.setIsAuth(true));

    }catch (err) {
        console.log(err.response);
        dispatch(actionsAuth.setIsAuth(false));
    }
    dispatch(actionsAuth.setIsFetching(false));
};

export const signUpThunk = (email: string, password: string): ThunkType => async (dispatch) => {
    try {
        await AuthAPI.signUp(email, password);
        dispatch(actionsAuth.signUpSuccess(email))
    } catch (err) {
        dispatch(stopSubmit('registration', {_error: err.response.data.message }))
    }
};

export const loginThunk = (email: string, password: string):ThunkType => async (dispatch) => {
    try {
        await AuthAPI.login(email,password);
        dispatch(await getProfileData());
        dispatch(actionsAuth.setIsAuth(true))
    }catch (err) {
        if(err.response.status === 400){
            dispatch(stopSubmit('login', {_error: err.response.data.message}));
        }
    }
};

export const AdminLoginThunk = (email: string, password: string):ThunkType => async (dispatch) => {
    try {
        await AuthAPI.login(email,password);
        dispatch(await getProfileData());
        dispatch(actionsAuth.setIsAuth(true))
    }catch (err) {
        if(err.response.status === 400){
            dispatch(actionsAuth.setError({errorText: err.response.data.message, toggle: true}));
        }
    }
};


export const activateUser = (key: string):ThunkType => async (dispatch) => {
    try {
        await AuthAPI.activateUser(key);
    }catch (err) {
        console.log(err.response)
    }
};

export const logout = ():ThunkType => async (dispatch) => {
    try {
        await AuthAPI.logout();
        dispatch(actionsAuth.setIsAuth(false))
    }catch (err) {
        console.log(err.response)
    }
};

export default AuthReducer;

export type AuthInitialStateType = typeof initialState;
type ActionType = InferActionsTypes<typeof actionsAuth>
type ThunkType = BaseThunkType<ActionType | FormAction>