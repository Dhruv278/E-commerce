import { ADD_TO_CART, ADD_TO_CART_REQUEST, REMOVE_ITEM_CART, SAVE_SHIPPING_INFO } from "../constants/cardConstant";


export const cartReducer=(state={cartItems:[]},action)=>{

    switch(action.type){
        case ADD_TO_CART_REQUEST:
            return{
                ...state,
                loading:true
            }
        case ADD_TO_CART:
            const item=action.payload;
            const isItemExist=state.cartItems.find(i=>i.product===item.product)
            if(isItemExist){
                return{
                    ...state,
                    loading:false,
                    cartItems:state.cartItems.map(i=>i.product ===isItemExist.product ?item:i)
                }
            }else{
                return{
                    ...state,
                    loading:false,
                    cartItems:[...state.cartItems,item]
                }
            }
        case REMOVE_ITEM_CART:
            return{
                ...state,
                cartItems:state.cartItems.filter(i=>i.product!==action.payload)
            }
        case SAVE_SHIPPING_INFO:
            return{
                ...state,
                shippingInfo:state.shippingInfo
            }
        default:
            return{
                ...state
            }
    }
}