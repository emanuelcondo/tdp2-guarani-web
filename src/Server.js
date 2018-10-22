import axios from 'axios';

export const SERVER_PATH = "https://guarani-server.herokuapp.com/api/v1.0";

const server = axios.create({
  baseURL : SERVER_PATH,
})

export default server;