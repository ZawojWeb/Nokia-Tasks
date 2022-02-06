import React, { Fragment, useState, useEffect } from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import { toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

//components
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import Dashboard from './components/pages/Dashboard'
import Favorite from './components/pages/Favorite'

toast.configure()

function App() {
  const [favoriteList, setFavoriteList] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const checkAuthenticated = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/user/verify', {
        method: 'POST',
        headers: { jwtToken: localStorage.token },
      })

      const parseRes = await res.json()

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    checkAuthenticated()
  }, [])

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean)
  }

  return (
    <Fragment>
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Dashboard</Link>
            </li>
            <li>
              <Link to='/favorite'>Favorite</Link>
            </li>
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/register'>Register</Link>
            </li>
          </ul>
        </nav>
      </div>
      <Routes>
        <Route exact path='/' element={isAuthenticated ? <Dashboard setAuth={setAuth} /> : <Login setAuth={setAuth} />} />
        <Route exact path='/favorite' element={isAuthenticated ? <Favorite favoriteList={favoriteList} setFavoriteList={setFavoriteList} /> : <Login setAuth={setAuth} />} />
        <Route exact path='/login' element={!isAuthenticated ? <Login setAuth={setAuth} /> : <Dashboard setAuth={setAuth} />} />
        <Route exact path='/register' element={!isAuthenticated ? <Register setAuth={setAuth} /> : <Dashboard setAuth={setAuth} />} />
      </Routes>
    </Fragment>
  )
}

export default App
