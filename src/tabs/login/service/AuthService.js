import server from '../../../Server'


const CLASS_NAME = "AuthService"

export const authUser = (auth) => {
  console.log(CLASS_NAME + 'login user', auth);
  /** Se mockea hasta que se tenga un usuario admin y hasta que exista un unico login **/
  return new Promise((resolve, reject) => {
    console.log(auth.usuari);
    if (auth.usuario === '333') {
      resolve({
        data: {
          data: {
            token: 'algunToken',
            rol: 'admin'
          }
        }
      })
    } else {
      resolve({
        data: {
          data: {
            token: 'algunToken',
            rol: 'teacher'
          }
        }
      })
    }

  })
  //return server.post('/docentes/login', auth)
}