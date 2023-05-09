import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../layouts/MetaData'
import { FaEye } from 'react-icons/fa';
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../layouts/Loader'
import { getAdminProducts, clearErrors, deleteProduct } from '../../actions/productActions'
import { useNavigate } from 'react-router-dom'
import Sidebar from'./Sidebar'
import {MDBDataTable} from 'mdbreact'
import './../order/Listorder.css'
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';

const ProductList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { loading, error, products } = useSelector(state => state.products);
    const {error:deleteError,isDeleted}=useSelector(state=>state.deleteProduct)
    const alert=useAlert();
    console.log(loading)
    useEffect(() => {
        // console.log("works")
        dispatch(getAdminProducts());
        console.log(error)
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }
        if (isDeleted) {
            alert.success("Product Successfuly deleted");
            navigate('/admin/products')
            dispatch({type:DELETE_PRODUCT_RESET});

        }
        


    }, [dispatch, alert, error,deleteError,isDeleted])

    const setProducts=()=>{
        const data={
            columns:[
                {
                    label:'ID',
                    field:'id',
                    sort:'asc'

                },
                {
                    label:'Name',
                    field:'name',
                    sort:'asc'

                },
                {
                    label:'Price',
                    field:'price',
                    sort:'asc'

                },
                {
                    label:'Stock',
                    field:'stock',
                    sort:'asc'

                },
                {
                    label:'Actions',
                    field:'actions'

                },
            ],
            rows:[]
        }
        products.forEach(product => {
            data.rows.push({
                id:product._id,
                name:product.name,
                price:`${product.price} ₹`,
                stock:product.stock,
                actions:<Fragment>
                    <Link to={`/admin/product/${product._id}`} className="btn btn-primary py-1 px-2">
                        <i className='fa fa-pencil'></i>
                    </Link>
                    <button className='btn btn-danger py-1 px-2 ml-2' onClick={()=>deleteProductHandler(product._id)}>
                        <i className='fa fa-trash'></i>

                    </button>
                </Fragment>
                
            })
        });
        console.log(data)
        return data
    }
    const deleteProductHandler=(id)=>{
        dispatch(deleteProduct(id));

    }
    return (
        <Fragment>
            <div className='row'>
                <div className='col-12 col-md-2'>
                    <Sidebar />
                    
                </div>
                <div className='col-12 col-md-10'>
                    <Fragment>
                        <h1 className='my-5'>All Products</h1>
                        {loading?<Loader />:(
                            <MDBDataTable 
                             data={setProducts()}
                             className="px-3"
                             bordered
                             striped
                             hover
                            />
                        ) }
                    </Fragment>
                </div>
            </div>
            
        </Fragment>
    )
}

export default ProductList