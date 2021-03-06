import server from '../../../Server'

export const getDepartmentDataByToken = () => {
  return server.get('/departamentos/gestion')
}

export const getCoursesByMateriaID = (materiaID) => {
    return server.get(`/materias/${materiaID}/cursos`)
}

export const getCoursesByDepartamentID = (departamentID, params) => {
    let query = [];
    if (params.page) query.push('page='+params.page);
    if (params.limit) query.push('limit='+params.limit);
    if (params.docenteACargo) query.push('docenteACargo='+params.docenteACargo);
    if (params.jtp) query.push('jtp='+params.jtp);
    if (params.materia) query.push('materia='+params.materia);
    if (params.anio) query.push('anio='+params.anio);
    if (params.cuatrimestre) query.push('cuatrimestre='+params.cuatrimestre);
    let query_string = query.length ? ('?'+query.join('&')) : '';

    return server.get(`/departamentos/${departamentID}/cursos${query_string}`)
}

export const searchProfessors = (text) => {
    let query_string = (text && text.trim()) ? ('?search='+text) : '';
    return server.get(`/docentes${query_string}`)
}

export const deleteCourseByID = (materiaID, courseID) => {
    return server.delete(`/materias/${materiaID}/cursos/${courseID}`)
}
  
/**
 * Crea un nuevo curso
 * @param {*} data Consultar API doc del server
 */
export const newCourse = (data) => {
    return server.post(`/materias/${data.materia}/cursos`, data)
}

/**
 * Crea un nuevo curso
 * @param {*} data Consultar API doc del server
 */
export const editCourse = (data) => {
    return server.put(`/materias/${data.materia}/cursos/${data.curso}`, data)
}