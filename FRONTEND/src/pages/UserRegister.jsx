import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {toast,Toaster} from 'react-hot-toast'
import { authContext } from '../context/Usercontext'

const UserRegister = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState();
  const {user,setUser} = useContext(authContext)
  const handleRegister = async(e) => {
    e.preventDefault();
    const res = await axios.post('http://13.126.18.104:4000/user/register',{firstname,lastname,email,password,phone});
    console.log(res.data)
    if(res.data.success){
      localStorage.setItem("token",res?.data?.token);
      await setUser(res?.data?.userr);
      toast.success(res.data.message);
      setEmail('');
      setPassword('');
      setFirstname('');
      setLastname('');
      setPhone('');
      navigate('/home')
      // console.log(user)
    }
    else{
      toast.error(res?.data?.message);
    }
  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <Toaster />
      <div>
      <img className='w-20 mb-8' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="" />
      <form onSubmit={handleRegister}>
        <h3 className='text-xl mb-3'>What's your name</h3>
        <div className='flex items-center gap-3 mb-3'>
        <input required value={firstname} onChange={(e)=>setFirstname(e.target.value)} className='bg-[#eeeeee] border text-lg rounded-md w-full px-4 py-2' type="text" placeholder='Firstname' />
        <input required value={lastname} onChange={(e)=>setLastname(e.target.value)} className='bg-[#eeeeee] border text-lg rounded-md w-full px-4 py-2' type="text" placeholder='Lastname' />
        </div>
        <h3 className='text-xl mb-3'>What's your email</h3>
        <input required value={email} onChange={(e)=>setEmail(e.target.value)} className='bg-[#eeeeee] border text-lg mb-5 rounded-md w-full px-4 py-2' type="email" placeholder='example@gmail.com' />
        <h3 className='text-xl mb-3'>Your password</h3>
        <input required value={password} onChange={(e)=>setPassword(e.target.value)} className='bg-[#eeeeee] mb-5 text-lg border rounded-md w-full px-4 py-2' type="password" placeholder='Password' />
        <h3 className='text-xl mb-3'>Your Phone</h3>
        <input required value={phone} onChange={(e)=>setPhone(e.target.value)} className='bg-[#eeeeee] mb-5 text-lg border rounded-md w-full px-4 py-2' type="number" placeholder='Phone No.' />
        <button className='bg-[#000] text-white rounded-md w-full py-2 px-4 text-xl my-2'>Register</button>
      </form>
      <p className='text-center text-lg'>Already have an account?<Link to={'/login'} className='text-blue-600 text-lg'> Login</Link></p>
      </div>
      <div>
        <p className='text-xs leading-tight'>By proceeding you consent to get calls, Whatsapp or SMS messages including by automated means from Uber.</p>
      </div>
    </div>
  )
}

export default UserRegister