import React, { Component } from 'react';
import { Table, Button, Modal, Row, Col, message } from 'antd';
import * as TeacherService from '../service/TeacherService'

class MyFinals extends Component {

  state = {
    tableMessage: 'Seleccione una materia por favor'
  }

  //Muestra el modal para confirmar cancelar un examen. Hecho con currying porque me salió así
  confirm = (row) => () => {
    Modal.confirm({
      title: 'Cancelar fecha de final',
      content: '¿Esta seguro que desea cancelar este fecha de final?',
      okText : "Si",
      okType: 'danger',
      onOk : this.cancelExam(row),
      cancelText : "No",
      onCancel : () => {},
    });
  }

  //Muestra el modal de inscriptos. Hecho con currying porque me salió así
  inscriptos = (row) => () => {
    TeacherService.getExamEnrolled(row.course, row._id).then( 
      (response) => {
        //Data para la tabla
        const dataSource = response.data.inscripciones;
        const columns = [{
          title: 'Padrón',
          dataIndex: 'alumno.legajo',
          key: 'alumno.legajo',
        }, {
          title: 'Nombre',
          dataIndex: 'alumno.nombre',
          key: 'alumno.nombre',
        }, {
          title: 'Apellido',
          dataIndex: 'alumno.apellido',
          key: 'alumno.apellido',
        }];
        //Modal
        Modal.info({
          title: 'Inscriptos',
          content: (
            <div>
              <Table dataSource={dataSource} columns={columns} />
            </div>
          ),
          onOk() {},
        });    
      }).catch((e) => {
        message.error('La información no esta disponible');
    })
  }

  //Funcion a llamar al cancelar un examen. Hecho con currying porque me salió así
  cancelExam = (row) => () => {
    TeacherService.cancelExam(row.course, row._id).then( 
      (response) => {
      message.success('La fecha de examen fue cancelada');
    }).catch((e) => {
      message.error('La fecha no pudo ser cancelada');
    })
  }

  render() {

    const columns = [
      {
        title: 'Número de Curso',
        dataIndex: 'curso.comision',
        key: 'numero'
      }, {
        title: 'Día',
        index: 'dia',
        dataIndex: 'fecha',
        render: (value, row, idx) => {
          const date = new Date(row.fecha);
          return date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear()
        }
      }, {
        title: 'Horario',
        index: 'horario',
        dataIndex: 'hora',
        render: (value, row, idx) => {
          const date = new Date(row.fecha)
          return date.getHours() + ':' + date.getMinutes()
        }
      }, {
        title: 'Aula asignada',
        index: 'aula',
        dataIndex: 'aula'
      }, {
        title: 'Docente',
        key: 'docente',
        dataIndex: 'docenteACargo',
        render: (value, row, idx) => {
          return row.curso.docenteACargo.nombre + ', ' + row.curso.docenteACargo.apellido
        }

      }, {
        title: 'Inscriptos',
        render: (value, row, idx) => {
          return <Button type='primary' onClick={this.inscriptos(row)} >
            Ver Inscriptos
          </Button>
        }
      }, {
        title: 'Examen final',
        render: (value, row, idx) => {
          return <Button type='primary' onClick={this.confirm(row)} >
            Cancelar final
          </Button>
        }
      }
    ];

    return <Table
      dataSource={this.props.data}
      columns={columns}
      rowKey={record => record.comision}
      pagination={false}
      locale={{ emptyText: this.state.tableMessage }}
      style={{ padding: 100 }}
    />

  }
}


export default MyFinals;