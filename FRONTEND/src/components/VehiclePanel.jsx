import React from 'react'
const VehiclePanel = ({setVehiclePanel,setVehicleType,setConfirmRide,bikePrice,carPrice,setImage,autoPrice,setSelectedVehicle}) => {
  return (
    <>
     <h4 onClick={()=>setVehiclePanel(false)} className='absolute top-0 left-0 w-full py-2 text-center'><i className="text-xl ri-arrow-down-wide-line"></i></h4>
        <h3 className='text-2xl mb-5 mt-10 font-semibold'>Choose a Vehicle</h3>
        <div onClick={()=>{setConfirmRide(true); setVehicleType('car');setImage("https://static.vecteezy.com/system/resources/previews/025/250/492/non_2x/white-modern-car-on-transparent-background-3d-rendering-illustration-png.png");setSelectedVehicle(carPrice);setVehiclePanel(false)}} className='flex border-2 active:border-black mb-3 rounded-xl p-3 items-center w-full gap-5'>
          <img className='w-16 object-cover object-center' src="https://static.vecteezy.com/system/resources/previews/025/250/492/non_2x/white-modern-car-on-transparent-background-3d-rendering-illustration-png.png" alt="" />
          <div className='flex items-start justify-between'>
          <div className='flex flex-col'>
            <h4 className='text-2xl mb-[-3px] font-semibold'>UberGo</h4>
            <p className='text-md mb-[-1px] font-medium'>2 min away</p>
            <p className='text-sm text-gray-500'>Affordable,compact rides</p>
          </div>
          <h2 className='text-xl font-bold'>₹{carPrice}</h2>
          </div>
        </div>
        <div onClick={()=>{setConfirmRide(true);setVehicleType('auto');setImage("https://png.pngtree.com/png-vector/20240330/ourmid/pngtree-tuk-auto-rickshaw-png-image_12251709.png");setSelectedVehicle(autoPrice);setVehiclePanel(false)}} className='flex border-2 active:border-black rounded-xl p-3 items-center w-full gap-5'>
          <img className='w-16 object-cover object-center' src="https://png.pngtree.com/png-vector/20240330/ourmid/pngtree-tuk-auto-rickshaw-png-image_12251709.png" alt="" />
          <div className='flex items-start justify-between'>
          <div className='flex flex-col'>
            <h4 className='text-2xl mb-[-3px] font-semibold'>UberAuto</h4>
            <p className='text-md mb-[-1px] font-medium'>2 min away</p>
            <p className='text-sm text-gray-500'>Affordable,compact rides</p>
          </div>
          <h2 className='text-xl font-bold'>₹{autoPrice}</h2>
          </div>
        </div>
        <div onClick={()=>{setConfirmRide(true);setVehicleType('bike');setImage("https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png");setSelectedVehicle(bikePrice);setVehiclePanel(false)}} className='flex border-2 active:border-black mb-3 rounded-xl p-3 items-center w-full gap-5'>
          <img className='w-16 object-cover object-center' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
          <div className='flex items-start justify-between'>
          <div className='flex flex-col'>
            <h4 className='text-2xl mb-[-3px] font-semibold'>Moto</h4>
            <p className='text-md mb-[-1px] font-medium'>2 min away</p>
            <p className='text-sm text-gray-500'>Affordable,compact rides</p>
          </div>
          <h2 className='text-xl font-bold'>₹{bikePrice}</h2>
          </div>
        </div>
    </>
  )
}

export default VehiclePanel