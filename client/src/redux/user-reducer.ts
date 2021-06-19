import {FormAction} from "redux-form";
import {BaseThunkType, InferActionsTypes} from "./store";
import {ProfileDataType, ProfileFormValueType} from "../types/types";
import {UserAPI} from "../api/api-user";

const SET_PHOTO = 'user-reducer/SET_PHOTO';
const SET_INFO_DATA = 'user-reducer/SET_INFO_DATA';

const userInitialState = {
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
    photo: '',
};


const UserReducer = (state = userInitialState, action: ActionType): UserInitialStateType => {
    switch (action.type) {
        case SET_PHOTO:
            return state;
        case SET_INFO_DATA:
            return {...state, address: {...action.address}, email: action.email, phone: action.phone, name: action.name}
        default:
            return state
    }
};


const actionsUser = {
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
    await UserAPI.uploadAvatar(photoFile);
    //dispatch(actionsUser.setPhoto(photoFile));
};

export const getProfileData = (): ThunkUserType => async (dispatch) => {
    const data = await UserAPI.getUser();
    dispatch(actionsUser.setProfileData(data));
};

export const updateUserInfo = (userInfo: ProfileFormValueType):ThunkUserType => async (dispatch) =>{
    const data = await UserAPI.uploadUser(userInfo);
    dispatch(actionsUser.setProfileData(data));
};

export type UserInitialStateType = typeof userInitialState;
type ActionType = InferActionsTypes<typeof actionsUser>
type ThunkUserType = BaseThunkType<ActionType | FormAction>

export default UserReducer;
