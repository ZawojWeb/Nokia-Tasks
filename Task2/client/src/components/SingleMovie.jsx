import React from 'react'

const SingleMovie = ({ title, year, id, type, poster }) => {
  const addToFavorite = async (e, id) => {
    try {
      const res = await fetch('http://localhost:5000/api/favorite/add', {
        method: 'PUT',
        headers: { jwtToken: localStorage.token, movieID: id },
      })
      console.log(res)
    } catch (error) {}
  }
  return (
    <div>
      <h1>{title}</h1>
      <h2>{year}</h2>
      <h3>{type}</h3>
      <h4>{id}</h4>
      <img src={poster} alt='Poster' />
      <button
        onClick={(e) => {
          addToFavorite(e, id)
        }}
      >
        Add to Favortie
      </button>
    </div>
  )
}

export default SingleMovie
