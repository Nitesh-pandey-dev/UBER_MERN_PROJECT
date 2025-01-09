import React from 'react'
import { useNavigate } from 'react-router-dom';

const OfferPopUp = ({setPopUpPanel,ride,handleAccept}) => {
  const navigate = useNavigate();
  return (
    <div>
        <h4 onClick={()=>setPopUpPanel(false)} className='absolute top-0 left-0 w-full py-2 text-center'><i className="text-xl ri-arrow-down-wide-line"></i></h4>
        <h3 className='text-2xl mb-5 mt-7 font-semibold'>New Ride Available!</h3>
        <div className='flex flex-col gap-3 justify-between items-center'>
        <div className='flex bg-yellow-400 rounded-md p-3 w-full items-center justify-between'>
            <div className='flex items-center flex-col'>
              <div className='h-16 w-16 rounded-full bg-white border-2 border-gray-400'>
              <img className='object-cover rounded-full object-center' src="https://static.vecteezy.com/system/resources/previews/020/486/924/non_2x/business-man-silhouette-icon-human-face-portrait-glyph-pictogram-male-personal-profile-icon-men-user-s-avatar-businessman-manager-office-people-sign-isolated-illustration-vector.jpg" alt="" />
              </div>
              <h4 className='text-xl'>User1</h4>
            </div>
            <div className='text-right'>
              <h4 className='text-3xl font-semibold mb-[3px]'>₹{ride?.rideWithUser?.fare}</h4>
              {/* <h4 className='text-lg text-gray-500'>24 KM</h4> */}
            </div>
          </div>
        <div className='w-full'>
            <div className='flex items-center mb-2 p-2 border-b-2 border-t-2'>
            <i className="text-2xl mr-2 ri-map-pin-2-fill"></i>
            <div>
                <h3 className='mb-[-3px] font-semibold text-xl'>From</h3>
                <p className='text-md text-gray-400'>{ride?.rideWithUser?.pickup}</p>
            </div>
            </div>
            <div className='flex items-center mb-2 p-2 border-b-2'>
            <i className="text-2xl mr-2 ri-map-pin-range-fill"></i>
            <div>
                <h3 className='mb-[-3px] font-semibold text-xl'>To</h3>
                <p className='text-md text-gray-400'>{ride?.rideWithUser?.destination}</p>
            </div>
            </div>
            <div className='flex items-center p-2 border-b-2'>
            <i className="text-2xl mr-2 ri-money-rupee-circle-fill"></i>
            <div>
                <h3 className='mb-[-3px] font-semibold text-xl'>₹{ride?.rideWithUser?.fare}</h3>
                <p className='text-md text-gray-400'>Accept cash</p>
            </div>
            </div>
        </div>
        <button onClick={()=>handleAccept()} className='w-full p-2 bg-green-600 font-semibold text-white text-xl rounded-lg'>Accept Ride</button>
        <button onClick={()=>setPopUpPanel(false)} className='w-full p-2 bg-gray-300 font-semibold text-gray-700 text-xl rounded-lg'>Ignore Ride</button>
        </div>
    </div>
  )
}

export default OfferPopUp