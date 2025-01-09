import axios from 'axios';
import React, { useContext, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'
import { auth2Context } from '../context/Captaincontext';

const CaptainRegister = () => {
  const navigate = useNavigate();
  const {captain,setCaptain} = useContext(auth2Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState();
  const [vehiclecolor, setVehiclecolor] = useState("");
  const [vehicleplate, setVehicleplate] = useState("");
  const [vehiclecapacity, setVehiclecapacity] = useState();
  const [vehicletype, setVehicletype] = useState("");
  const [image,setImage] = useState('');
  const handleRegister = async(e) => {
    e.preventDefault();
    const res = await axios.post('http://13.126.18.104:4000/captain/register',{firstname,image,lastname,email,password,phone,vehiclecapacity,vehiclecolor,vehicleplate,vehicletype},{headers:{"Content-Type":"multipart/form-data"}});
    console.log(res.data);
    if(res?.data?.success){
      toast.success(res.data.message);
      await setCaptain(res?.data?.captain)
      localStorage.setItem("token",res?.data?.token);
      navigate('/captainhome')
    }
    else{
      toast.error(res?.data?.message);
    }
  }
  return (
    <div className='px-7 py-2 h-screen flex flex-col justify-between'>
      <Toaster />
      <div>
      <img className='w-40 mb-2' src="https://static.vecteezy.com/system/resources/previews/027/127/451/non_2x/uber-logo-uber-icon-transparent-free-png.png" alt="" />
      <form onSubmit={handleRegister}>
        {/* <h3 className='text-xl mb-3'>What's your name</h3> */}
        <div className='flex items-center gap-3 mb-3'>
        <input required value={firstname} onChange={(e)=>setFirstname(e.target.value)} className='bg-[#eeeeee] border text-lg rounded-md w-full px-4 py-2' type="text" placeholder='Firstname' />
        <input required value={lastname} onChange={(e)=>setLastname(e.target.value)} className='bg-[#eeeeee] border text-lg rounded-md w-full px-4 py-2' type="text" placeholder='Lastname' />
        </div>
        {/* <h3 className='text-xl mb-3'>What's your email</h3> */}
        <input required value={email} onChange={(e)=>setEmail(e.target.value)} className='bg-[#eeeeee] border text-lg mb-5 rounded-md w-full px-4 py-2' type="email" placeholder='example@gmail.com' />
        {/* <h3 className='text-xl mb-3'>Your password</h3> */}
        <input required value={password} onChange={(e)=>setPassword(e.target.value)} className='bg-[#eeeeee] mb-5 text-lg border rounded-md w-full px-4 py-2' type="password" placeholder='Password' />
        {/* <h3 className='text-xl mb-3'>Your Phone</h3> */}
        <input required value={phone} onChange={(e)=>setPhone(e.target.value)} className='bg-[#eeeeee] mb-5 text-lg border rounded-md w-full px-4 py-2' type="number" placeholder='Phone No.' />
        <input  accept="image/*" onChange={(e) => setImage(e.target.files[0])} className='bg-[#eeeeee] mb-5 text-lg border rounded-md w-full px-4 py-2' name='image' type="file" placeholder='upload image' />
        <h3 className='text-xl mb-3'>Vehicle Information</h3>
        <input required value={vehicleplate} onChange={(e)=>setVehicleplate(e.target.value)} className='bg-[#eeeeee] mb-5 text-lg border rounded-md w-full px-4 py-2' type="text" placeholder='Vehicle No.' />
        <input required value={vehiclecapacity} onChange={(e)=>setVehiclecapacity(e.target.value)} className='bg-[#eeeeee] mb-5 text-lg border rounded-md w-full px-4 py-2' type="number" placeholder='Capacity' />
        <input required value={vehiclecolor} onChange={(e)=>setVehiclecolor(e.target.value)} className='bg-[#eeeeee] mb-5 text-lg border rounded-md w-full px-4 py-2' type="text" placeholder='Vehicle color' />
        <h3 className='text-xl mb-3'>Vehicle Type</h3>
        <div className='flex items-center mb-4'>
        <input required name='rdio' className='w-4 h-4' value={"car"} onClick={(e)=>setVehicletype(e.target.value)} type="radio" /><span className='text-lg ml-2'>Car</span><input value={"bike"} onClick={(e)=>setVehicletype(e.target.value)} name='rdio' className='ml-6 w-4 h-4' type="radio" /><span className='text-lg ml-2'>Bike</span><input value={"auto"} onClick={(e)=>setVehicletype(e.target.value)} name='rdio' className='ml-6 w-4 h-4' type="radio" /><span className='text-lg ml-2'>Auto</span>
        </div>
        <button className='bg-[#000] text-white rounded-md w-full py-2 px-4 text-xl my-2'>Register</button>
      </form>
      <p className='text-center text-lg'>Already have an account?<Link to={'/captainlogin'} className='text-blue-600 text-lg'> Login</Link></p>
      </div>
      <div>
        <p className='text-xs leading-tight my-4'>By proceeding you consent to get calls, Whatsapp or SMS messages including by automated means from Uber.</p>
      </div>
    </div>
  )
}

export default CaptainRegister