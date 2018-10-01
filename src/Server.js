import axios from 'axios';

const server = axios.create({
  baseURL:'https://guarani-server.herokuapp.com/api/v1.0',
})




export default server;