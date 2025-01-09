import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import {useGSAP} from '@gsap/react'
import { authContext } from '../context/Usercontext';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import SearchLocation from '../components/SearchLocation';
import VehiclePanel from '../components/VehiclePanel';
import ConfirRide from '../components/ConfirmRide';
import LoadingConfirm from '../components/LoadingConfir';
import DriversDetail from '../components/DriversDetail';
import SearchDestination from '../components/SearchDestination';
import { SocketcontextProvider } from '../context/Socketcontext';
import LiveTracking from '../components/LiveTracking';

const MainHome = () => {
  const navigate = useNavigate();
  const {sendMessage,recieveMessage,socket} = useContext(SocketcontextProvider);
  const panelRef = useRef(null);
  const vehicleRef = useRef(null);
  const confirmRideRef = useRef(null);
  const loadingConfirmRef = useRef(null);
  const driverRef = useRef(null);
  const [pickup,setPickup] = useState("");
  const [image,setImage] = useState("");
  const [destination,setDestination] = useState("");
  const [openPanel,setOpenPanel] = useState(false);
  const [array,setArray] = useState([]);
  const [array1,setArray1] = useState([]);
  const {user,setUser,setPickNdDrop,pickNdDrop} = useContext(authContext);
  const [vehiclePanel,setVehiclePanel] = useState(false);
  const [autoPrice,setAutoPrice] = useState(0);
  const [carPrice,setCarPrice] = useState(0);
  const [selectedVehicle,setSelectedVehicle] = useState(0);
  const [bikePrice,setBikePrice] = useState(0);
  const [confirmRide,setConfirmRide] = useState(false);
  const [loadingConfirmed,setLoadingConfirmed] = useState(false);
  const [vehicletype,setVehicleType] = useState('');
  const [driver,setDriver] = useState(false);
  const [driverr,setDriverr] = useState({});
  useGSAP(function(){
    if(openPanel){
      gsap.to(panelRef.current,{
        height:"70%"
      })
    }
    else{
      gsap.to(panelRef.current,{
        height:"0%"
      })
    }
  },[openPanel])
  useGSAP(function(){
    if(confirmRide){
      gsap.to(confirmRideRef.current,{
        transform:"translateY(0)",
        height:"88%"
      })
    }
    else{
      gsap.to(confirmRideRef.current,{
        transform:"translateY(100%)",
        height:"0"
      })
    }
  },[confirmRide])
  useGSAP(function(){
    if(vehiclePanel){
      gsap.to(vehicleRef.current,{
        transform:"translateY(0)",
        height:"80%"
      })
    }
    else{
      gsap.to(vehicleRef.current,{
        transform:"translateY(100%)",
        height:"0"
      })
    }
  },[vehiclePanel])
  useGSAP(function(){
    if(loadingConfirmed){
      gsap.to(loadingConfirmRef.current,{
        transform:"translateY(0)",
        height:"88%"
      })
    }
    else{
      gsap.to(loadingConfirmRef.current,{
        transform:"translateY(100%)",
        height:"0"
      })
    }
  },[loadingConfirmed])
  useGSAP(function(){
    if(driver){
      gsap.to(driverRef.current,{
        transform:"translateY(0)",
        display:"block"
      })
    }
    else{
      gsap.to(driverRef.current,{
        transform:"translateY(100%)",
        display:"none"
      })
    }
  },[driver])
  // const handleLocation = async(e) => {
  //   e.preventDefault();
  // }
  const handleLogout = async() => {
    const res = await axios.get('http://13.126.18.104:4000/user/logout',{headers:{token:localStorage.getItem('token')}});
    console.log(res.data)
    if(res.data.success){
      toast.success(res?.data?.message);
      localStorage.removeItem("token");
      await setUser({});
      navigate('/login')
    }
    else{
      toast.error(res?.data?.message);
    }
  }
  const handleChange = async(e) => {
    await setPickup(e.target.value);
    const res = await axios.get(`http://13.126.18.104:4000/map/getsuggestion?input=${pickup}`);
    console.log(res.data)
    if(res.data.success){
      setArray(res.data.message);
    }
    else{
      setArray([])
    }
  }
  const handleChange2 = async(e) => {
    await setDestination(e.target.value);
    const res = await axios.get(`http://13.126.18.104:4000/map/getsuggestion?input=${destination}`);
    console.log(res.data)
    if(res.data.success){
      setArray1(res.data.message);
    }
    else{
      setArray1([])
    }
  }
  const getPrice = async() => {
    try {
      console.log(pickup,destination)
      const res = await axios.get('http://13.126.18.104:4000/map/getfares',{headers:{pickup,destination}})
      console.log(res.data)
      if(res?.data?.success){
        console.log("Carrrrrr",res.data.message.auto)
        setCarPrice((res?.data?.message?.car).toFixed(2));
        setAutoPrice((res.data.message?.auto).toFixed(2));
        setBikePrice((res.data.message?.bike).toFixed(2));
      }
      else{
        setBikePrice(0);
        setCarPrice(0);
        setAutoPrice(0);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const createRide = async() => {
    console.log("vehicletype",vehicletype)
    try {
      const res = await axios.get('http://13.126.18.104:4000/ride/createride',{headers:{token:localStorage.getItem("token"),pickup,destination,vehicletype}});
      console.log(res.data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    // console.log(user)
    sendMessage('join',{usertype:"user",userid:user._id});
    if(pickup && destination){
      getPrice()
    }
  },[pickup,destination])
  socket.on('ride-accepted',(data)=>{
    if(data){
      console.log(data);
      setLoadingConfirmed(false);
      setDriver(true);
      console.log(data.ride)
      setDriverr(data?.ride);
    }
    else{
      console.log("Unable to get driver data")
    }
  });
  socket.on('otp-verified',(data)=>{
    if(data){
      setPickNdDrop(data);
      navigate('/riding');
    }
  })
  socket.on('ride-completed',(data)=>{
    if(data){
      toast.success("Ride completed successfully!!");
      setPickNdDrop({});
      setDriver(false);
      navigate('/home');
    }
  })
  return (
    <div className='h-screen w-full'>
      <Toaster />
      <img className='w-20 mt-3 ml-3 absolute top-5 left-5 mb-8' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="" />
      <div onClick={()=>handleLogout()} className='absolute top-5 right-5 z-10 h-4 w-4 rounded-full flex items-center justify-center p-6 bg-white '><i className="text-2xl ri-logout-box-r-line"></i></div>
      <div>
        <LiveTracking />
      </div>
      <div className='flex flex-col justify-end absolute overflow-hidden h-screen w-full bottom-0'>
       <div className='h-[30%] w-full bg-white p-6'>
        <h5 onClick={()=>setOpenPanel(false)} className='absolute right-6 top-6 text-2xl'>
        {openPanel?<><i class="ri-arrow-down-wide-fill"></i></>:<></>}
        </h5>
       <h4 className='text-2xl font-semibold'>Find a trip</h4>
          <input onClick={()=>setOpenPanel(true)} value={pickup} onChange={(e)=>handleChange(e)} className='bg-[#eee] rounded-lg px-8 py-3 text-base w-full mt-4' type="text" placeholder='Pickup location' />
          <input onClick={()=>setOpenPanel(true)} value={destination} onChange={(e)=>handleChange2(e)} className='bg-[#eee] rounded-lg px-8 py-3 text-base w-full mt-5' type="text" placeholder='Your destination' />
       </div>
       <div ref={panelRef} className='h-0 bg-white'>
        <SearchLocation array={array} setOpenPanel={setOpenPanel} setArray={setArray} setPickup={setPickup} />
        <SearchDestination setArray1={setArray1} pickup={pickup} destination={destination} array1={array1} setOpenPanel={setOpenPanel} setDestination={setDestination} setVehiclePanel={setVehiclePanel} vehiclePanel={vehiclePanel} />
       </div>
      </div>
      <div ref={vehicleRef} className='fixed h-0 w-full py-5 px-2 bg-white translate-y-full bottom-0 z-10'>
       <VehiclePanel setVehicleType={setVehicleType} setImage={setImage} setSelectedVehicle={setSelectedVehicle} carPrice={carPrice} bikePrice={bikePrice} autoPrice={autoPrice} vehiclePanel={vehiclePanel} setConfirmRide={setConfirmRide} setVehiclePanel={setVehiclePanel} />
      </div>
      <div ref={confirmRideRef} className='fixed h-0 w-full py-5 px-2 bg-white translate-y-full bottom-0 z-10'>
       <ConfirRide createRide={createRide} image={image} selectedVehicle={selectedVehicle} pickup={pickup} destination={destination} setConfirmRide={setConfirmRide} setLoadingConfirmed={setLoadingConfirmed} />
      </div>
      <div ref={loadingConfirmRef} className='h-0 fixed w-full py-5 px-2 bg-white translate-y-full bottom-0 z-10'>
       <LoadingConfirm image={image} selectedVehicle={selectedVehicle} pickup={pickup} destination={destination} setLoadingConfirmed={setLoadingConfirmed} setDriver={setDriver} />
      </div>
      <div ref={driverRef} className='fixed w-full py-5 px-2 bg-white hidden translate-y-full bottom-0 z-10'>
      <DriversDetail setDriver={setDriver} driverr={driverr} />
      </div>
    </div>
  )
}

export default MainHome