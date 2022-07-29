import React, { createContext, useState, useEffect, ReactNode } from 'react';
import api from '../api';
import { UserForm } from '../routes/loginRegister/types';

const Context = createContext<any | undefined>(undefined);

type FormProviderProps = {
    children: ReactNode;
}

function AuthContext({ children }: FormProviderProps) {
    const [authenticated, setAuthenticated] = useState<boolean>(false) 
    const [userForm, setUserForm] = useState<UserForm>({ 
        name: '', email: '', password: '', password2: '' 
    })
    
    useEffect(() => {
        const token = localStorage.getItem('token')
    
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(token)}`
            setAuthenticated(true)

        }
    }, [])

    const handleLogout = () => {
        setAuthenticated(false)
        // setUserId(undefined)
        // setUserToken(undefined)
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
    }

  return (
    <Context.Provider value={{ userForm, setUserForm, authenticated, setAuthenticated, handleLogout }}>
        { children }
    </Context.Provider>
  )
}

export { Context, AuthContext } 