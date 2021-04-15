import {AppStateType} from "./store";

export const getProducts = (state: AppStateType) => state.home.products;