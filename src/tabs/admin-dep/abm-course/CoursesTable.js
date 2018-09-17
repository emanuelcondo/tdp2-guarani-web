import React,{Component} from 'react';
import {Table} from 'antd';



const data = [{
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
}]

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
},
{
  title:'Actions'
}
];



class CoursesTable extends Component {
  render(){
    const dataSource = data;
    return<Table dataSource={dataSource} columns={columns} />
  }
}

export default CoursesTable;

