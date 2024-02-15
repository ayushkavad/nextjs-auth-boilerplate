import axios from 'axios';
import { setupInterceptors } from './interceptors';

export const api = setupInterceptors(
  axios.create({
    baseURL: process.env.NEXT_PUBLIC_REACT_APP_API_URL,
  }),
);
