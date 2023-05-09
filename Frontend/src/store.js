import {createStore,combineReducers,applyMiddleware} from 'redux';

import thunk from 'redux-thunk';
import {composeWithDevTools} from  'redux-devtools-extension'

import { deleteProductReducer, newProductReducer, newReviewReducer, productDeatilsReducer, productsReducer } from './reducers/productReducers';
import { authReducer,userReducer,forgotPasswordReducer } from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';
import { newOrderReducer,myOrdersReducer, orderDetails } from './reducers/orderReducer';

const reducer=combineReducers({
        products:productsReducer,
        productDetails:productDeatilsReducer,
        auth:authReducer,
        user:userReducer,
        forgotPassword:forgotPasswordReducer,
        cart:cartReducer,
        order:newOrderReducer,
        myOrders:myOrdersReducer,
        orderDetails:orderDetails,
        newReview:newReviewReducer,
        newProduct:newProductReducer,
        deleteProduct:deleteProductReducer
})


let initialState={
        cart:{
                cartItems:localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[],
                shippingInfo:localStorage.getItem('shippingInfo')?JSON.parse(localStorage.getItem('shippingInfo')):{}
        }
}


const middleware=[thunk];
const store=createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware) ))

export default store;