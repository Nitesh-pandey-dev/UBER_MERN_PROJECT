import React, { useEffect, useState } from 'react'

const ConfirmRide = ({setConfirmRide,createRide,image,setLoadingConfirmed,pickup,destination,selectedVehicle}) => {
  return (
    <div>
        <h4 onClick={()=>{setConfirmRide(false)}} className='absolute top-0 left-0 w-full py-2 text-center'><i className="text-xl ri-arrow-down-wide-line"></i></h4>
        <h3 className='text-2xl mb-5 mt-7 font-semibold'>Confirm your Ride</h3>
        <div className='flex flex-col gap-3 justify-between items-center'>
        <img className='w-24 object-cover object-center' src={image} alt="" />
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
        <button onClick={()=>{setConfirmRide(false);setLoadingConfirmed(true);createRide()}} className='w-full p-2 bg-green-600 font-semibold text-white text-xl rounded-lg'>Confirm Ride</button>
        </div>
    </div>
  )
}

export default ConfirmRide