import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

type FormProviderProps = {
    children: ReactNode;
}

const Context = createContext<any | undefined>(undefined);

function AuthContext({ children }: FormProviderProps) {



  return (
    <Context.Provider value={{  }}>
        { children }
    </Context.Provider>
  )
}

export { Context, AuthContext } 