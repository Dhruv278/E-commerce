import axios from 'axios'

import {ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    CLEAR_ERROR,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    CREATE_NEW_PRODUCT_REQUEST,
    CREATE_NEW_PRODUCT_SUCCESS,
    CREATE_NEW_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL
} from "../constants/productConstants";


export const getProducts=(keyword='',currentPage=1,price=[0,1000],catogry,ratings=0)=>async(dispatch)=>{
    try{
        dispatch({
            type:ALL_PRODUCT_REQUEST
        })
        let link=`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${ratings}`;
        if(catogry){
            link=`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${catogry}`
        }
        const { data }=await axios.get(link);
        console.log(data)

        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:data
        })



    }catch(error){
       
        dispatch({
            type:ALL_PRODUCT_FAIL,
            payload:error.response.data.message
        })
    }
}

export const getAdminProducts=()=>async(dispatch)=>{
    try{
        dispatch({
            type:ADMIN_PRODUCT_REQUEST
        })
      
     
        const { data }=await axios.get('/api/v1/admin/products');

        dispatch({
            type:ADMIN_PRODUCT_SUCCESS,
            payload:data.products
        })



    }catch(error){
       
        dispatch({
            type:ADMIN_PRODUCT_FAIL,
            payload:error.response.data.message
        })
    }
}



export const getProductDetails=(id)=>async(dispatch)=>{
    try{
        dispatch({
            type:PRODUCT_DETAILS_REQUEST
        })

        const { data }=await axios.get(`/api/v1/product/${id}`);

        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data.product
        })



    }catch(error){
       
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:error.response.data.message
        })
    }
}
export const newReview=(reviewData)=>async(dispatch)=>{
    try{
        dispatch({
            type:NEW_REVIEW_REQUEST
        })
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }

        const { data }=await axios.put(`/api/v1/review`,reviewData,config);
        console.log(data)
        dispatch({
            type:NEW_REVIEW_SUCCESS,
            payload:data.success
        })



    }catch(error){
       
        dispatch({
            type:NEW_REVIEW_FAIL,
            payload:error.response.data.message
        })
    }
}
export const createNewProduct=(productData)=>async(dispatch)=>{
    try{
        dispatch({
            type:CREATE_NEW_PRODUCT_REQUEST
        })
        const config={
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data }=await axios.post(`/api/v1/admin/product/create`,productData,config);
        console.log(data)
        dispatch({
            type:CREATE_NEW_PRODUCT_SUCCESS,
            payload:data
        })



    }catch(error){
       
        dispatch({
            type:CREATE_NEW_PRODUCT_FAIL,
            payload:error.response.data.message
        })
    }
}
export const deleteProduct=(id)=>async(dispatch)=>{
    try{
        dispatch({
            type:DELETE_PRODUCT_REQUEST
        })
       

        const { data }=await axios.delete(`/api/v1/admin/product/${id}`);
        console.log(data)
        dispatch({
            type:DELETE_PRODUCT_SUCCESS,
            payload:data.success
        })



    }catch(error){
       
        dispatch({
            type:DELETE_PRODUCT_FAIL,
            payload:error.response.data.message
        })
    }
}
export const updateProduct=(id,productData)=>async(dispatch)=>{
    try{
        dispatch({
            type:UPDATE_PRODUCT_REQUEST
        })
        const config={
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data }=await axios.put(`/api/v1/admin/product/${id}`,productData,config);
        console.log(data)
        dispatch({
            type:UPDATE_PRODUCT_SUCCESS,
            payload:data.success
        })



    }catch(error){
       
        dispatch({
            type:UPDATE_PRODUCT_FAIL,
            payload:error.response.data.message
        })
    }
}

// 

export const clearErrors=()=>async(dispatch)=>{
    dispatch({
        type:CLEAR_ERROR
    })
}