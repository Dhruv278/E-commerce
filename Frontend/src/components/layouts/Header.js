import React, { Fragment } from 'react'
import "./../../App.css"
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import logo from "../../logo1.png"
import Search from './Search';
import { logout } from '../../actions/userAction';

function Header() {

  const alert = useAlert();
  const dispatch = useDispatch();
  const { user, loading } = useSelector(state => state.auth);
  const logouthandler = () => {
    dispatch(logout());
    alert.success('Logged out successfully.');
  }

  const navigate = useNavigate();
  return (
    <Fragment>

      <nav className="navbar row">
        <div className="col-12 col-md-3 Navlogo">
          <div className="navbar-brand">
            <Link to="/">
              <img className='userProfileLogo' src={logo} />
            </Link>
          </div>
        </div>

        <div className="col-12 col-md-6 mt-2 mt-md-0 NavSearch">


          <Search history={navigate} />

        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center NavIcon" >


          {user
            ? (
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>

                <div className='ml-4 dropdown d-inline'>
                  <Link className='btn dropdown-toggle text-white mr-3'
                    type="button" id="dropDownMenuButton" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false"
                    style={{ display: 'flex', flexDirection: 'column' }}
                  >
                    <figure className='avatar avatar-nav'>
                      <img src={user.avatar && user.avatar.url} alt={user && user.name} className="rounded-circle" />

                    </figure>
                    <span>{user && user.name}</span>

                  </Link>

                  <div className='dropdown-menu' aria-labelledby='dropDownMenuButton'>

                    {user && user.role === 'admin' && (
                      <Link className='dropdown-item' to="/dashboard">Dashboard</Link>

                    )}
                    <Link className='dropdown-item' to="/orders/me">Orders</Link>
                    <Link className='dropdown-item' to="/me">Profile</Link>
                    <Link className='dropdown-item text-danger' to="/" onClick={logouthandler}>
                      Logout
                    </Link>


                  </div>
                </div>
                <Link to="/cart" style={{ textDecoration: 'none' }}>
                  <div>
                    <i className="fa badge" style={{ fontSize: "30px", paddingLeft: "15px", paddingTop: "3px" }} value={5} >&#xf07a;</i>
                  </div>
                </Link>
              </div>
            )
            : !loading && <Link to='/login' className="btn ml-4" id="login_btn"  >Login</Link>
          }



        </div>
      </nav>
    </Fragment>
  )
}

export default Header