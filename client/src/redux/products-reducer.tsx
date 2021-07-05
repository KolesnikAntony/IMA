import {FilterType, ProductType} from "../types/types";
import {BaseThunkType, InferActionsTypes} from "./store";
import {ProductsAPI} from "../api/api-products";
import {FILTER_TYPES} from "../constants/constants";
import product from "../pages/product/product";


const SET_SHOP_PRODUCTS = 'products-reducer/SET_SHOP_PRODUCTS';
const SET_CURRENT_PAGE = 'products-reducer/SET_CURRENT_PAGE';
const SET_TOTAL_PAGE = 'products-reducer/SET_TOTAL_PAGE';
const SET_FILTER = 'products-reducer/SET_FILTER';
const SET_FILTER_STATE = 'products-reducer/SET_FILTER_STATE';
const IS_FETCHING = 'products-reducer/IS_FETCHING';
const SET_SORT = 'products-reducer/SET_SORT';
const SET_IS_CART = 'products-reducer/SET_IS_CART';


const ProductsInitialState = {
    products: [] as Array<ProductType>,
    totalPages: 10,
    pageSize: 8,
    portionSize: 4,
    currentPage: 1,
    selectType: FILTER_TYPES.SELECT_TYPE.ALL,
    sort: FILTER_TYPES.SORT_TYPE.MAX,
    filterState: {
        category: [] as Array<{
            name: string
            _id: string
        }>,
        colors: [] as Array<string>,
    },
    filter: {
        category: [] as Array<{
            name: string
            _id: string
        }>,
        colors: [] as Array<string>,
    },
    isFetching: false,
};

const ProductsReducer = (state = ProductsInitialState, action: ProductsActionType): ProductsInitialStateType => {
    switch (action.type) {
        case SET_SHOP_PRODUCTS:
            return {...state, products: action.products};

        case SET_FILTER:
            return {...state, filter: action.filter};

        case SET_FILTER_STATE:

            return {...state, filterState: action.filterState};
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            };
        case SET_TOTAL_PAGE:
            return {
                ...state,
                totalPages: action.totalPages
            };

        case SET_SORT:
            return {...state, sort: action.sort, selectType: action.selectType};

        case IS_FETCHING:
            return {...state, isFetching: action.isFetching};

        case SET_IS_CART:
            let isCartProducts = state.products.map(el => action.ids.includes(el._id) ? {...el, isCart: true} : {
                ...el,
                isCart: false
            });

            return {...state, products: isCartProducts};

        default:
            return state
    }
};

export const actionsProducts = {
    setShopProducts: (products: Array<ProductType>) => ({
        type: SET_SHOP_PRODUCTS,
        products
    } as const),
    setTotalPage: (totalPages: number) => ({
        type: SET_TOTAL_PAGE,
        totalPages,
    } as const),
    setCurrentPage: (currentPage: number) => ({
        type: SET_CURRENT_PAGE,
        currentPage,
    } as const),
    setSort: (selectType: string, sort: string) => ({
        type: SET_SORT,
        selectType,
        sort
    } as const),
    setFetching: (isFetching: boolean) => ({
        type: IS_FETCHING,
        isFetching
    } as const),
    setFilter: (filter: FilterType) => ({
        type: SET_FILTER,
        filter
    } as const),
    setFilterState: (filterState: FilterType) => ({
        type: SET_FILTER_STATE,
        filterState
    } as const),
    setIsCart: (ids: Array<string>) => ({
        type: SET_IS_CART,
        ids
    } as const)
};

export const getProducts = (currentPage: number, selectType: string, sort: string): ThunkProductsType => async (dispatch, getState) => {
    let category = getState().products.filterState.category;
    let colors = getState().products.filterState.colors;

    dispatch(actionsProducts.setCurrentPage(currentPage));
    dispatch(actionsProducts.setFetching(true));
    const data = await ProductsAPI.getProducts(currentPage, selectType, sort, category, colors);
    dispatch(actionsProducts.setShopProducts(data.products));
    dispatch(actionsProducts.setTotalPage(data.pages));
    dispatch(actionsProducts.setSort(selectType, sort));


    if (localStorage.getItem('cartItem') != null) {
        let cartIds = localStorage.getItem('cartItem');
        let cartIdsArray = cartIds != null ? cartIds.split(',') : [];
        dispatch(actionsProducts.setIsCart(cartIdsArray));
    }

    dispatch(actionsProducts.setFetching(false));
};


export const getFilter = (): ThunkProductsType => async (dispatch) => {
    const filter = await ProductsAPI.getFilterData();
    dispatch(actionsProducts.setFilter(filter));
};

export const filterOfCategories = (category: Array<{ name: string, _id: string }>, colors: Array<string>): ThunkProductsType => async (dispatch, getState) => {
    let selectType = getState().products.selectType;
    let sort = getState().products.sort;

    let filterState = {
        category,
        colors
    };

    dispatch(actionsProducts.setFilterState(filterState));
    const data = await ProductsAPI.getProducts(1, selectType, sort, category, colors);

    dispatch(actionsProducts.setShopProducts(data.products));
    dispatch(actionsProducts.setTotalPage(data.pages));
};

export default ProductsReducer;

export type ProductsInitialStateType = typeof ProductsInitialState;
export type ProductsActionType = InferActionsTypes<typeof actionsProducts>;
type ThunkProductsType = BaseThunkType<ProductsActionType>
