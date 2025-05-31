import axios from 'axios';
import useAuth from './../hooks/useAuth';


const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000',
});

const useAxiosSecure = () => {
  const { logOut } = useAuth();

  axiosSecure.interceptors.request.use(function (config) {
    const token = localStorage.getItem('access-token');
    config.headers.authorization = `Bearer ${token}`;
    return config;
  }, function(error) {
    return Promise.reject(error);
  });

  // intercepts 401 or 403 status
  axiosSecure.interceptors.response.use(function (response) {
    return response;
  }, async (error) => {
    const status = error.response?.status;
    if (status === 401 || status === 403) {
      await logOut();
      // The component using this hook can handle the navigation
      return Promise.reject({ redirectToLogin: true });
    }
    return Promise.reject(error);
  });

  return axiosSecure;
};

export default useAxiosSecure;