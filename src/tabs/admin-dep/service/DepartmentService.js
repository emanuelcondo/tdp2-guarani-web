import server from '../../../Server'

export const getDepartmentDataByToken = () => {
  return server.get('/departamentos/gestion')
}

export const getCoursesByMateriaID = (materiaID) => {
    return server.get(`/materias/${materiaID}/cursos`)
}

export const getCoursesByDepartamentID = (departamentID) => {
    return server.get(`/departamentos/${departamentID}/cursos`)
}

export const deleteCourseByID = (materiaID, courseID) => {
    return server.delete(`/materias/${materiaID}/cursos/${courseID}`)
}
  