import server from '../../../Server'

const className = "AUTH-SERVICE"

export const authUser = (auth) => {
  console.log(className+'login user',auth);
  return server.post('/docentes/login',auth)
}