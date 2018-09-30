import axios from 'axios';

const axiosIntance = axios.create({
  baseURL:'http://localhost:8080/api/v1.0',
})

export default axiosIntance;