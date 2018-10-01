import React,{Component} from 'react';
import {Table, Button,Modal} from 'antd';
import * as teacherService from './service/TeacherService';


const columns = [
  {
    title:'Número de Curso',
    dataIndex:'comision',
    key:'numero'
  },
  {
  title: 'Docente',
  key: 'name',
  render:(e,v,c)=>{
    return <div key={c}>{v.docenteACargo.apellido+','+v.docenteACargo.nombre}</div>
  }
}, {
  title: 'JTP',
  key: 'jtp',
  render:(e,v,c)=>{
    return v.ayudantes.map((ayudante,idx)=>{ 
    return <div key={idx}>{ayudante.apellido+','+ayudante.nombre}</div>}
    )
  }
},{
  title:'Cantidad de Inscriptos',
  dataIndex:'cantidadDeInscriptos',
  key:'cantidadAlumno',
  render:(value,row,idx)=>{
    return '40-mock'
  }

},{
  title:'Ayudantes de Primera',
  dataIndex:'ayudantesDePrimera',
  key:'ayudantesDePrimera'
},{
  title:'Ayudantes de Segunda',
  dataIndex:'ayudantesDeSegunda',
  key:'ayudantesDeSegunda'
},{
    title:'Alumnos Inscriptos',
    render:(value,row,idx)=>{
      console.log('row.inscriptos',row);
      return <Button
      onClick={()=>{
        const columns = [
          {
            title:'Padron'
          },{
            title:'Carrera'
          },{
            title:'Nombre y Apellido'
          },{
            title:'Prioridad'
          }
      ]
        Modal.info({
          title:'Alumnos Inscriptos',
          content:<Table
            columns={columns}
          />,
          width:'1000px'
        })
      }}
      >
        Ver información
      </Button>
  }
}
];



class MyCourses extends Component {


  expandedRowRender = (row,idx,indent,expanded) => {
    const columns = [
      {
        title:'Dia',
        index:'dia',
        dataIndex:'dia'
      },{
        title:'Horario',
        render:(e,row,idx)=>{
          console.log('row',row);
          return row.horario_desde + '-'+ row.horario_hasta
        }
      },{
        title:'Sede',
        index:'sede',
        dataIndex:'sede'
      },{
        title:'Aula',
        dataIndex:'aula'
      },{
        title:'Tipo',
        dataIndex:'tipo'
      }
    ]
    console.log('row.cursada',row.cursada);
    row.cursada.forEach(element => {
      element['sede'] = row.sede.nombre
    });
    return <Table
      dataSource={row.cursada}
      columns={columns}
      pagination={false}
    />
  }

  render(){
    return <Table 
    dataSource={this.props.data} 
    columns={columns} 
    rowKey={record => record.comision}
    expandedRowRender={this.expandedRowRender}
    />
  }
}

export default MyCourses;

