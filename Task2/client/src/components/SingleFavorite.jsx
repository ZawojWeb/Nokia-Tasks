import React, { useEffect, useState } from 'react'

const SingleFavorite = ({ movie, setFavoriteList, favoriteList }) => {
  const [movieData, setMovieData] = useState([])
  const deleteFromFavorite = async (e, id) => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:5000/api/favorite/remove', {
        method: 'DELETE',
        headers: { jwtToken: localStorage.token, movieID: id },
      })
      console.log(res)
    } catch (error) {}
    const deleteMovie = favoriteList.indexOf(id)
    favoriteList.splice(deleteMovie, 1)
    setFavoriteList([...favoriteList])
  }

  const getDataMovies = async (movie) => {
    try {
      const res = await fetch(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_KEY_API}&i=${movie}`, {
        method: 'GET',
      })
      const parseRes = await res.json()
      setMovieData(parseRes)
    } catch (err) {}
  }

  useEffect(() => {
    getDataMovies(movie)
  }, [])

  return (
    <div>
      <h1>{movieData.Title}</h1>
      <button
        onClick={(e) => {
          deleteFromFavorite(e, movie)
        }}
      >
        Delete form Favortie
      </button>
    </div>
  )
}

export default SingleFavorite
