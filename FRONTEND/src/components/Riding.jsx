import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { authContext } from '../context/Usercontext';
import LiveTracking from './LiveTracking';

const Riding = () => {
    const navigate = useNavigate();
    const {pickNdDrop} = useContext(authContext);
    // console.log(pickNdDrop)
  return (
    <div className='min-h-screen w-full overflow-hidden'>
        <div onClick={()=>navigate('/home')} className='absolute top-2 right-2 h-4 w-4 rounded-full flex items-center justify-center p-6 bg-white '><i className="text-2xl ri-home-2-line"></i></div>
        <LiveTracking />
        <div className='h-[45%] w-full p-2'>
            <h3 className='text-2xl font-bold my-2 ml-5 text-center'>Enjoy your Ride</h3>
        <div className='flex flex-col gap-2 justify-between items-center'>
        <div className='w-full p-2 mt-3'>
            <div className='flex items-center mb-3 p-3 border-b-2 border-t-2'>
            <i className="text-2xl mr-2 ri-map-pin-2-fill"></i>
            <div>
                <h3 className='mb-[-3px] font-semibold text-xl'>FROM</h3>
                <p className='text-md text-gray-400'>{pickNdDrop?.data?.pickup}</p>
            </div>
            </div>
            <div className='flex items-center mb-3 p-3'>
            <i className="text-2xl mr-2 ri-map-pin-range-fill"></i>
            <div>
                <h3 className='mb-[-3px] font-semibold text-xl'>TO</h3>
                <p className='text-md text-gray-400'>{pickNdDrop?.data?.destination}</p>
            </div>
            </div>
        </div>
        {/* <button onClick={()=>{setLoadingConfirmed(false);setDriver(true)}} className='w-full p-2 bg-green-600 font-semibold text-white text-xl rounded-lg'>Click</button> */}
        </div>
        </div>
    </div>
  )
}

export default Riding