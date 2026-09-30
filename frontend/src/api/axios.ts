import axios from "axios";
import type { AxiosInstance } from "axios";
import { type SignUpFormData } from "../Auth/SignUpPage";
import type { CreatedPost } from "../types";

export const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
  },
});

api.interceptors.request.use((config) => {
  const storedTokens = localStorage.getItem("tokens");
  if (storedTokens) {
    const tokens = JSON.parse(storedTokens);
    config.headers.Authorization = `Bearer ${tokens.access_token}`;
  }
  if (typeof FormData !== "undefined" && config.data instanceof FormData) {
    if (config.headers.delete) {
      config.headers.delete("Content-Type");
    } else {
      delete config.headers["Content-Type"];
    }
  }
  return config;
});

type Tokens = {
  access_token: string;
  refresh_token: string;
  user_id: string;
};

export interface UserCredentials {
  email: string;
  password: string;
}

export interface PostData {
  content: string;
  image?: File | null;
}

export interface CommentData {
  post_id: string;
  content: string;
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
};

export const signUpUser = async (credentials: SignUpFormData) => {
  try {
    const response = await api.post("auth/signup", credentials);
    localStorage.setItem("tokens", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createPost = async ({ content, image }: PostData): Promise<CreatedPost> => {
  const formData = new FormData();
  formData.append("content", content);
  if (image) {
    formData.append("image", image);
  }
  const response = await api.post<CreatedPost>("posts/create", formData);
  return response.data;
};

export const createComment = async (_commentData: CommentData) => {
  return;
};

export const fetchPosts = async () => {
  try {
    const response = await api.get("posts/list")
    return response.data
  } catch (error) {
    throw error
  }
}

export const fetchComments = async (post_id: number) => {
  try {
    const response = await api.get(`comments/${post_id}`)
    return response.data
  } catch (error) {
    throw error
  }
}
export const logoutUser = () => {
  localStorage.removeItem("tokens");
};
