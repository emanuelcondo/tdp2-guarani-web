import server from '../../../Server'


const CLASS_NAME = "AuthService"

export const authUser = (auth) => {
  console.log(CLASS_NAME + 'login user', auth);
  /** Se mockea hasta que se tenga un usuario admin y hasta que exista un unico login **/
  if (auth.usuario === '333') {
    return new Promise((resolve, reject) => {
      console.log(auth.usuari);
      resolve({
        data: {
          data: {
            token: 'algunToken',
            rol: 'admin'
          }
        }
      })
    })
  }
  return server.post('/docentes/login', auth)
}