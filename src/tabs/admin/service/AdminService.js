import server from '../../../Server'


const CLASS_NAME = "AdminService"

export const createPeriod = (auth) => {
  console.log(CLASS_NAME + 'create period', auth);
  return server.post('/periodos', auth)
}


export const getPeriods = () => {
  console.log(CLASS_NAME + 'get periods information');
  return server.get('/periodos?page=1&limit=20')
}