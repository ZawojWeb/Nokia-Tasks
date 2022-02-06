import React, { useEffect, useState } from 'react'
import SingleMovie from '../SingleMovie'
import { toast } from 'react-toastify'

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState('')
  const [searchPhrase, setSearchPhrase] = useState('')
  const [movieList, setMovieList] = useState([])

  const getProfile = async () => {
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

  const searchingForm = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_KEY_API}&s=${searchPhrase}`, {
        method: 'GET',
      })
      const parseRes = await res.json()

      setMovieList(parseRes.Search)
    } catch (err) {}
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
      <div>
        <h1 className='mt-5'>Dashboard</h1>
        <h2>Welcome {name}</h2>
        <button onClick={(e) => logout(e)} className='btn btn-primary'>
          Logout
        </button>
      </div>

      <div>
        <div>
          <form onSubmit={searchingForm}>
            <input type='text' name='search' placeholder='put phrase in search' onChange={(e) => setSearchPhrase(e.target.value)} value={searchPhrase} />
            <button>Search</button>
          </form>
        </div>
        <div>
          {movieList.length > 0 &&
            movieList.map((movie) => {
              return <SingleMovie title={movie.Title} year={movie.Year} id={movie.imdbID} type={movie.Type} poster={movie.Poster} key={movie.imdbID} />
            })}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
