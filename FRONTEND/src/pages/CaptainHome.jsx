import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { auth2Context } from '../context/Captaincontext';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import OfferPopUp from '../components/OfferPopUp';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SocketcontextProvider } from '../context/Socketcontext';

const CaptainHome = () => {
  const [ride,setRide] = useState(null);
  const [driver,setDriver] = useState(false);
  const [popUpPanel,setPopUpPanel] = useState(false);
  const driverRef = useRef(null);
  const popUpRef = useRef(null);
  const [captainProfile,setCaptainProfile] = useState({});
  const navigate = useNavigate();
  const {captain,setCaptain,setRideId,pickAndDrop,setPickAndDrop} = useContext(auth2Context);
  const {sendMessage,socket} = useContext(SocketcontextProvider);
  const handleLogout = async() => {
    const res = await axios.get('http://13.126.18.104:4000/captain/logout',{headers:{token:localStorage.getItem('token')}});
    console.log(res.data)
    if(res.data.success){
      toast.success(res?.data?.message);
      localStorage.removeItem("token");
      await setCaptain({});
      navigate('/captainlogin')
    }
    else{
      toast.error(res?.data?.message);
    }
  }
  const getProfile = async() => {
    try {
      const res = await axios.get('http://13.126.18.104:4000/captain/profile',{headers:{token:localStorage.getItem("token")}});
      console.log(res.data)
      if(res.data.success){
        setCaptainProfile(res.data.captain);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const handleAccept = async() => {
    // const token = localStorage.getItem('token');
    console.log(ride.rideWithUser._id)
    const res = await axios.get('http://13.126.18.104:4000/ride/confirmride',{headers:{token:localStorage.getItem('token'),rideid:ride.rideWithUser._id}});
    if(res.data.success){
      setPopUpPanel(false);
      setRideId(res.data.ride._id);
      setPickAndDrop({pickup:res.data.ride.pickup,destination:res.data.ride.destination,fare:res?.data?.ride?.fare,rideid:res.data.ride._id});
      setDriver(true);
      navigate('/startriding')
    }
  }
  useEffect(()=>{
    getProfile();
    console.log(captain)
    sendMessage('join',{usertype:'captain',userid:captain._id});
    const updateLocation = () => {
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>socket.emit('update-location-captain',{userid:captain._id,latitude:position.coords.latitude,longitude:position.coords.longitude}))
      }
    }
    const locationInterval = setInterval(updateLocation,20000);
    updateLocation();
    // return () => clearInterval(locationInterval);
  },[])
  socket.on('new-ride',(data)=>{
    // console.log("data",data);
    if(data){
      setRide(data);
      setPopUpPanel(true);
    }
    else{
      console.log("Unable to get ride data");
    }
  })
  useGSAP(function(){
    if(popUpPanel){
      gsap.to(popUpRef.current,{
        transform:"translateY(0)",
        display:"block"
      })
    }
    else{
      gsap.to(popUpRef.current,{
        transform:"translateY(100%)",
        display:"hidden"
      })
    }
  },[popUpPanel])
  return (
    <div className='h-screen w-full overflow-hidden'>
      <Toaster />
      <img className='w-20 mt-3 ml-3 absolute top-5 left-5 mb-8' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="" />
      <div onClick={()=>handleLogout()} className='absolute top-5 right-5 z-10 h-4 w-4 rounded-full flex items-center justify-center p-6 bg-white '><i className="text-2xl ri-logout-box-r-line"></i></div>
        <img className='h-[55%] w-full object-cover object-center' src="https://s.wsj.net/public/resources/images/BN-XR453_201802_M_20180228165619.gif" alt="" />
        <div className='h-[45%] p-4 py-8 w-full'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center flex-col'>
              <div className='h-16 w-16 rounded-full border-2 border-gray-400'>
              <img className='object-cover h-16 w-16 rounded-full object-center' src={`http://127.0.0.1:4000/uploads/${captainProfile?.image}`} alt="Image" />
              </div>
              <h4 className='text-xl capitalize mt-2'>{captainProfile?.fullname?.firstname} {captainProfile?.fullname?.lastname}</h4>
            </div>
            <div className='text-right'>
              <h4 className='text-2xl font-semibold mb-[3px]'>₹250.50</h4>
              <h4 className='text-xl'>Earned</h4>
            </div>
          </div>
          <div className='bg-gray-100 my-3 w-full p-2 flex items-center justify-between px-3 rounded-md'>
            <div className='flex flex-col items-center'>
            <i className="text-2xl ri-history-line"></i>
            <h4 className='text-lg font-semibold'>10.2</h4>
            <p className='text-sm text-gray-800'>Total Hours</p>
            </div>
            <div className='flex flex-col items-center'>
            <i className="text-2xl ri-speed-up-line"></i>
            <h4 className='text-lg font-semibold'>120</h4>
            <p className='text-sm text-gray-800'>Maximum Speed</p>
            </div>
            <div className='flex flex-col items-center'>
            <i className="text-2xl ri-history-line"></i>
            <h4 className='text-lg font-semibold'>50 KM</h4>
            <p className='text-sm text-gray-800'>Total Distance</p>
            </div>
          </div>
          {/* <button onClick={()=>{setPopUpPanel(true)}} className='w-full p-3 text-xl text-white bg-blue-600 rounded-md'>Click</button> */}
          <div ref={popUpRef} className='fixed w-full py-5 px-2 bg-white translate-y-full left-0 bottom-0 z-10'>
            <OfferPopUp handleAccept={handleAccept} ride={ride} setPopUpPanel={setPopUpPanel} />
          </div>
        </div>
    </div>
  )
}

export default CaptainHome