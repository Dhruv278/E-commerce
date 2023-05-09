import axios from 'axios';
import {LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAIL,CLEAR_ERRORS, REGISTER_USER_REQUESt, REGISTER_USER_SUCCESS, REGISTER_USER_FAil, LOAD_USER_REQUEST, LOAD_USER_FAIL, LOAD_USER_SUCCESS, LOGOUT_SUCCESS, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL,UPDATE_PASSWORD_REQUEST,UPDATE_PASSWORD_SUCCESS,UPDATE_PASSWORD_FAIL,UPDATE_PASSWORD_RESET, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAIL, NEW_PASSWORD_REQUEST, NEW_PASSWORD_SUCCESS, NEW_PASSWORD_FAIL} from '../constants/userConstants'

export const login=(email,password)=>async(dispatch)=>{
    try{
        dispatch({type:LOGIN_REQUEST});
        const config= {
            headers:{

                'Content-Type': 'multipart/form-data'
            },
            // withCredentials: true
          }
        const { data }=await axios.post('/api/v1/login',{email,password},config)

        dispatch({
            type:LOGIN_SUCCESS,
            payload:data.user
        })
    }catch(err){
        dispatch({
            type:LOGIN_FAIL,
            payload:err.response.data.message
        })
    }
}

export const loginWithOtpless=(email)=>async(dispatch)=>{
    try{
        dispatch({type:LOAD_USER_REQUEST});
        const config= {
            headers:{

                'Content-Type': 'multipart/form-data'
            },
        }
        const { data }=await axios.post('/api/v1/loginWithOtpless',{email},config)
        dispatch({
            type:LOGIN_SUCCESS,
            payload:data.user
        })
    }catch(err){
        dispatch({
            type:LOGIN_FAIL,
            payload:err.response.data.message
        })
    }
}

export const register=(userData)=>async(dispatch)=>{
    try{
        dispatch({type:REGISTER_USER_REQUESt});
        const config= {
            headers:{

                'Content-Type': 'multipart/form-data',
            },
            
            
          }
        const { data }=await axios.post('/api/v1/register',userData,config)

        dispatch({
            type:REGISTER_USER_SUCCESS,
            payload:data.user
        })
    }catch(err){
     
        dispatch({
            type:REGISTER_USER_FAil,
            payload:err.response.data.message
        })
    }
}



export const loadUser=()=>async(dispatch)=>{
    try{
        dispatch({type:LOAD_USER_REQUEST});
        
        const { data }=await axios.get('/api/v1/getUserByToken')
        

        dispatch({
            type:LOAD_USER_SUCCESS,
            payload:data.user
        })
    }catch(err){
       
        dispatch({
            type:LOAD_USER_FAIL,
            payload:null
        })
    }
}

export const logout=()=>async(dispatch)=>{
    try{
 
        
       await axios.get('/api/v1/logout')
        

        dispatch({
            type:LOGOUT_SUCCESS
            // payload:data.user
        })
    }catch(err){
       
        dispatch({
            type:LOAD_USER_FAIL,
            payload:err.response.data.message
        })
    }
}



// Update Profile

export const updateProfile=(userData)=>async(dispatch)=>{
    try{
        dispatch({type:UPDATE_PROFILE_REQUEST});
        const config= {
            'Content-Type': 'multipart/form-data'
          }
        const { data }=await axios.put('/api/v1/me/update',userData,config)

        dispatch({
            type:UPDATE_PROFILE_SUCCESS,
            payload:data.success
        })
    }catch(err){
     
        dispatch({
            type:UPDATE_PROFILE_FAIL,
            payload:err.response.data.message
        })
    }
}


// Update password
export const updatePassword=(password)=>async(dispatch)=>{
    try{
        dispatch({type:UPDATE_PASSWORD_REQUEST});
        const config= {
            'Content-Type': 'multipart/form-data'
          }
        const { data }=await axios.put('/api/v1/password/update',password,config)

        dispatch({
            type:UPDATE_PASSWORD_SUCCESS,
            payload:data.success
        })
    }catch(err){
     
        dispatch({
            type:UPDATE_PASSWORD_FAIL,
            payload:err.response.data.message
        })
    }
}
export const forgotPassword=(email)=>async(dispatch)=>{
    try{
        dispatch({type:FORGOT_PASSWORD_REQUEST});
        const config= {
            'Content-Type': 'multipart/form-data'
          }
        const { data }=await axios.post('/api/v1/password/forgot',email,config)

        dispatch({
            type:FORGOT_PASSWORD_SUCCESS,
            payload:data.message
        })
    }catch(err){
     
        dispatch({
            type:FORGOT_PASSWORD_FAIL,
            payload:err.response.data.message
        })
    }
}
export const resetPassword=(token,password)=>async(dispatch)=>{
    try{
        dispatch({type:NEW_PASSWORD_REQUEST});
        const config= {
            'Content-Type': 'multipart/form-data'
          }
        const { data }=await axios.put(`/api/v1/password/reset/${token}`,password,config)

        dispatch({
            type:NEW_PASSWORD_SUCCESS,
            payload:data.success
        })
    }catch(err){
     
        dispatch({
            type:NEW_PASSWORD_FAIL,
            payload:err.response.data.message
        })
    }
}

export const clearErrors=()=>async(dispatch)=>{
    dispatch({
        type:CLEAR_ERRORS
    })
}

export const setError=(message)=>async(dispatch)=>{
    dispatch({
        type:REGISTER_USER_FAil,
        payload:message
    })
}