import React, { useContext, useEffect } from 'react'
import { authContext } from '../context/Usercontext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedUserWrap = ({children}) => {
    const navigate = useNavigate();
    const auth = async() => {
        const token =await localStorage.getItem("token");
        const {data} = await axios.get('http://13.126.18.104:4000/user/profile',{headers:{token:token}});
        console.log(data)
        if(!data.success){
          navigate('/login')
        }
    }
    useEffect(()=>{
        auth()
    },[])
  return (
    <>
        {children}
    </>
  )
}

export default ProtectedUserWrap