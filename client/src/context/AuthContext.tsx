import React, { createContext, useState, useEffect, ReactNode } from 'react';
import api from '../api';
import { FormProviderProps, UserForm, UserData } from './types';

const Context = createContext<any | undefined>(undefined);

function AuthContext({ children }: FormProviderProps) {
    const [authenticated, setAuthenticated] = useState<boolean>(false) 
    const [userForm, setUserForm] = useState<UserForm>({ 
        name: 'Rodrigo', email: 'rodrigo@gmail.com', password: '123456', password2: '123456' 
    })

    const { name, email, password } = userForm

    const handleRegister = async () => {
        const { data } = await api.post<UserData>('/users/register', {
            name,
            email,
            password,
        })

        localStorage.setItem('token', JSON.stringify(data.token))
        api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`

        console.log(data)
    }

  return (
    <Context.Provider value={{ userForm, setUserForm, handleRegister }}>
        { children }
    </Context.Provider>
  )
}

export { Context, AuthContext } 