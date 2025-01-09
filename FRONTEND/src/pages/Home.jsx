import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <div className='bg-cover bg-[url(https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_690,w_552/v1684852612/assets/ba/4947c1-b862-400e-9f00-668f4926a4a2/original/Ride-with-Uber.png)] h-screen pt-8 flex flex-col justify-between w-full bg-red-300'>
        <img className='w-20 ml-8' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="" />
      <div className='py-5 px-6 pb-7 bg-white'>
        <h2 className='text-3xl font-bold mb-4'>Get Started With Uber</h2>
        <Link to={'/login'} className='flex items-center justify-center py-3 mt-2 text-2xl bg-black w-full text-white rounded-md'>Continue</Link>
      </div>
    </div>
    </div>
  )
}

export default Home