import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth2Context } from '../context/Captaincontext';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {captain,setCaptain} = useContext(auth2Context);
  const handleLogin = async(e) => {
    e.preventDefault();
    const res = await axios.post('http://13.126.18.104:4000/captain/login',{email,password});
    console.log(res.data);
    if(res.data.success){
      await setCaptain(res?.data?.captain)
      setEmail("");
      localStorage.setItem("token",res?.data?.token);
      setPassword("");
      toast.success(res.data.message);
      // console.log(user)
      navigate('/captainhome')
    }
    else{
      toast.error(res.data.message);
    }
  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <Toaster />
      <div>
      <img className='w-40 mb-2' src="https://static.vecteezy.com/system/resources/previews/027/127/451/non_2x/uber-logo-uber-icon-transparent-free-png.png" alt="" />
      <form onSubmit={handleLogin}>
        <h3 className='text-xl mb-3'>What's your email</h3>
        <input required value={email} onChange={(e)=>setEmail(e.target.value)} className='bg-[#eeeeee] border text-lg mb-5 rounded-md w-full px-4 py-2' type="email" placeholder='example@gmail.com' />
        <h3 className='text-xl mb-3'>Your password</h3>
        <input required value={password} onChange={(e)=>setPassword(e.target.value)} className='bg-[#eeeeee] mb-5 text-lg border rounded-md w-full px-4 py-2' type="password" placeholder='password' />
        <button className='bg-[#000] text-white rounded-md w-full py-2 px-4 text-xl my-3'>Login</button>
      </form>
      <p className='text-center text-lg mt-1'>New here?<Link to={'/captainregister'} className='text-blue-600 text-lg'> Register as Captain</Link></p>
      </div>
      <div>
        <Link to={'/login'} className='flex items-center justify-center border bg-[#d5622d] text-white rounded-md w-full py-2 px-4 text-xl'>Login as User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin