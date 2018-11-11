import server from '../../../Server'

export const getDepartmentDataByToken = () => {
  return server.get('/departamentos/gestion')
}

export const getCursosByMateriaID = (materiaID) => {
    return server.get(`/materias/${materiaID}/cursos`)
}
  