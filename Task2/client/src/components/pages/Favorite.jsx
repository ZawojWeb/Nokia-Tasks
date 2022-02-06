import React, { useEffect, useState } from 'react'
import SingleFavorite from '../SingleFavorite'
const Favorite = ({ favoriteList, setFavoriteList }) => {
  const getFavorite = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/favorite', {
        method: 'GET',
        headers: { jwtToken: localStorage.token },
      })

      const parseData = await res.json()
      setFavoriteList(parseData.favorites)
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    getFavorite()
  }, [favoriteList.length])

  return (
    <div>
      {favoriteList.length > 0 &&
        favoriteList.map((movie) => {
          return <SingleFavorite movie={movie} key={movie} setFavoriteList={setFavoriteList} favoriteList={favoriteList} />
        })}
    </div>
  )
}

export default Favorite
