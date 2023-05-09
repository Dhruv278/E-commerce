import React, { useState } from 'react'
import { FaSearch,FaShoppingCart} from 'react-icons/fa';
import {useNavigate} from 'react-router-dom'
const Search = ({history}) => {
    const [keyword,setKeyword]=useState('');
    const navigate=useNavigate();
    
    const seachHandler=(e)=>{
        e.preventDefault();
        console.log(keyword+"--------------")
        if(keyword.trim()){
            navigate(`/search/${keyword}`)
        }else{
            navigate('/')
        }
    }
    return (
        <form onSubmit={seachHandler}>
            <div className="input-group">
                <input
                    type="text"
                    id="search_field"
                    className="form-control"
                    placeholder="Enter Product Name ..."
                    onChange={(e)=>setKeyword(e.target.value)}
                />
                <div className="input-group-append">
                    <button id="search_btn" className="btn">
                        <FaSearch></FaSearch>
                    </button>
                </div>
            </div>
        </form>
    )
}

export default Search