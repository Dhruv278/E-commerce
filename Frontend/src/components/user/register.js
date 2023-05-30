import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../layouts/Loader'
import MetaData from '../layouts/MetaData'
import { Link, useNavigate } from 'react-router-dom'
import { register, clearErrors,setError } from '../../actions/userAction'
import Resizer from "react-image-file-resizer";
import { useSearchParams } from 'react-router-dom'
const Register = () => {
    const [searchParams] = useSearchParams();
    const redirect=searchParams.get('redirect') ?'/shipping':'/'
    const navigate = useNavigate();
    const alert=useAlert();
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password:'',

    });
    const [avatarPreview, setAvatarPreview] = useState('/default_avatar.jpg');
    const [avatar, setAvatar] = useState('');
    const { isAuthenticated, error, loading } = useSelector(state => state.auth);


    
    useEffect(() => {
       
       
    
        if (isAuthenticated) {
           navigate(redirect)
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    
    }, [dispatch, alert, error, isAuthenticated])

    const submitHandler = (e) => {
        e.preventDefault();
        // console.log(email, password)
        const formData = new FormData()
        formData.set('name', user.name);
        formData.set('email', user.email);
        formData.set('password', user.password);
        formData.set('avatar', avatar);
        if(user.password!==user.confirm_password){
            dispatch(setError('Password is not matched with Confirm Password, Please enter data again.'))
        }else{

            dispatch(register(formData));
        }
    }

  const onChange=e=>{
    if(e.target.name=='avatar'){
        const reader=new FileReader();
        reader.onload=async()=>{
            if(reader.readyState===2){
                setAvatarPreview(reader.result)
                const file = e.target.files[0];
                const image = await resizeFile(file);
                console.log(image);
                setAvatar(image);
                console.log(avatarPreview)

            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }else{
      
        setUser({...user,[e.target.name]:e.target.value});
    }
  }
  const resizeFile = (file) => new Promise(resolve => {
    Resizer.imageFileResizer(file, 300, 300, 'JPEG', 100, 0,
    uri => {
      resolve(uri);
    },
    'base64'
    );
});

    return (
        <Fragment>
            <MetaData title={'Register User'} />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                        <h1 className="mb-3">Register</h1>

                        <div className="form-group">
                            <label htmlFor="email_field">Name</label>
                            <input 
                            type="name"
                             id="name_field"
                              className="form-control" 
                             value={user.name}
                             name="name"
                             onChange={onChange}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input 
                            type="email"
                             id="email_field"
                             name='email'
                              className="form-control" 
                              value={user.email}
                              onChange={onChange} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input type="password" 
                            id="password_field" 
                            className="form-control" 
                            value={user.password}
                            name='password'
                            onChange={onChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password_field">Confirm Password</label>
                            <input type="password" 
                            id="password_field" 
                            className="form-control" 
                            value={user.confirm_password}
                            name='confirm_password'
                            onChange={onChange} />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='avatar_upload'>Avatar</label>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <figure className='avatar mr-3 item-rtl'>
                                        <img
                                         src={avatarPreview}
                                          className='rounded-circle'
                                           alt='image' />
                                    </figure>
                                </div>
                                <div className='custom-file'>
                                    <input 
                                    type='file'
                                     name='avatar' 
                                     className='custom-file-input'
                                     id='customFile'
                                     accept='images/*'
                                     onChange={onChange}

                                     />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Avatar
                                    </label>
                                </div>
                            </div>
                        </div>

                        <button
                         id="register_button"
                          type="submit" 
                          className="btn btn-block py-3 br-10"
                          disabled={loading?true:false}
                          >
                            REGISTER
                        </button>
                  
                    </form>
                    
                      
                </div>
            </div>
        </Fragment>
    )
}

export default Register