import React, { createContext, useState } from 'react'
export const authContext = createContext();
const Usercontext = ({children}) => {
  const [user, setUser] = useState({});
  const [pickNdDrop,setPickNdDrop] = useState({});
  const [optMatched,setOtpMatched] = useState(false);
  return (
    <div>
        <authContext.Provider value={{user,setUser,optMatched,setOtpMatched,pickNdDrop,setPickNdDrop}}>
        {children}
        </authContext.Provider>
    </div>
  )
}

export default Usercontext