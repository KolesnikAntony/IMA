import {Action, applyMiddleware, combineReducers, createStore} from "redux";
import thunk, {ThunkAction} from "redux-thunk";
import homeReducer from "./home-reducer";
import {composeWithDevTools} from 'redux-devtools-extension';
import {reducer as formReducer} from 'redux-form'
import UserReducer from "./user-reducer";
import AuthReducer from "./auth-reducer";
import ProductsReducer from "./products-reducer";
import ProductReducer from "./product-reducer";
import СartReducer from "./cart-reducer";
import CartReducer from "./cart-reducer";
import adminReducer from "./admin-reduser";
import aboutUsReducer from "./aboutPage-reducer";
import contactsReducer from "./contacts-reducer";

const middleware = [thunk];
const reducers = combineReducers(
    {
        auth: AuthReducer,
        products: ProductsReducer,
        productPage: ProductReducer,
        home: homeReducer,
        form: formReducer,
        user: UserReducer,
        cart: CartReducer,
        admin: adminReducer,
        aboutUs: aboutUsReducer,
        contacts: contactsReducer,
    }
);


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

type RootReduserType = typeof reducers;
export type AppStateType = ReturnType<RootReduserType>;

type PropertiesActionType<T> = T extends { [key: string]: infer U } ? U : never;
export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesActionType<T>>

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

const store = createStore(reducers, composeWithDevTools(
    applyMiddleware(...middleware)
    )
);
//@ts-ignore
+window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
export default store;

