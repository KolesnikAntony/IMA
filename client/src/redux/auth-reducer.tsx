
import {BaseThunkType, InferActionsTypes} from "./store";
import {FormAction} from "redux-form";
import {AuthAPI} from "../api/api-auth";

const SIGN_UP = 'auth-reducer/SIGH_UP';

const initialState = {
    email: 'null' as string | null
};

const AuthReducer = (state = initialState, action: ActionType):InitialStateType => {
    switch (action.type) {
        case SIGN_UP:
            return {...state, email: action.email};

        default:
            return state;
    }
};

const actions = {
    signUp: (email: string | null) => ({
        type: SIGN_UP,
        email
    } as const)
};

export  const setToSignUP = (email: string, password: string):ThunkType => async (dispatch) => {
    let response = await AuthAPI.signUp(email, password);
    console.log(response);
    dispatch(actions.signUp('lalal'))
};



export default AuthReducer;


type InitialStateType = typeof  initialState;
type ActionType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionType | FormAction>