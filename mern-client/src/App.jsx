import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './components/navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <div className="min-h-screen">
      <main>
        <Outlet />
      </main>
      </div>
      <div className='pt-10'>
      </div>
    </>
  )
}

export default App
