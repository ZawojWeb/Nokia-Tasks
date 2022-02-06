import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState('')

  const getProfile = async () => {
    console.log(localStorage.token)
    try {
      const res = await fetch('http://localhost:5000/api/dashboard', {
        method: 'GET',
        headers: { jwtToken: localStorage.token },
      })

      const parseData = await res.json()
      setName(parseData.username)
    } catch (err) {
      console.error(err.message)
    }
  }

  const logout = async (e) => {
    e.preventDefault()
    try {
      localStorage.removeItem('token')
      setAuth(false)
      toast.success('Logout successfully')
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    getProfile()
  }, [])

  return (
    <div>
      <h1 className='mt-5'>Dashboard</h1>
      <h2>Welcome {name}</h2>
      <button onClick={(e) => logout(e)} className='btn btn-primary'>
        Logout
      </button>
    </div>
  )
}

export default Dashboard
