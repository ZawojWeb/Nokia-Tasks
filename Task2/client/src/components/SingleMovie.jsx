import React from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify'

const SingleMovie = ({ title, year, id, type, poster }) => {
  const addToFavorite = async (e, id) => {
    try {
      const res = await fetch('http://localhost:5000/api/favorite/add', {
        method: 'PUT',
        headers: { jwtToken: localStorage.token, movieID: id },
      })
      console.log(res)
      toast.success('Successfully added to your favorite list')
    } catch (error) {
      toast.error(error)
    }
  }
  return (
    <>
      <CardStyled posterURL={poster}>
        <div className='cardTop'></div>
        <div className='cardBottom'>
          <div className='cardText'>
            <h3 className='cardTitle'>{title}</h3>
            <div className='cardHoverText'>
              <div className='info'>
                <span className='what'>Type:</span>
                <span className='value'>{type}</span>
              </div>
              <div className='info'>
                <span className='what'>Year:</span>
                <span className='value'>{year}</span>
              </div>
              <button
                onClick={(e) => {
                  addToFavorite(e, id)
                }}
              >
                ADD TO FAVORTIYR
              </button>
            </div>
          </div>
        </div>
      </CardStyled>
    </>
  )
}

const CardStyled = styled.div`
  background: white;
  margin-top: 40px;
  height: 400px;
  width: 80%;
  transition: 0.6s all ease;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);

  .cardTop {
    transition: 0.4s all ease;
    height: 65%;
    background: url(${(props) => props.posterURL}) no-repeat;
    background-position: center 0%;
  }

  .cardBottom {
    height: 35%;
    text-wrap: normal;
    transition: 0.4s all ease;
  }

  .cardText {
    min-height: 100%;
    padding: 20px;
  }

  .cardTitle {
    font-size: 24px;
    font-weight: 700;
  }

  .cardInfo {
    padding-top: 10px;
    font-size: 18px;
    font-weight: 500;
    color: orange;
  }

  .cardHoverText {
    visibility: hidden;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: relative;
    min-height: 180px;
    .info {
      padding: 10px 0px;
      .what {
        text-transform: uppercase;
        margin-right: 10px;
        font-weight: 600;
        color: #5468ff;
      }
    }
  }

  &:hover {
    .cardHoverText {
      visibility: visible;
      transition: 0.4s all ease;
      transition-delay: 0.1999s;
      button {
        position: absolute;
        bottom: 0;
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
    .cardBottom {
      transition: 0.4s all ease;
      height: 65%;
      opacity: 1;
    }
    .cardTop {
      height: 35%;
      opacity: 0.8;
      transition: 0.4s all ease;
    }
  }
`

export default SingleMovie
