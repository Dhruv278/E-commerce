import React, { Fragment } from 'react'
import { Route, Navigate, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loader from '../layouts/Loader';

const ProtectRoute = ({ Component: Component,isAdmin, ...rest }) => {
    const { isAuthenticated, loading, user } = useSelector(state => state.auth);
    console.log(user)
    console.log(loading,isAuthenticated)
    return (
        <Fragment>
            {(loading || isAuthenticated==undefined) ?<Loader />:(

            (!isAuthenticated)?<Navigate to="/" /> :(isAdmin===true && user.role!=='admin'?<Navigate to="/" />: <Component />) 
            )}
            

        </Fragment>
    )
}

export default ProtectRoute