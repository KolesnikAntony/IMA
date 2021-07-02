import {BaseThunkType, InferActionsTypes} from "./store";
import {ContactsType} from "../types/types";
import {InfoAPI} from "../api/api-info";

const SET_CONTACTS = 'about-reducer/SET_CONTACTS';



const initialState = {
    contacts: {} as ContactsType
};

const contactsReducer = (state = initialState, action: ActionType): ContactsStateType => {
    switch (action.type) {
        case SET_CONTACTS:
            return {...state, contacts: action.contacts}
        default:
            return state;
    }
};

const actions = {
   setContacts: (contacts: ContactsType) => ({
       type: SET_CONTACTS,
       contacts
   } as const)
};

export const getContacts = ():ThunkType => async (dispatch) => {
    let res = await InfoAPI.getContacts();
    dispatch(actions.setContacts(res));
};

export default contactsReducer;

export type ContactsStateType = typeof initialState;
type ActionType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionType>