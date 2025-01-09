import React, { useEffect, useState } from 'react'

const DriversDetail = ({setDriver,driverr}) => {
    const [vehicleTypee,setVehicleTypee] = useState('');
    // console.log(driverr)
    useEffect(()=>{
        if(driverr?.captainid?.vehicle?.vehicletype === 'car'){
            console.log('car')
            setVehicleTypee("https://static.vecteezy.com/system/resources/previews/025/250/492/non_2x/white-modern-car-on-transparent-background-3d-rendering-illustration-png.png")
        }
        else if(driverr?.captainid?.vehicle?.vehicletype === 'bike'){
            console.log('bike')
            setVehicleTypee("https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png")
        }
        else{
            console.log('auto')
            setVehicleTypee("https://png.pngtree.com/png-vector/20240330/ourmid/pngtree-tuk-auto-rickshaw-png-image_12251709.png")
        }
    },[driverr])
  return (
    <div>
        <h4 onClick={()=>{setDriver(false)}} className='absolute top-0 left-0 w-full py-2 text-center'><i className="text-xl ri-arrow-down-wide-line"></i></h4>
        <h3 className='text-2xl mb-4 mt-7 font-semibold text-center'>Captain's Information</h3>
        <div className='h-[4px] w-full mb-2 flex justify-center'>
            <div className='h-[4px] w-[50%] bg-gray-500 rounded-full'></div>
        </div>
        <div className='flex flex-col gap-3 justify-between items-center'>
        <img className='w-16 object-cover object-center' src="https://www.freeiconspng.com/uploads/face-head-man-icon-9.png" alt="" />
        <div className='flex w-full justify-between items-center px-2 mt-3'>
            <h2 className='text-xl font-medium'>Share with your Captain</h2>
            <div className='w-[100px] h-[40px] bg-gray-500 text-white rounded-lg flex items-center justify-center'>
                <h4 className='text-lg tracking-widest font-semibold'>{driverr?.otp}</h4>
            </div>
        </div>
        <div className='w-full p-2 mt-2 flex justify-between items-center border-t-2'>
            <div className='flex flex-col justify-center mb-3 p-3'>
                <p className='text-lg font-normal capitalize'>{driverr?.captainid?.fullname?.firstname} {driverr?.captainid?.fullname?.lastname}</p>
                <h3 className='text-xl font-semibold'>{driverr?.captainid?.vehicle?.plate}</h3>
                <p className='text-md text-gray-500 capitalize'>{driverr?.captainid?.vehicle?.color} color</p>
                {/* <p className='text-lg'><i className=" ri-star-half-fill"></i><span>4.5</span></p> */}
            </div>
            <div className=''>
            <img className='w-24 object-cover object-center' src={vehicleTypee?vehicleTypee:""} alt="" />
            </div>
        </div>
        <div>
            <h3 className='text-2xl mt-[-25px] mb-2 font-semibold'>Trip Detail</h3>
            <div className='w-full p-2'>
            <div className='flex items-center mb-3 p-2 border-b-2 border-t-2'>
            <i className="text-2xl mr-2 ri-map-pin-2-fill"></i>
            <div>
                <h3 className='mb-[-4px] font-semibold text-xl'>FROM</h3>
                <p className='text-md text-gray-400 capitalize'>{driverr?.pickup}</p>
            </div>
            </div>
            <div className='flex items-center mb-3 p-2 border-b-2'>
            <i className="text-2xl mr-2 ri-map-pin-range-fill"></i>
            <div>
                <h3 className='font-semibold text-xl'>TO</h3>
                <p className='text-md text-gray-400 capitalize'>{driverr?.destination}</p>
            </div>
            </div>
            </div>
        </div>
        <button className='w-[80%] p-2 text-white rounded-lg text-lg font-medium bg-red-600'>Cancel Ride</button>
        {/* <button className='w-full p-2 bg-green-600 font-semibold text-white text-xl rounded-lg'>Confirm Ride</button> */}
        </div>
    </div>
  )
}

export default DriversDetail