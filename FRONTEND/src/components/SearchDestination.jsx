import React, { useEffect, useState } from 'react'
import axios from 'axios';

const SearchDestination = ({setDestination,setOpenPanel,array1,setArray1,setVehiclePanel,VehiclePanel,pickup}) => {
    // const getPrice = async() => {
    //   try {
    //     console.log(pickup,destinationn)
    //     const res = await axios.get('http://127.0.0.1:4000/map/getfares',{pickup,destinationn})
    //     console.log(res.data)
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    // useEffect(()=>{
    //   if(VehiclePanel){
    //     getPrice()
    //   }
    // },[VehiclePanel])
  return (
    <div className='h-screen w-full p-5 mt-[-50px]'>
      {setOpenPanel?<>
        {array1?.map((item,index)=>(
        <div key={index} onClick={async()=>{
            setDestination(item.description);
            setVehiclePanel(true);
            setOpenPanel(false);
            setArray1([])
            }} className='text-2xl flex items-center my-2 border-2 p-2 rounded-lg border-white active:border-black justify-start gap-2'>
        <i class="ri-map-pin-2-fill"></i>
        <h4 className='text-base font-medium'>{item.description}</h4>
      </div>
      ))}
      </>:<></>}
    </div>
  )
}

export default SearchDestination