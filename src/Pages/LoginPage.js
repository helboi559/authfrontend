import React from 'react'
import { loginUser } from '../Auth'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage = (props) => {
  const[username,setUsername]= useState('')
  const[password,setPassword]= useState('')
  const navigate = useNavigate()
  return (
    <>
      <label>UserName</label>
      <input type="text" value={username} onChange={(e)=> {
        setUsername(e.target.value)
      }}/>
      <label>Password</label>
      <input type="text" value={password} onChange={(e)=> {
        setPassword(e.target.value)
      }}/>
      <button onClick={async()=>{
        props.setIsAuthLoading(true)
       const isLoggedIn=  await loginUser(username,password)
        if (isLoggedIn) {
          props.setIsAuthLoading(false)
          navigate('/')
        }
      }}>Login</button>
    </>
  )
}

export default LoginPage