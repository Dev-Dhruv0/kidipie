import axios from "axios";
import type { AxiosInstance } from "axios";
import type { SignUpFormData } from "../pages/SignUpPage";

const api: AxiosInstance = axios.create({
    baseURL: "http://localhost:8000/api/v1/",
})

type Tokens = {
    access_token: string;
    refresh_token: string;
    user_id: string;
}

export interface UserCredentials {
    email: string;
    password: string;
}

// this is not safe but for now storing credentials in local storage
export const loginUser = async (credentials: UserCredentials) => {
    try {
        const response = await api.post<Tokens>("auth/login", credentials);
        localStorage.setItem("tokens", JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const signUpUser = async (credentials: SignUpFormData) => {
    try {
        const response = await api.post("auth/signup", credentials);
        localStorage.setItem("tokens", JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        throw error
    }
}

export const logoutUser = () => {
    localStorage.removeItem("tokens");
}


// const tokens: Tokens = await loginUser({
//     email: "bindubhatoy@gmail.com",
//     password: "bhatoy"
// })

// console.log(tokens)

