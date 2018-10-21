import server from '../../../Server'


export const getTeacherDataByToken = () => {
  console.log('Teacher Service - getTeacherDataByToken');
  return server.get('/docentes/mis-datos')
}


export const getAsignatures = () => {
  return server.get('/docentes/mis-cursos')
}

export const getMoreInformationFromCourseById = (courseId) => {
  return server.get('/docentes/mis-cursos/' + courseId)
}


export const addConditionalStudent = (idCourse, idStudent) => {
  return server.post('docentes/mis-cursos/' + idCourse + '/inscribir-alumnos', {
    'alumnos': [idStudent]
  })
}

export const downloadCourseInformation = (courseId) => {
  return server.get('/docentes/mis-cursos/' + courseId + '?exportar=true')
}


export const getExamenes = (courseId) => {
  return server.get(`/docentes/mis-cursos/${courseId}/examenes`)
}


export const createExam = (courseId, date) => {
  return server.post(`docentes/mis-cursos/${courseId}/examenes`, { 'fecha': date })
}

