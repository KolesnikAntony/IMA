import {createStore} from "redux";
import {Action} from "redux";
import {applyMiddleware} from "redux";
import {combineReducers} from "redux"
import thunkMiddleWare, {ThunkAction} from "redux-thunk";
import homeReducer from "./home-reducer";
import {composeWithDevTools} from 'redux-devtools-extension';
import {reducer as formReducer} from 'redux-form'


const reducers = combineReducers(
    {
        home: homeReducer,
        form: formReducer,
    }
)

type RootReduserType = typeof reducers;
export type AppStateType = ReturnType<RootReduserType>;

type PropertiesActionType<T> = T extends { [key: string]: infer U } ? U : never;
export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesActionType<T>>

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

let store = createStore(reducers, composeWithDevTools(
    applyMiddleware(thunkMiddleWare)
    )


);
//@ts-ignore
+ window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
export default store;

