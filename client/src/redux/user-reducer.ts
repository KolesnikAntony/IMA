import {FormAction} from "redux-form";
import {BaseThunkType, InferActionsTypes} from "./store";
import {ProfileDataType, ProfileFormValueType} from "../types/types";
import {UserAPI} from "../api/api-user";
import {toASCII} from "punycode";

const SET_PHOTO = 'user-reducer/SET_PHOTO';
const SET_INFO_DATA = 'user-reducer/SET_INFO_DATA';
const CHANGE_INFO_DATA = 'user-reducer/CHANGE_INFO_DATA';
const SET_IS_FETCHING = 'user-reducer/SET_IS_FETCHING';

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
    avatar: '',
    isFetching: false
};


const UserReducer = (state = userInitialState, action: ActionType): UserInitialStateType => {
    switch (action.type) {
        case SET_PHOTO:
            return {...state, avatar: action.photo};
        case SET_INFO_DATA:
            return {...state, address: {...action.address}, email: action.email, phone: action.phone, name: action.name, avatar: action.avatar}
            case CHANGE_INFO_DATA:
            return {...state, address: {...action.address}, email: action.email, phone: action.phone, name: action.name}
        case SET_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
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
        name: data.name,
        avatar: data.avatar
    } as const),
    changeProfileData: (data: ProfileDataType) => ({
        type: CHANGE_INFO_DATA,
        address: data.address,
        email: data.email,
        phone: data.phone,
        name: data.name,
    } as const),
    setIsFetching: (isFetching: boolean) => ({
        type: SET_IS_FETCHING,
        isFetching
    } as const)
};


export const getPhoto = (photoFile: any): ThunkUserType => async (dispatch) => {
    try {
        let res =  await UserAPI.uploadAvatar(photoFile);
        dispatch(actionsUser.setPhoto(res.user.avatar))
    }catch (err) {
        console.log(err.response.data);
    }

};

export const getProfileData = (): ThunkUserType => async (dispatch) => {
    dispatch(actionsUser.setIsFetching(true));
    const data = await UserAPI.getUser();
    dispatch(actionsUser.setProfileData(data));
    dispatch(actionsUser.setIsFetching(false))
};

export const updateUserInfo = (userInfo: ProfileFormValueType):ThunkUserType => async (dispatch) =>{
    const data = await UserAPI.uploadUser(userInfo);
    dispatch(actionsUser.changeProfileData(data));
};

export type UserInitialStateType = typeof userInitialState;
type ActionType = InferActionsTypes<typeof actionsUser>
type ThunkUserType = BaseThunkType<ActionType | FormAction>

export default UserReducer;
