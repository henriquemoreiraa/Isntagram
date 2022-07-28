import { ReactNode } from "react";

export type FormProviderProps = {
    children: ReactNode;
}

export type UserForm = {
    name: string;
    email: string;
    password: string;
    password2: string   
}

export type UserData = {
    _id: string;
    name: string;
    email: string;
    user_img: string;
    token: string
}