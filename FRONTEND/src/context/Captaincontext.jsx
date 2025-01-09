import React, { createContext, useState } from 'react'
export const auth2Context = createContext();
const Captaincontext = ({children}) => {
    const [captain,setCaptain] = useState({});
    const [rideId,setRideId] = useState("");
    const [pickAndDrop,setPickAndDrop] = useState({});
  return (
    <>
    <auth2Context.Provider value={{captain,setCaptain,setRideId,rideId,pickAndDrop,setPickAndDrop}}>
        {children}
    </auth2Context.Provider>
    </>
  )
}

export default Captaincontext