import axios from 'axios';
import { history } from 'umi';
import { message } from 'antd';

axios.interceptors.request.use(
  (config: any) => {
    if (localStorage.getItem('yjtoken')) {
      config.headers.yjtoken = localStorage.getItem('yjtoken');
    }
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
    if (res.status === 1001) {
      localStorage.removeItem('yjtoken');
      localStorage.removeItem('token');
      message.info('请重新登录');
      history.push(`/login`);
    }
    return res;
  },
  (err) => {
    return Promise.reject(err);
  },
);

export default axios;
