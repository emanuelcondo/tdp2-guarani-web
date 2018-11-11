import server from '../../../Server'


const CLASS_NAME = "AdminService"

export const createPeriod = (period) => {
  console.log(CLASS_NAME + 'create period', period);
  return server.post('/periodos', period)
}

export const getPeriods = () => {
  console.log(CLASS_NAME + ' - get periods information');
  return server.get('/periodos?page=1&limit=20')
}

export const updatePeriod = (period) => {
  console.log(CLASS_NAME + ' - update period', period);
  return server.put('/periodos/' + period._id, period)
}

export const deletePeriod = (period) => {
  console.log(CLASS_NAME + ' - delete period', period);
  return server.delete('/periodos/' + period._id, period)
}