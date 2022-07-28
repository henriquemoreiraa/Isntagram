import React, { createContext, useState, useEffect } from 'react';
import api from '../api';
import { FormProviderProps, UserForm } from './types';

const Context = createContext<any | undefined>(undefined);

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
        localStorage.removeItem('token')
    }

  return (
    <Context.Provider value={{ userForm, setUserForm, authenticated, setAuthenticated }}>
        { children }
    </Context.Provider>
  )
}

export { Context, AuthContext } 