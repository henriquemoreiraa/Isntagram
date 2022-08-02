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
    const [followUnfUser, setFollowUnfUser] = useState<boolean>(true)

    
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

    const handleUnfollow = async (unfollowedId: string, unfollowerId: string) => {
        await api.put(`/users/unfollow/${unfollowedId}`, {
            id: unfollowerId 
        })
        setFollowUnfUser(!followUnfUser)
    }

    const handleFollow = async (followedId: string, followerId: string) => {
        await api.put(`/users/follow/${followedId}`, {
            id: followerId 
        })
        setFollowUnfUser(!followUnfUser)
    }    

  return (
    <Context.Provider value={{ userForm, setUserForm, authenticated, setAuthenticated, handleLogout, handleUnfollow, handleFollow, followUnfUser }}>
        { children }
    </Context.Provider>
  )
}

export { Context, AuthContext } 