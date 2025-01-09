import React, { createContext, useEffect } from 'react'
import {io} from 'socket.io-client'
export const SocketcontextProvider = createContext();
const socket = io('http://localhost:4000');
const Socketcontext = ({children}) => {
    useEffect(()=>{
        socket.on('connect',()=>{
            console.log(`Connected: ${socket.id}`);
        })
        socket.on('disconnect',()=>{
            console.log(`Disconnected: ${socket.id}`);
        })
    },[])
    const sendMessage = (eventname,message) => {
        // console.log(eventname,message)
        socket.emit(eventname,message)
    }
    const recieveMessage = (eventname,callback) => {
        socket.emit(eventname,callback)
    }
  return (
    <SocketcontextProvider.Provider value={{sendMessage,recieveMessage,socket}}>
        {children}
    </SocketcontextProvider.Provider>
  )
}

export default Socketcontext