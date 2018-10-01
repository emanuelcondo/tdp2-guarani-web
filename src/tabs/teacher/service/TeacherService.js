import server from '../../../Server'


export const getTeacherDataByToken= () => {
  console.log('Teacher Service - getTeacherDataByToken');
  return server.get('/docentes/mis-datos')
}


export const getAsignatures = () => {
  return server.get('/docentes/mis-cursos')
}

export const getMoreInformationFromCourseById = (courseId) => {
  return server.get('/docentes/mis-cursos/'+courseId)
}