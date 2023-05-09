import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../layouts/MetaData'
// import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import { saveShippingInfo } from '../../actions/cartAction'
import { useNavigate } from 'react-router-dom'
import { countries } from 'countries-list'
import CheckoutSteps from './CheckoutSteps'


const ConfirmOrder = () => {
    const { cartItems, shippingInfo } = useSelector(state => state.cart)
    console.log(cartItems)
    const { user } = useSelector(state => state.auth);
    const navigate=useNavigate()
    // calculate Order Price
    const itemPrice=cartItems.reduce((acc,item)=>acc + item.price*item.quantity,0)
    const shippingPrice=itemPrice >200 ?0:25
    const taxPrice=Number((0.05 * itemPrice).toFixed(2))
    const totalPrice=(itemPrice+shippingPrice+taxPrice).toFixed(2)
 const processToPayment=()=>{
    const data={
        itemPrice:itemPrice.toFixed(2),
        shippingPrice,
        taxPrice,
        totalPrice
    }
    sessionStorage.setItem('orderInfo',JSON.stringify(data))
    navigate('/payment')
 }
    return (
        <Fragment>
            <MetaData title={'Confirm Order'} />
            <CheckoutSteps shipping confirmOrder />


            <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-8 mt-5 order-confirm">

                    <h4 className="mb-3">Shipping Info</h4>
                    <p><b>Name:</b> {user.name}</p>
                    <p><b>Phone:</b> {shippingInfo.phoneNo}</p>
                    <p className="mb-4"><b>Address:</b>{`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}</p>

                    <hr />
                    <h4 className="mt-4">Your Cart Items:</h4>
                    {
                        cartItems.map(item => (
                            <Fragment>
                                <hr />
                                <div className="cart-item my-1" key={item.product}>
                                    <div className="row carItemMainDiv">
                                        <div className="col-4 col-lg-2 cartItem">
                                            <img src={item.image} alt="Laptop" height="45" width="65" />
                                        </div>

                                        <div className="col-5 col-lg-6 cartItem">
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </div>


                                        <div className="col-4 col-lg-4 mt-4 mt-lg-0 cartItem">
                                            <p>{item.quantity} x ${item.price} = <b>${item.quantity * item.price}</b></p>
                                        </div>

                                    </div>
                                </div>
                                <hr />
                            </Fragment>
                        ))
                    }
                   


                </div>

                <div className="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4>Order Summary</h4>
                        <hr />
                        <p style={{textAlign:'left'}}>Subtotal:  <span className="order-summary-values ">${itemPrice.toFixed(2)}</span></p>
                        <p style={{textAlign:'left'}}> Shipping: <span className="order-summary-values">${shippingPrice}</span></p>
                        <p style={{textAlign:'left'}}>Tax:  <span className="order-summary-values">${taxPrice}</span></p>

                        <hr />

                        <p style={{textAlign:'left'}}>Total: <span className="order-summary-values">${totalPrice}</span></p>

                        <hr />
                        <button id="checkout_btn" 
                        className="btn btn-primary btn-block"
                        onClick={processToPayment}                        
                        >Proceed to Payment</button>
                    </div>
                </div>


            </div>
        </Fragment>
    )
}

export default ConfirmOrder