import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../layouts/Loader'
import MetaData from '../layouts/MetaData'
import { Link, useNavigate } from 'react-router-dom'
import { login, clearErrors, loginWithOtpless } from '../../actions/userAction'
import { useSearchParams } from 'react-router-dom'
const Login = () => {
    const navigate = useNavigate();
    const alert = useAlert();
    const [searchParams] = useSearchParams();
    const redirect=searchParams.get('redirect') ?'/shipping':'/'
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
    
    useEffect(() => {
       
        window.otpless = (otplessUser) => {
         dispatch(loginWithOtpless(otplessUser.email.email));
        };

        return () => {

            document.body.removeChild(script);
        }
       }, []);
       
  const submitHandler=(e)=>{
    e.preventDefault();
   
    dispatch(login(email,password));
  }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Login'} />

                    <div className="row wrapper">
                        <div className="col-10 col-lg-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mb-3">Login</h1>
                                <div className="form-group">
                                    <label htmlFor="email_field">Email</label>
                                    <input 
                                    type="email" 
                                    id="email_field" 
                                    className="form-control" 
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password_field">Password</label>
                                    <input
                                     type="password"
                                      id="password_field" 
                                      className="form-control" 
                                      value={password}
                                      onChange={(e)=>setPassword(e.target.value)} />
                                </div>

                                <Link to="/password/forgot" className="float-right mb-4">Forgot Password?</Link>

                                <button id="login_button" type="submit" className="btn btn-block py-3">
                                    LOGIN
                                </button>

                                <Link to="/register" className="float-right mt-3">New User ? Please click here to register</Link>
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Login