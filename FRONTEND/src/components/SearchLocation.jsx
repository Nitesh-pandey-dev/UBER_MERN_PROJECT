import React, { useState } from 'react'

const SearchLocation = ({setOpenPanel,setPickup,setArray,array}) => {
  const [heightt,setHeightt] = useState(true)
  return (
    <div className={`w-full p-5 ${heightt? 'h-screen': 'h-0'}`}>
      {setOpenPanel?<>
        {array.map((item,index)=>(
        <div key={index} onClick={()=>{setPickup(item.description);setArray([]); setHeightt(false)}} className='text-2xl flex items-center my-2 border-2 p-2 rounded-lg border-white active:border-black justify-start gap-2'>
        <i class="ri-map-pin-2-fill"></i>
        <h4 className='text-base font-medium'>{item.description}</h4>
      </div>
      ))}
      </>:<></>}
    </div>
  )
}

export default SearchLocation