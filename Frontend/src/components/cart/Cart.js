import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../layouts/MetaData'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import { addItemToCart, addQauntity, reomveItemFromCart } from '../../actions/cartAction'
import { useNavigate } from 'react-router-dom'


const Cart = () => {
    const navigate=useNavigate()
    const dispatch = useDispatch();
    const { cartItems,loading } = useSelector(state => state.cart)
    
    const increaseQty=(id,quantity,stock)=>{
        const newQty=quantity+1;

        if(newQty>=stock){
            return;
        }
        dispatch(addQauntity(id,newQty))
        // dispatch(addItemToCart(id,newQty))
    }

    const decreaseQty=(id,quantity)=>{
        const  newQty=quantity-1;
        if(newQty<1){
            return;
        }
        dispatch(addQauntity(id,newQty))
        // dispatch(addItemToCart(id,newQty));
    }
    
    const removeCartItem=(id)=>{
        dispatch(reomveItemFromCart(id))
    }

    const checkouthandler=()=>{
        navigate('/login?redirect=shipping')
    }
    return (
        <Fragment>
            <MetaData title={'Your Cart'} />
            {cartItems.length === 0 ? <h2 className='mt-5'>Your Cart is Empty</h2> : (
                <Fragment>
                    <h2 className="mt-5">Your Cart: <b>{cartItems.length}</b></h2>

                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-8">
                               {
                                cartItems.map(item => (
                                    <Fragment>
                                        <hr />
                                        <div className="cart-item" key={item.product}>
                                            <div className="row">
                                                <div className="col-4 col-lg-3">
                                                    <img src={item.image} alt="Laptop" height="90" width="115" />
                                                </div>

                                                <div className="col-5 col-lg-3">
                                                    <Link to={`/products/${item.product}`}>{item.name}</Link>
                                                </div>


                                                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                    <p id="card_item_price">${item.price}</p>
                                                </div>

                                                <div className="col-4 col-lg-3 mt-4 mt-lg-0 quantityClass">
                                                    <div className="stockCounter d-inline">
                                                        <button disabled={loading} className="btn btn-danger minus"  onClick={()=>decreaseQty(item.product,item.quantity)}>-</button>
                                                        <input type="number" className="form-control count d-inline" value={item.quantity} readOnly />

                                                        <button disabled={loading} className="btn btn-primary plus" onClick={()=>increaseQty(item.product,item.quantity,item.stock)}>+</button>
                                                    </div>
                                                </div>

                                                <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                                    <i id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick={()=>removeCartItem(item.product)}></i>
                                                </div>

                                            </div>
                                        </div>
                                    </Fragment>
                                ))
                            }
                            <hr />
                        </div>

                        <div className="col-12 col-lg-3 my-4">
                            <div id="order_summary">
                                <h4>Order Summary</h4>
                                <hr />
                                <p>Subtotal: <span className="order-summary-values">{cartItems.reduce((acc,item)=>(acc+Number(item.quantity)),0)}(Units)</span></p>
                                <p>Est. total: <span className="order-summary-values">${cartItems.reduce((acc,item)=>acc + item.quantity * item.price,0).toFixed(2)}</span></p>

                                <hr />
                                <button id="checkout_btn" className="btn btn-primary btn-block" onClick={checkouthandler}>Check out</button>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Cart