import axios from 'axios';
import React, { useContext, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../context/Usercontext';

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {user,setUser} = useContext(authContext);
  const handleLogin = async(e) => {
    e.preventDefault();
    const res = await axios.post('http://13.126.18.104:4000/user/login',{email,password});
    console.log(res.data);
    if(res.data.success){
      await setUser(res?.data?.userr)
      setEmail("");
      localStorage.setItem("token",res?.data?.token);
      setPassword("");
      toast.success(res.data.message);
      // console.log(user)
      navigate('/home')
    }
    else{
      toast.error(res.data.message);
    }
  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <Toaster />
      <div>
      <img className='w-20 mb-8' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="" />
      <form onSubmit={handleLogin}>
        <h3 className='text-xl mb-3'>What's your email</h3>
        <input required value={email} onChange={(e)=>setEmail(e.target.value)} className='bg-[#eeeeee] border text-lg mb-5 rounded-md w-full px-4 py-2' type="email" placeholder='example@gmail.com' />
        <h3 className='text-xl mb-3'>Your password</h3>
        <input required value={password} onChange={(e)=>setPassword(e.target.value)} className='bg-[#eeeeee] mb-5 text-lg border rounded-md w-full px-4 py-2' type="password" placeholder='password' />
        <button className='bg-[#000] text-white rounded-md w-full py-2 px-4 text-xl my-3'>Login</button>
      </form>
      <p className='text-center text-lg mt-1'>New here?<Link to={'/register'} className='text-blue-600 text-lg'> Create account</Link></p>
      </div>
      <div>
        <Link to={'/captainlogin'} className='flex items-center justify-center border bg-[#10b461] text-white rounded-md w-full py-2 px-4 text-xl'>Login as Captain</Link>
      </div>
    </div>
  )
}

export default UserLogin