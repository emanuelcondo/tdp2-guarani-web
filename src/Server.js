import axios from 'axios';

const axiosIntance = axios.create({
  baseURL:'http://localhost:3000/api/v1.0',
})

export default axiosIntance;