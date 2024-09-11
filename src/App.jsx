import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Profile from './Pages/Profile'
import Scan from './Pages/Scan'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />


        <Route path="/login" element={<Login />} />


        <Route path="/signup" element={<Signup />}  />

        <Route path="/profile/:email" element={<Profile />} />

        <Route path="/profile/scan/:email" element={<Scan />} />

      </Routes>
     
    </>
  )
}

export default App
