import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedCaptainWrap = ({children}) => {
    const navigate = useNavigate();
    const protect = async() => {
        const token = await localStorage.getItem("token");
        // console.log(localStorage.getItem("token"))
        const {data} = await axios.get('http://13.126.18.104:4000/captain/profile',{headers:{token:localStorage.getItem("token")}});
        console.log(data)
        if(!data.success){
            navigate('/captainlogin')
        }
    }
    useEffect(()=>{
        protect()
    },[])
  return (
    <>
        {children}
    </>
  )
}

export default ProtectedCaptainWrap