import React, { useEffect, useState } from 'react'
import SingleMovie from '../SingleMovie'
import { toast } from 'react-toastify'
import styled from 'styled-components'

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
    if (searchPhrase.length > 0) {
      try {
        const res = await fetch(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_KEY_API}&s=${searchPhrase}`, {
          method: 'GET',
        })
        const parseRes = await res.json()

        if (parseRes.Response == 'False') {
          toast.error(parseRes.Error + ' Put more chars!')
        } else {
          setMovieList(parseRes.Search)
        }
      } catch (err) {}
    } else {
      toast.error('You put nothing!')
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
      <WelcomeStyled>
        <h2>Welcome {name}</h2>
        <button onClick={(e) => logout(e)} className='btn btn-primary'>
          Logout
        </button>
      </WelcomeStyled>

      <DashboardStyled>
        <div>
          <form onSubmit={searchingForm}>
            <input type='text' name='search' placeholder='put phrase in search' onChange={(e) => setSearchPhrase(e.target.value)} value={searchPhrase} />
            <button>Search</button>
          </form>
        </div>
        <div className='moviesWrapper'>
          {movieList.length > 0 &&
            movieList.map((movie) => {
              return <SingleMovie title={movie.Title} year={movie.Year} id={movie.imdbID} type={movie.Type} poster={movie.Poster} key={movie.imdbID} />
            })}
        </div>
      </DashboardStyled>
    </div>
  )
}

const WelcomeStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2 {
    padding: 20px;
    color: #311b92;
    font-weight: bold;
  }

  button {
    align-items: center;
    appearance: none;
    background-color: #3eb2fd;
    background-image: linear-gradient(1deg, #4f58fd, #149bf3 99%);
    background-size: calc(100% + 20px) calc(100% + 20px);
    border-radius: 100px;
    border-width: 0;
    box-shadow: none;
    box-sizing: border-box;
    color: #ffffff;
    cursor: pointer;
    display: inline-flex;
    font-family: CircularStd, sans-serif;
    font-size: 1rem;
    height: auto;
    justify-content: center;
    line-height: 1.5;
    padding: 6px 20px;
    position: relative;
    text-align: center;
    text-decoration: none;
    transition: background-color 0.2s, background-position 0.2s;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: top;
    white-space: nowrap;

    &:hover {
      background-position: -20px -20px;
    }
  }
`

const DashboardStyled = styled.div`
  form {
    display: flex;
    justify-content: center;
    margin-top: 50px;
    input {
      margin-right: 20px;
    }

    button {
      align-items: center;
      appearance: none;
      background-image: radial-gradient(100% 100% at 100% 0, #5adaff 0, #5468ff 100%);
      border: 0;
      border-radius: 6px;
      box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, rgba(58, 65, 111, 0.5) 0 -3px 0 inset;
      box-sizing: border-box;
      color: #fff;
      cursor: pointer;
      display: inline-flex;
      font-family: 'JetBrains Mono', monospace;
      height: 48px;
      justify-content: center;
      line-height: 1;
      list-style: none;
      overflow: hidden;
      padding-left: 16px;
      padding-right: 16px;
      position: relative;
      text-align: left;
      text-decoration: none;
      transition: box-shadow 0.15s, transform 0.15s;
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
      white-space: nowrap;
      will-change: box-shadow, transform;
      font-size: 18px;

      &:focus {
        box-shadow: #3c4fe0 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #3c4fe0 0 -3px 0 inset;
      }
      &:hover {
        box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #3c4fe0 0 -3px 0 inset;
        transform: translateY(-2px);
      }
      &:active {
        box-shadow: #3c4fe0 0 3px 7px inset;
        transform: translateY(2px);
      }
    }
  }

  .moviesWrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-column-gap: 5px;
    grid-row-gap: 5px;
  }
`
export default Dashboard
