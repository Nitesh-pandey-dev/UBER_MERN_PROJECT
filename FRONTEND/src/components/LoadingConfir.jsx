import React from 'react'
import LoadingLine from './LoadingLine'

const LoadingConfirm = ({setLoadingConfirmed,setDriver,pickup,destination,selectedVehicle,image}) => {
  return (
    <div>
        <h4 onClick={()=>{setLoadingConfirmed(false)}} className='absolute top-0 left-0 w-full py-2 text-center'><i className="text-xl ri-arrow-down-wide-line"></i></h4>
        <h3 className='text-2xl mb-3 mt-7 font-semibold text-center'>Looking for nearby drivers</h3>
        <div className='h-[4px] w-full flex justify-center'>
            <LoadingLine />
        </div>
        <div className='flex flex-col gap-3 justify-between items-center'>
        <img className='w-24 object-cover object-center mt-2' src={image} alt="" />
        <div className='w-full p-2 mt-3'>
            <div className='flex items-center mb-3 p-3 border-b-2 border-t-2'>
            <i className="text-2xl mr-2 ri-map-pin-2-fill"></i>
            <div>
                <h3 className='mb-[-3px] font-semibold text-xl'>From</h3>
                <p className='text-md text-gray-400'>{pickup}</p>
            </div>
            </div>
            <div className='flex items-center mb-3 p-3 border-b-2'>
            <i className="text-2xl mr-2 ri-map-pin-range-fill"></i>
            <div>
                <h3 className='mb-[-3px] font-semibold text-xl'>To</h3>
                <p className='text-md text-gray-400'>{destination}</p>
            </div>
            </div>
            <div className='flex items-center mb-3 p-3 border-b-2'>
            <i className="text-2xl mr-2 ri-money-rupee-circle-fill"></i>
            <div>
                <h3 className='mb-[-3px] font-semibold text-xl'>₹{selectedVehicle}</h3>
                <p className='text-md text-gray-400'>Pay with cash</p>
            </div>
            </div>
        </div>
        {/* <button onClick={()=>{setLoadingConfirmed(false);setDriver(true)}} className='w-full p-2 bg-green-600 font-semibold text-white text-xl rounded-lg'>Click</button> */}
        </div>
    </div>
  )
}

export default LoadingConfirm