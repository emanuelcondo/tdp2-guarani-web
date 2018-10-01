import server from '../../../Server'


export const getTeacherDataByToken= () => {
  console.log('Teacher Service - getTeacherDataByToken');
  return server.get('/docentes/mis-datos')
}


export const getAsignatures = () => {
  return server.get('/docentes/mis-cursos')
}

export const getCoursesOfTeacher = () => {
  return [{
    key: '1',
    age: 32,
    address: '10 Downing Street',
    numero:'1',
    name:'Profesor XXXXX',
    jtp:'Ing XXXX',
    cuatrimestre:'1',
    anio:'2018',
    cantidadDeInscriptos:'23',
    horario:'18-20',
    cantidadDeCondicionales:'0',
    sede:'(PC) Paseo Colon'
  }, {
    key: '2',
    age: 42,
    address: '10 Downing Street',
    numero:'2',
    name:'Profesor YYYY',
    jtp:'Ing YYYY',
    cuatrimestre:'1',
    anio:'2018',
    cantidadDeInscriptos:'20',
    horario:'18-20',
    cantidadDeCondicionales:'3',
    sede:'(PC) Paseo Colon'
  }];
}