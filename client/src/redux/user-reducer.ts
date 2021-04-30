import { FormAction } from "redux-form";
import { UserInfoPropsType } from "../types/types";
import {BaseThunkType, InferActionsTypes } from "./store";
import {UserAPI} from "../api/api-user";

const SET_SELF_DATA = 'user-reducer/SET_SELF_DATA';
const SET_PHOTO = 'user-reducer/SET_PHOTO';
const SET_INFO_DATA = 'user-reducer/SET_INFO_DATA';

const initialState = {
    name: 'Anton' as string | null,
    photo:  null as string | null,
    email: 'kolesiaaa@gmail.com' as string | null,
    phone: '+380935384862' as string | null,
    country: 'Poland' as string | null,
    address: 'Kabacki dukt' as string | null,
    numberOfFlat: "6" as string | null,
    numberOfHouse: '67' as string | null,
    kod: '314-313' as string | null
};


const UserReducer = (state = initialState, action: ActionType): UserInitialStateType => {
    switch (action.type) {
        case SET_SELF_DATA:
            return {...state, name: action.name,}
        case SET_PHOTO:
            return {...state, photo: action.photo}
        case SET_INFO_DATA:
            return {...state, email: action.email, phone: action.phone,
                address: action.address, kod: action.kod, country: action.country,
            numberOfFlat: action.numberOfFlat, numberOfHouse: action.numberOfHouse}
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
    setProfileData: (payload: UserInfoPropsType) => ({
        type: SET_INFO_DATA,
        email: payload.email,
        phone: payload.phone,
        address: payload.address,
        numberOfFlat: payload.numberOfFlat,
        numberOfHouse: payload.numberOfHouse,
        kod: payload.kod,
        country: payload.country
    } as const)
};

export const getNewName = (name: string | null):ThunkType => async (dispatch) => {
    dispatch(actions.setNewName(name));
};
export const getPhoto = (photoFile:any):ThunkType => async (dispatch) => {
    dispatch(actions.setPhoto(photoFile));
};
export const getProfileData = (payload: UserInfoPropsType):ThunkType => async (dispatch) => {

    // dispatch(actions.setProfileData(payload));
};

export type UserInitialStateType = typeof  initialState;
type ActionType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionType | FormAction>


export default UserReducer;
