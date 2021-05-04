import {FormAction} from "redux-form";
import {BaseThunkType, InferActionsTypes} from "./store";
import {ProfileDataType, ProfileFormValueType} from "../types/types";
import {UserAPI} from "../api/api-user";

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
    name: 'Name',
    phone: '',
    photo: '',
};


const UserReducer = (state = initialState, action: ActionType): UserInitialStateType => {
    switch (action.type) {
        case SET_PHOTO:
            return state
        case SET_INFO_DATA:
            return {...state, address: {...action.address}, email: action.email, phone: action.phone, name: action.name}
        default:
            return state
    }
};


const actions = {
    setPhoto: (photo: string) => ({
        type: SET_PHOTO,
        photo
    } as const),
    setProfileData: (data: ProfileDataType) => ({
        type: SET_INFO_DATA,
        address: data.address,
        email: data.email,
        phone: data.phone,
        name: data.name
    } as const)
};


export const getPhoto = (photoFile: any): ThunkUserType => async (dispatch) => {
    dispatch(actions.setPhoto(photoFile));
};

export const getProfileData = (): ThunkUserType => async (dispatch) => {
    const data = await UserAPI.getUser();
    dispatch(actions.setProfileData(data));
};

export const updateUserInfo = (userInfo: ProfileFormValueType):ThunkUserType => async (dispatch) =>{
    const data = await UserAPI.uploadUser(userInfo);
    dispatch(actions.setProfileData(data));
};

export type UserInitialStateType = typeof initialState;
type ActionType = InferActionsTypes<typeof actions>
type ThunkUserType = BaseThunkType<ActionType | FormAction>

export default UserReducer;
