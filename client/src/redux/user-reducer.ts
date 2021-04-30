import {FormAction} from "redux-form";
import {BaseThunkType, InferActionsTypes} from "./store";
import {UserAPI} from "../api/api-user";

const SET_SELF_DATA = 'user-reducer/SET_SELF_DATA';
const SET_PHOTO = 'user-reducer/SET_PHOTO';
const SET_INFO_DATA = 'user-reducer/SET_INFO_DATA';

const initialState = {
    address: {
        build: '',
        city: '',
        flat: '',
        kod: '',
        street: '',
    },
    email: '',
    name: '',
    phone: '',
};


const UserReducer = (state = initialState, action: ActionType): UserInitialStateType => {
    switch (action.type) {
        case SET_SELF_DATA:
            return state
        case SET_PHOTO:
            return state
        case SET_INFO_DATA:
            return {...state, address: {...action.address}, email: action.email, phone: action.phone, name: action.name}
        default:
            return state
    }
};


const actions = {
    setNewName: (name: string | null,) => ({
        type: SET_SELF_DATA,
        name,
    } as const),
    setPhoto: (photo: string) => ({
        type: SET_PHOTO,
        photo
    } as const),
    setProfileData: (data: ProfileData) => ({
        type: SET_INFO_DATA,
        address: data.address,
        email: data.email,
        phone: data.phone,
        name: data.name
    } as const)
};

export const getNewName = (name: string | null): ThunkType => async (dispatch) => {
    dispatch(actions.setNewName(name));
};
export const getPhoto = (photoFile: any): ThunkType => async (dispatch) => {
    dispatch(actions.setPhoto(photoFile));
};
export const getProfileData = (): ThunkType => async (dispatch) => {

    const data = await UserAPI.getUser();
    console.log('thunk is work');
    dispatch(actions.setProfileData(data));
};

export type UserInitialStateType = typeof initialState;
type ActionType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionType | FormAction>
type ProfileData = {
    address: {
        kod: string
        street: string
        build: string
        flat: string
        city: string
    },
    email: string
    phone: string
    name: string
}


export default UserReducer;
