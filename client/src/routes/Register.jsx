import React, { useContext } from 'react'
import { Context } from '../context/AuthContext'

function Register() {
   const { handleRegister } = useContext(Context) 
  
    return (
    <button onClick={() => handleRegister()}>Register</button>
    )
}

export default Register