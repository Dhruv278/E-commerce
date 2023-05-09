
import './App.css';
import Header from './components/layouts/Header';
import { Footer } from './components/layouts/Footer';
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react'
import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails';
import Login from './components/user/Login';
import Register from './components/user/register';
import { loadUser } from './actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import store from './store'
import Profile from './components/user/Profile';
// import Productoute from './components/route/ProtectRoute';
import ProtectRoute from './components/route/ProtectRoute';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import axios from 'axios';
import Payment from './components/cart/Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js'
import orderSuccess from './components/cart/orderSuccess';
import ListOrders from './components/order/ListOrders';
import OrderDetails from './components/order/OrderDetails';
import Dashboard from './components/admin/Dashboard';
import ProductList from './components/admin/ProductList';
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';

function App() {
  const [stripeApiKey, setStripeApiKey] = useState('');
  const {user,loading}=useSelector(state=>state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    // if(error)
    dispatch(loadUser())

    async function getStripeApi() {
      const { data } = await axios.get('/api/v1/payment/key')
      //  console.log(data)
      setStripeApiKey(data.stripeApiKey)
    }
    getStripeApi()
  }, [])

  return (
    <div className='App'>
      <Router>


        <Header />
        <div className='container container-fuild'>
          <Routes>
            <Route path='/' element={<Home />} exact />
            <Route path='/login' element={<Login />} exact />
            <Route path='/register' element={<Register />} exact />
            <Route path='/search/:keyword' element={<Home />} />
            <Route path='/product/:id' element={<ProductDetails />} exact />
            <Route path='/password/forgot' element={<ForgotPassword />} exact />
            <Route path='/password/reset/:token' element={<ResetPassword />} exact />
            <Route path='/cart' element={<Cart />} exact />



            <Route path='/orders/me' element={<ProtectRoute Component={ListOrders} />} />
            <Route path='/order/:id' element={<ProtectRoute Component={OrderDetails} />} />
            <Route path='/me' element={<ProtectRoute Component={Profile} />} exact />
            <Route path='/order/confirm' element={<ProtectRoute Component={ConfirmOrder} />} exact />
            <Route path='/shipping' element={<ProtectRoute Component={Shipping} />} exact />
            <Route path='/me/update' element={<ProtectRoute Component={UpdateProfile} />} />
            <Route path='/success' element={<ProtectRoute Component={orderSuccess} />} />
            <Route path='/password/update' element={<ProtectRoute Component={UpdatePassword} />} />
            {stripeApiKey &&
              <Route path='/payment' element={
                <Elements stripe={loadStripe(stripeApiKey)}>

                  <ProtectRoute Component={Payment} />
                </Elements>
              } />


            }
          </Routes>
        </div>
        <Routes>

        <Route path='/dashboard' element={<ProtectRoute Component={Dashboard} isAdmin={true} />} />
        <Route path='/admin/products' element={<ProtectRoute Component={ProductList} isAdmin={true} />} />
        <Route path='/admin/product' element={<ProtectRoute Component={NewProduct} isAdmin={true} />} />
        <Route path='/admin/product/:id' element={<ProtectRoute Component={UpdateProduct} isAdmin={true} />} />
        
        </Routes>
        {!loading  && user && user.role!='admin' && (

        <Footer />
        )}

      </Router>
    </div>
  );
}

export default App;
