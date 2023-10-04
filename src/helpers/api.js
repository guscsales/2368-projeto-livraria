import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.VITE_API_SERVICES_URL,
});

export const fetcher = (url) => api.get(url).then(({ data }) => data);
