import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../layouts/MetaData'
import { FaEye } from 'react-icons/fa';
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../layouts/Loader'
import { myOrders, clearErrors } from '../../actions/orderAction'
import { useNavigate } from 'react-router-dom'

import './Listorder.css'

const ListOrders = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { loading, error, orders } = useSelector(state => state.myOrders);
    console.log(loading)
    useEffect(() => {
        console.log("works")
        dispatch(myOrders());
        console.log(error)
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }


    }, [dispatch, alert, error])

  
   

    return (
        <Fragment>
            <MetaData title={'Your Orders'} />
            <h1 className='mt-5'>My Orders</h1>
            {loading ? <Loader /> : (
                <div className="table-container">

                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th >Order ID</th>
                                <th >Number of Items</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>{console.log(orders)}
                            {orders.map(order => {
                                console.log(order._id)
                                return (
                                    <tr>
                                        <td data-label="ID">{order._id}

                                        </td>
                                        <td data-label="Total Items">{order.orderItems.length}

                                        </td>
                                        <td data-label="Amount">{order.totalPrice}

                                        </td>
                                        <td data-label="Date">{order.createdAt.split("T")[0]}</td>
                                        <td data-label="Status">{order.orderStatus}

                                        </td>

                                        <td data-label="Action"><Link to={`/order/${order._id}`} className="btn btn-primary"><FaEye></FaEye></Link>

                                        </td>

                                    </tr>
                                )
                            }
                            )}


                        </tbody>


                    </table>
                </div>
            )}
        </Fragment>
    )
}

export default ListOrders