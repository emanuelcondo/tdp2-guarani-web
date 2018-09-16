import React,{Component} from 'react';
import {Table} from 'antd';
import * as teacherService from './TeacherService';


const columns = [
  {
    title:'Número',
    dataIndex:'numero',
    key:'numero'
  },
  {
  title: 'Docente',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'JTP',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Cuatrimestre',
  dataIndex: 'address',
  key: 'address',
},{
  title:'Año',
  dataIndex:'anio',
  key:'anio'
},{
  title:'Cantidad de Alumnos',
  dataIndex:'cantidadAlumnos',
  key:'cantidadAlumno'
},{
  title:'Horario',
  dataIndex:'horario',
  key:'horario'
}
];



class MyCourses extends Component {
  render(){
    const dataSource = teacherService.getCoursesOfTeacher();
    return<Table dataSource={dataSource} columns={columns} />
  }
}

export default MyCourses;

