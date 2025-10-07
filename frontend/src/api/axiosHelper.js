import axios from "axios";

const BASE_URL = import.meta.env.MODE === 'development' ? 'http://localhost:3000/api' : '/api';

export const api = axios.create({
  baseURL: BASE_URL, // Backend URL
  timeout: 20000, // 20 seconds instead of 5
  withCredentials: true,
});