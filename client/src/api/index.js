import axios from "axios";

const baseURL = "http://localhost:5001";
const url = `${baseURL}/posts`;
const authUrl = `${baseURL}/auth`;

const API = axios.create({ baseURL });

API.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("user")) {
      const token = JSON.parse(localStorage.getItem("user")).token;
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchPosts = () => API.get(url);
export const fetchUserPosts = (id) => API.get(`${url}/userPosts/${id}`);
export const fetchPost = (id) => API.get(`${url}/${id}`);
export const fetchPostsBySearch = (searchQuery = "", tags = []) => {
  const encodedSearchQuery = encodeURIComponent(searchQuery);
  const encodedTags = tags.map((tag) => encodeURIComponent(tag));

  const tagsParam = encodedTags.join(",");

  return API.get(`${url}/search/${encodedSearchQuery}/${tagsParam}`);
};

export const createPost = (newPost) => API.post(url, newPost);
export const likePost = (id) => API.patch(`${url}/${id}/likePost`);
export const commentPost = (comment, id) =>
  API.post(`${url}/${id}/commentPost`, comment);
export const updatePost = (id, post) => API.patch(`${url}/${id}`, post);
export const deletePost = (id) => API.delete(`${url}/${id}`);

export const login = (user) => API.post(`${authUrl}/login`, user);
export const register = (user) => API.post(`${authUrl}/register`, user);
