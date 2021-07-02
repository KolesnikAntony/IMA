import {BaseThunkType, InferActionsTypes} from "./store";
import {FormAction, stopSubmit} from "redux-form";
import {AuthAPI} from "../api/api-auth";
import {getProfileData} from "./user-reducer";
import {STATE_TYPES} from "../constants/constants";

const SIGN_UP = 'auth-reducer/SIGH_UP';
const IS_AUTH = 'auth-reducer/IS_AUTH';

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
        case IS_AUTH:
            return {...state, isAuth: action.isAuth};

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


};

export const getIsAuth = ():ThunkType => async (dispatch) => {
    try {
        await AuthAPI.me();
        dispatch(await getProfileData());
        dispatch(actionsAuth.setIsAuth(true))
    }catch (err) {
        dispatch(actionsAuth.setIsAuth(false));
        console.log(err.response);
    }
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
       dispatch(stopSubmit('login', {_error: err.response.data.message}));
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