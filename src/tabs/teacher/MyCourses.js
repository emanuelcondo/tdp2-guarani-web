import React,{Component} from 'react';
import {Table} from 'antd';
import * as teacherService from './TeacherService';


const columns = [
  {
    title:'Número de Curso',
    dataIndex:'numero',
    key:'numero'
  },
  {
  title: 'Docente',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'JTP',
  dataIndex: 'jtp',
  key: 'jtp',
}, {
  title: 'Periodo Lectivo',
  dataIndex: 'cuatrimestre',
  key: 'cuatrimestre',
},{
  title:'Año',
  dataIndex:'anio',
  key:'anio'
},{
  title:'Cantidad de Inscriptos',
  dataIndex:'cantidadDeInscriptos',
  key:'cantidadAlumno'
},{
  title:'Horario',
  dataIndex:'horario',
  key:'horario'
},{
  title:'Cantidad de Condicionales',
  dataIndex:'cantidadDeCondicionales',
  key:'cantidadDeCondicionales'
},{
  title:'Ayudantes de Primera',
  dataIndex:'ayudantesDePrimera',
  key:'ayudantesDePrimera'
},{
  title:'Ayudantes de Segunda',
  dataIndex:'ayudantesDeSegunda',
  key:'ayudantesDeSegunda'
},
{
  title:'Sede',
  dataIndex:'sede',
  key:'sede' 
},
{
  title:'Aula',
  dataIndex:'aula',
  key:'aula'
}
];



class MyCourses extends Component {
  render(){
    const dataSource = teacherService.getCoursesOfTeacher();
    return<Table dataSource={dataSource} columns={columns} />
  }
}

export default MyCourses;

