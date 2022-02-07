import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { toast } from 'react-toastify'

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  })

  const { email, password } = inputs

  const onChange = (e) => setInputs({ ...inputs, [e.target.name]: e.target.value })

  const onSubmitForm = async (e) => {
    e.preventDefault()
    try {
      const body = { email, password }
      const response = await fetch('http://localhost:5000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      const parseRes = await response.json()

      if (parseRes.jwtToken) {
        localStorage.setItem('token', parseRes.jwtToken)
        setAuth(true)
        toast.success('Logged in Successfully')
      } else {
        setAuth(false)
        toast.error(parseRes)
      }
    } catch (err) {
      console.error(err.message)
    }
  }

  return (
    <LoginStyled>
      <h1 className='mt-5 text-center'>Login</h1>
      <form onSubmit={onSubmitForm}>
        <input type='text' name='email' value={email} onChange={(e) => onChange(e)} className='form-control my-3' placeholder='email' />
        <input type='password' name='password' value={password} onChange={(e) => onChange(e)} className='form-control my-3' placeholder='password' />
        <button class='btn btn-success btn-block'>Submit</button>
      </form>
      {/* <Link to='/register'>register</Link> */}
    </LoginStyled>
  )
}
const LoginStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  h1 {
    padding: 20px 0px;
    font-size: 30px;
  }
  form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    input {
      margin: 10px 0px;
    }
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
`
export default Login
