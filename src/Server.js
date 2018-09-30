import axios from 'axios';

const axiosIntance = axios.create({
  baseUrl:'http://localhost:8080/api/v1.0',
})

export default axiosIntance;