import axios from 'axios';
import { history } from 'umi';

axios.interceptors.request.use(
  (config: any) => {
    if (localStorage.getItem('token')) {
      config.headers.token = localStorage.getItem('token');
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axios.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.status === 'token过期') {
      localStorage.removeItem('token');
      history.push(`/login`);
    }
    return res;
  },
  (err) => {
    return Promise.reject(err);
  },
);

export default axios;
