import React, { useEffect } from 'react'
import SingleFavorite from '../SingleFavorite'
import styled from 'styled-components'
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
    <FavoriteStyled>
      <h1>Your favorite list:</h1>
      <div className='wrapper'>
        {favoriteList.length > 0 &&
          favoriteList.map((movie) => {
            return <SingleFavorite movie={movie} key={movie} setFavoriteList={setFavoriteList} favoriteList={favoriteList} />
          })}
      </div>
    </FavoriteStyled>
  )
}

const FavoriteStyled = styled.div`
  h1 {
    font-size: 50px;
    text-align: center;
    color: #3c4fe0;
    font-weight: 600;
    margin-top: 20px;
  }
  .wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-column-gap: 5px;
    grid-row-gap: 5px;
  }
`

export default Favorite
