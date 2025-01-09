import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import MainHome from './pages/MainHome'
import UserRegister from './pages/UserRegister'
import CaptainLogin from './pages/CaptainLogin'
import CaptainRegister from './pages/CaptainRegister'
import ProtectedUserWrap from './pages/ProtectedUserWrap'
import CaptainHome from './pages/CaptainHome'
import ProtectedCaptainWrap from './pages/ProtectedCaptainWrap'
import Riding from './components/Riding'
import CaptainRidind from './pages/CaptainRidind'
import StartRiding from './components/StartRiding'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/home' element={<ProtectedUserWrap><MainHome /></ProtectedUserWrap>} />
        <Route path='/login' element={<UserLogin/>} />
        <Route path='/register' element={<UserRegister/>} />
        <Route path='/riding' element={<Riding />} />
        <Route path='/captainregister' element={<CaptainRegister/>} />
        <Route path='/captainlogin' element={<CaptainLogin/>} />
        <Route path='/captainhome' element={<ProtectedCaptainWrap><CaptainHome/></ProtectedCaptainWrap>} />
        <Route path='/startriding' element={<ProtectedCaptainWrap><StartRiding/></ProtectedCaptainWrap>} />
        <Route path='/captainriding' element={<ProtectedCaptainWrap><CaptainRidind/></ProtectedCaptainWrap>} />
      </Routes>
    </div>
  )
}

export default App