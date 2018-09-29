import axios from 'axios';

const axiosIntance = axios.create({
  baseUrl:'http://localhost:8080',
})

export default axiosIntance;