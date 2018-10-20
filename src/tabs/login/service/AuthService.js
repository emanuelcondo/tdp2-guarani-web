import server from '../../../Server'


const CLASS_NAME = "AuthService"

export const authUser = (auth) => {
  console.log(CLASS_NAME + 'login user', auth);
  return server.post('/autogestion/login', auth)
}


export const getUserInformation = () => {
  console.log(CLASS_NAME + 'get user information');
  return server.get('/autogestion/mis-datos')
}