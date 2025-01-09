import React, { useContext } from 'react'
import { auth2Context } from '../context/Captaincontext';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LiveTracking from '../components/LiveTracking';

const CaptainRidind = () => {
    const navigate = useNavigate();
    const {captain,setCaptain,pickAndDrop,setPickAndDrop} = useContext(auth2Context);
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
      const handleClick = async() => {
        try {
          const res = await axios.get('http://13.126.18.104:4000/ride/endride',{headers:{token:localStorage.getItem('token'),rideid:pickAndDrop?.rideid}});
          console.log(res.data);
          if(res.data.success){
            toast.success(res?.data?.message);
            setPickAndDrop({});
            setCaptain({});
            navigate('/captainhome');
          }
        } catch (error) {
          console.log(error);
        }
      }
  return (
    <div className='min-h-screen w-full overflow-hidden'>
      <Toaster />
      <img className='w-20 mt-3 ml-3 absolute top-5 left-5 mb-8' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="" />
      <div onClick={()=>handleLogout()} className='absolute top-5 right-5 z-10 h-4 w-4 rounded-full flex items-center justify-center p-6 bg-white '><i className="text-2xl ri-logout-box-r-line"></i></div>
        <LiveTracking />
        <div className='w-full p-2 mt-2'>
            <div className='flex items-center mb-3 p-3 border-b-2'>
            <i className="text-2xl mr-2 ri-map-pin-2-fill"></i>
            <div>
                <h3 className='mb-[-3px] font-semibold text-xl'>FROM</h3>
                <p className='text-md text-gray-400 capitalize'>{pickAndDrop?.pickup}</p>
            </div>
            </div>
            <div className='flex items-center mb-3 p-3 border-b-2'>
            <i className="text-2xl mr-2 ri-map-pin-range-fill"></i>
            <div>
                <h3 className='mb-[-3px] font-semibold text-xl'>TO</h3>
                <p className='text-md text-gray-400 capitalize'>{pickAndDrop?.destination}</p>
            </div>
            </div>
            <div className='flex items-center mb-2 p-3 border-b-2'>
            <i className="text-2xl mr-2 ri-money-rupee-circle-fill"></i>
            <div>
                <h3 className='mb-[-3px] font-semibold text-xl'>₹{pickAndDrop?.fare}</h3>
                <p className='text-md text-gray-400'>Accept with cash</p>
            </div>
            </div>
            <button onClick={()=>handleClick()} className='p-2 w-full rounded-md text-white bg-green-600 text-xl my-2'>Ride Completed</button>
        </div>
    </div>
  )
}

export default CaptainRidind