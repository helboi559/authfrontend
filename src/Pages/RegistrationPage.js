import React from 'react'
import { useState } from 'react'
import { registerUser,loginUser } from '../Auth'
import { useNavigate } from 'react-router-dom'

const RegistrationPage = (props) => {
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
        registerUser(username,password)
        await props.setIsAuthLoading(true)
        if (loginUser) {
          props,setIsAuthLoading(false)
          navigate('/')
        }
      }}>Signup</button>
    </>
  )
}

export default RegistrationPage