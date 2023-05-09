import {
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    CLEAR_ERROR,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_RESET,
    NEW_REVIEW_SUCCESS,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    CREATE_NEW_PRODUCT_REQUEST,
    CREATE_NEW_PRODUCT_SUCCESS,
    CREATE_NEW_PRODUCT_FAIL,
    CREATE_NEW_PRODUCT_RESET,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_RESET,
    DELETE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_RESET,
    UPDATE_PRODUCT_SUCCESS
} from "../constants/productConstants";
import { NEW_PASSWORD_SUCCESS, UPDATE_PASSWORD_SUCCESS } from "../constants/userConstants";

export const productsReducer = ((state = { products: [] }, action) => {
    switch (action.type) {
        case ADMIN_PRODUCT_REQUEST:
        case ALL_PRODUCT_REQUEST:
            return {
                loading: true,
                products: []
            }

        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productCount: action.payload.productCount,
                resPerPage: action.payload.resPerPage,
                filterProductCount: action.payload.filterProductCount

            }
        case ADMIN_PRODUCT_SUCCESS:
            return{
                loading:false,
                products:action.payload
            }
        case ALL_PRODUCT_FAIL:
        case ADMIN_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
})


export const productDeatilsReducer = (state = { product: {} }, action) => {

    switch (action.type) {

        case PRODUCT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload
            }

        case PRODUCT_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
            }


        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}
export const newReviewReducer = (state = {}, action) => {

    switch (action.type) {

        case NEW_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload
            }

        case NEW_REVIEW_FAIL:
            return {
                ...state,
                loading:false,
                error: action.payload
            }

        case NEW_REVIEW_RESET:
            return{
                ...state,
                success:false
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}
export const newProductReducer = (state = {product:{},loading:false}, action) => {

    switch (action.type) {

        case CREATE_NEW_PRODUCT_REQUEST:
            return {
               
                loading: true,
            }

        case CREATE_NEW_PRODUCT_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                product:action.payload.product
            }

        case CREATE_NEW_PRODUCT_FAIL:
            return {
                ...state,
                loading:false,
                error: action.payload
            }

        case CREATE_NEW_PRODUCT_RESET:
            return{
                ...state,
                success:false
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}
export const deleteProductReducer = (state = {product:{}}, action) => {

    switch (action.type) {

        case DELETE_PRODUCT_REQUEST:
        case UPDATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            }


        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted:action.payload
            }
        case UPDATE_PRODUCT_SUCCESS:{
            return {
                ...state,
                loading:false,
                isUpdated:action.payload
            }
        }
        case DELETE_PRODUCT_FAIL:
        case UPDATE_PRODUCT_FAIL:
            return {
                ...state,
                loading:false,
                error: action.payload
            }

        case DELETE_PRODUCT_RESET:
            return{
                ...state,
                isDeleted:false
            }
        case UPDATE_PRODUCT_RESET:
            return{
                ...state,
                isUpdated:false
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}