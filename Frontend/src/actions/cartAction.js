import axios from "axios";
import { ADD_TO_CART, ADD_TO_CART_REQUEST, REMOVE_ITEM_CART, SAVE_SHIPPING_INFO } from "../constants/cardConstant";


export const addItemToCart=(id,quantity)=>async(dispatch,getState)=>{
    dispatch({
        type:ADD_TO_CART_REQUEST
    })
    const { data }=await axios.get(`/api/v1/product/${id}`);
   console.log(data)
    dispatch({
        type:ADD_TO_CART,
        payload:{
            product:data.product._id,
            name:data.product.name,
            price:data.product.price,
            image:data.product.images[0].url,
            stock:data.product.stock,
            quantity
        }
    })
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}


export const reomveItemFromCart=(id)=>async(dispatch,getState)=>{
   
   
//    console.log(data)
    dispatch({
        type:REMOVE_ITEM_CART,
        payload:id
    })
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}

export const addQauntity=(id,quantity)=>async(dispatch,getState)=>{
    let isItemExist=getState().cart.cartItems.find(i=>i.product===id )
    isItemExist.quantity=quantity;
    dispatch({
        type:ADD_TO_CART,
        payload:{
            product:isItemExist.product,
            name:isItemExist.name,
            price:isItemExist.price,
            image:isItemExist.image,
            stock:isItemExist.stock,
            quantity
        }
    })
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
   
}



export const saveShippingInfo=(data)=>async(dispatch,getState)=>{
   
   
    //    console.log(data)
        dispatch({
            type:SAVE_SHIPPING_INFO,
            payload:data
        })
        localStorage.setItem('shippingInfo',JSON.stringify(data))
    }
