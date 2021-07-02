import {BaseThunkType, InferActionsTypes} from "./store";
import {InfoAPI} from "../api/api-info";
import {AboutList} from "../types/types";
const SET_ABOUT_US_TEXT = 'about-reducer/GET_ABOUT_US_TEXT';
const SET_ABOUT_US_CARDS = 'about-reducer/GET_ABOUT_US_CARDS';
const IS_FETCHING = 'about-reducer/IS_FETCHING';


const initialState = {
    isFetching: false,
    aboutUsText: '',
    aboutUsCards: [] as AboutList,
};

const aboutUsReducer = (state = initialState, action: ActionType): AboutUsStateType => {
    switch (action.type) {
        case SET_ABOUT_US_TEXT:
            return {...state, aboutUsText: action.text};
        case SET_ABOUT_US_CARDS:
            return {...state, aboutUsCards: action.cards};
        case IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        default:
            return state;
    }
};

const actions = {
    setAboutUsText: (text: string) => ({
        type: SET_ABOUT_US_TEXT,
        text
    } as const),
    setAboutUsCards: (cards: AboutList) => ({
        type: SET_ABOUT_US_CARDS,
        cards
    } as const),
    setIsFetching: (isFetching: boolean) => (
        {
            type: IS_FETCHING,
            isFetching
        } as const)
};

export const getAboutUsPageData = ():ThunkType => async (dispatch) => {
    dispatch(actions.setIsFetching(true));
    let {content} = await InfoAPI.getAboutText();
    let res = await InfoAPI.getPhotoList();
    dispatch(actions.setAboutUsCards(res));
    dispatch(actions.setAboutUsText(content));
    dispatch(actions.setIsFetching(false));
};

export default aboutUsReducer;

export type AboutUsStateType = typeof initialState;
type ActionType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionType>