import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../layouts/MetaData'
import { FaEye } from 'react-icons/fa';
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../layouts/Loader'
import { createNewProduct, clearErrors } from '../../actions/productActions'
import { useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import { CREATE_NEW_PRODUCT_RESET } from '../../constants/productConstants';


const NewProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, SetDescription] = useState('');
    const [category, setCategory] = useState('Electronics');
    const [stock, setStock] = useState(0);
    const [seller, setSeller] = useState('');
    const [images, setImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([]);
   const alert=useAlert();
    const catogries = [
        'Electronics',
        'Cameras',
        'Laptops',
        'Accessories',
        'Headphones',
        'Food',
        "Books",
        'Clothes/Shoes',
        'Beauty/Health',
        'Sports',
        'Outdoor',
        'Home'
    ]
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { loading, error, success } = useSelector(state => state.newProduct);
    console.log()
    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            navigate('/admin/products');
            alert.success('Product created successfuly');
            dispatch({ type: CREATE_NEW_PRODUCT_RESET })
        }
       

    }, [dispatch, alert, error,success])

    const submitHandler=(e)=>{
        e.preventDefault();
        const formData = new FormData()
        formData.set('name', name);
        formData.set('price', price);
        formData.set('description', description);
        formData.set('category', category);
        formData.set('stock', stock);
        formData.set('seller', seller);

        images.forEach(image => {
            formData.append('images', image);
        })
        console.log(formData.get('name'))
        dispatch(createNewProduct(formData));
    }
    const onChange = e => {
        
        console.log( e.target.files)
        const files = Array.from(e.target.files)
        console.log(files)
        setImagesPreview([])
        setImages([])

        files.forEach(file=>{
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, reader.result])
    
                }
            }
            reader.readAsDataURL(file);
            console.log(imagesPreview)
        })

    }


    return (

        <Fragment>
            <div className='row'>
                <div className='col-12 col-md-2'>
                    <Sidebar />

                </div>
                <div className='col-12 col-md-10'>
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" encType='multipart/form-data' onSubmit={submitHandler}>
                                <h1 className="mb-4">New Product</h1>

                                <div className="form-group">
                                    <label for="name_field">Name</label>
                                    <input
                                        type="text"
                                        id="name_field"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label for="price_field">Price</label>
                                    <input
                                        type="text"
                                        id="price_field"
                                        className="form-control"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label for="description_field">Description</label>
                                    <textarea
                                        className="form-control"
                                        id="description_field"
                                        rows="8"
                                        value={description}
                                        onChange={(e) => SetDescription(e.target.value)}
                                    ></textarea>
                                </div>

                                <div className="form-group">
                                    <label for="category_field">Category</label>
                                    <select className="form-control" id="category_field" value={category} onChange={(e) =>{
                                         setCategory(e.target.value)
                                         console.log(e.target.value)
                                         }}>
                                        {catogries.map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}

                                    </select>
                                </div>
                                <div className="form-group">
                                    <label for="stock_field">Stock</label>
                                    <input
                                        type="number"
                                        id="stock_field"
                                        className="form-control"
                                        value={stock}
                                        onChange={(e) => setStock(e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label for="seller_field">Seller Name</label>
                                    <input
                                        type="text"
                                        id="seller_field"
                                        className="form-control"
                                        value={seller}
                                        onChange={(e) => setSeller(e.target.value)} />
                                </div>

                                <div className='form-group'>
                                    <label>Images</label>

                                    <div className='custom-file'>
                                        <input type='file' name='product_images'
                                            className='custom-file-input'
                                            id='customFile'
                                            onChange={onChange}
                                            multiple />
                                        <label className='custom-file-label' for='customFile'>
                                            Choose Images
                                        </label>
                                    </div>
                                    {imagesPreview.map(img => (
                                        <img src={img} key={img} alt="Image Preview" className='mt-3 mr-2' width="55" height="52" />

                                    ))}
                                </div>
                                


                                <button 
                                id="login_button" 
                                type="submit" 
                                className="btn btn-block py-3"
                                disabled={loading?true:false}
                                >
                                    CREATE
                                </button>

                            </form>
                        </div>
                    </Fragment>
                </div>
            </div>
        </Fragment>
    )
}

export default NewProduct