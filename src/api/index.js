import Axios from 'axios';

const instance = Axios.create({
  baseURL: 'http://localhost:7000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem('jwtToken'));
    config.headers.Authorization = token;

    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (res) => res,
  (err) => {
    let error;
    if (err.response) {
      error = err.response.data.message;
    } else {
      error = err.message;
    }
    throw new Error(error);
  }
);

export default instance;
