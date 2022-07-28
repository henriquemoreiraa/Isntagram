import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import api from '../api';

type FormProviderProps = {
    children: ReactNode;
}

type UserForm = {
    name: string;
    email: string;
    password: string;
    password2: string   
}

type UserData = {
    _id: string;
    name: string;
    email: string;
    user_img: string;
    token: string
}

const Context = createContext<any | undefined>(undefined);

function AuthContext({ children }: FormProviderProps) {
    const [authenticated, setAuthenticated] = useState<boolean>(false) 
    const [userForm, setUserForm] = useState<UserForm>({ name: '', email: '', password: '', password2: '' })

    const { name, email, password } = userForm

    const handleRegister = async () => {
        const { data } = await api.post<UserData>('/users/register', {
            name,
            email,
            password,
        })

        localStorage.setItem('token', JSON.stringify(data.token))
        api.defaults.headers.Authorization = `Bearer ${data.token}`
    }

  return (
    <Context.Provider value={{ userForm, setUserForm }}>
        { children }
    </Context.Provider>
  )
}

export { Context, AuthContext } 