import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Usercontext from './context/Usercontext'
import Captaincontext from './context/Captaincontext'
import Socketcontext from './context/Socketcontext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Captaincontext>
    <Usercontext>
    <Socketcontext>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </Socketcontext>
    </Usercontext>
    </Captaincontext>
  </StrictMode>,
)
