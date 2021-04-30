import {FormAction} from "redux-form";
import {BaseThunkType, InferActionsTypes} from "./store";
import {ProfileDataType, UserAPI} from "../api/api-user";

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
    name: 'Name',
    phone: '',
    photo: '',
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
    setProfileData: (data: ProfileDataType) => ({
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
export const updateUserInfo = (userInfo: ProfileDataType):ThunkType => async (dispatch) =>{
    console.log(userInfo);
    const data = await UserAPI.uploadUser(userInfo);
    console.log(data);
    dispatch(actions.setProfileData(data));
};

export type UserInitialStateType = typeof initialState;
type ActionType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionType | FormAction>



export default UserReducer;
