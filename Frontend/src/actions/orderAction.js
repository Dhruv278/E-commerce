import axios from "axios"
import { CLEAR_ERRORS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, MY_ORDERS_FAIL, MY_ORDERS_REQUEST, MY_ORDERS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS } from "../constants/orderConstant"
import { ADMIN_PRODUCT_REQUEST } from "../constants/productConstants"




export const createOrder=(order)=>async(dispatch,getState)=>{
    try{
        dispatch({
            type:CREATE_ORDER_REQUEST
        })

        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const { data }=await axios.post('/api/v1/order/new',order,config)
        console.log(data)
        dispatch({
            type:CREATE_ORDER_SUCCESS,
            payload:data.order
        })
    }catch(error){
        dispatch({
            type:CREATE_ORDER_FAIL,
            payload:error.response.data.message
        })
    }
}

export const myOrders=()=>async(dispatch)=>{
    try{
    dispatch({
        type:MY_ORDERS_REQUEST
    })
    const { data }=await axios.get('/api/v1/orders/me')
    console.log(data)
    dispatch({
        type:MY_ORDERS_SUCCESS,
        payload:data.orders
    })
}catch(err){
        dispatch({
            type:MY_ORDERS_FAIL,
            payload:err.response.data.message
        })
}
}

export const getOrderDetails=(id)=>async(dispatch)=>{
    try{
    dispatch({
        type:ORDER_DETAILS_REQUEST
    })
    const { data }=await axios.get(`/api/v1/order/${id}`)
    // console.log(data)
    dispatch({
        type:ORDER_DETAILS_SUCCESS,
        payload:data.order
    })
}catch(err){
        dispatch({
            type:ORDER_DETAILS_FAIL,
            payload:err.response.data.message
        })
}
}


export const clearErrors=()=>async(dispatch)=>{
    dispatch({
        type:CLEAR_ERRORS
    })
}


