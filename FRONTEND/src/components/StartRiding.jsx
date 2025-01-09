import React, { useContext, useState } from 'react'
import { auth2Context } from '../context/Captaincontext';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authContext } from '../context/Usercontext';
import LiveTracking from './LiveTracking';

const StartRiding = () => {
    const navigate = useNavigate()
    const {captain,setCaptain,rideId} = useContext(auth2Context);
    const {otpMatched,setOtpMatched} = useContext(authContext);
    const [code,setCode] = useState("");
    const handleClick = async(e) => {
      e.preventDefault();
      console.log(rideId)
      const res = await axios.get('http://13.126.18.104:4000/ride/checkotp',{headers:{token:localStorage.getItem('token'),otp:code,rideid:rideId}});
      console.log(res.data)
      if(res.data.success){
        setOtpMatched(true);
        navigate('/captainriding')
      }
    }
    const handleLogout = async() => {
        const res = await axios.get('http://13.126.18.104:4000/captain/logout',{headers:{token:localStorage.getItem('token')}});
        console.log(res.data)
        if(res.data.success){
          toast.success(res?.data?.message);
          localStorage.removeItem("token");
          await setCaptain({});
          navigate('/captainlogin')
        }
        else{
          toast.error(res?.data?.message);
        }
      }
  return (
    <div className='h-screen w-full overflow-hidden'>
      <Toaster />
      <img className='w-20 mt-3 ml-3 absolute top-5 left-5 mb-8' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="" />
      <div onClick={()=>handleLogout()} className='absolute top-5 right-5 z-10 h-4 w-4 rounded-full flex items-center justify-center p-6 bg-white '><i className="text-2xl ri-logout-box-r-line"></i></div>
        <LiveTracking />
        <div className='w-full p-2 mt-2'>
            <div className='bg-yellow-400 rounded-lg p-2'>
            <h3 className='text-2xl font-semibold my-2 text-center'>Enter Code To Start</h3>
            <div className='p-2 bg-gray-100 text-gray-700 rounded-md'>
                    <form onSubmit={handleClick}>
                        <input value={code} onChange={(e)=>setCode(e.target.value)} className='w-full bg-transparent font-mono border-none outline-none p-2 rounded-md text-xl' type="number" placeholder='Enter the code' />
                        <button className='p-2 w-full rounded-md text-white bg-green-600 text-xl my-2'>Start Ride</button>
                    </form>
            </div>
            </div>
            
        </div>
    </div>
  )
}

export default StartRiding