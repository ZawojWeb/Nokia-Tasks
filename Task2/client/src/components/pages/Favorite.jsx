import React, { useEffect } from 'react'

const Favorite = ({ favoriteList, setFavoriteList }) => {
  const getFavorite = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/favorite', {
        method: 'GET',
        headers: { jwtToken: localStorage.token },
      })

      const parseData = await res.json()
      setFavoriteList(parseData.favorite)
      console.log(favoriteList)
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    getFavorite()
  }, [])

  return <div>Favorites</div>
}

export default Favorite
