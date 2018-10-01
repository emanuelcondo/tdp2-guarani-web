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


export const addConditionalStudent = (idCourse,idStudent) => {
  //return server.get('docentes/mis-cursos/'+idCourse+'/inscribir-alumnos',{
  //  'alumnos':[idStudent]
  //})
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{resolve()},2000)
  })
}