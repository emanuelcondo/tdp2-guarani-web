import React, { Component } from 'react';
import { Table, Button, Modal, Row, Col, message, Input } from 'antd';
import * as TeacherService from '../service/TeacherService'
import moment from 'moment';

import EditFinalModal from './EditFinalModal'

var mockDataSource = [
  {    
    "_id": "5bcbbdf69be2db250c178fdd",
    "alumno": {
      "legajo": 100000,
      "nombre": "Juan",
      "apellido": "Perez",
    },
    "condicion": "Regular",
    "oportunidad" : 2,
    "notaCursada" : 6,    
    "notaExamen" : 4,    
    "notaCierre" : 5, 
    "timestamp": "2018-10-20T23:44:54.625Z",
  },
  {    
    "_id": "5bcbbdf63be2db250c178fdd",
    "alumno": {
      "legajo": 100001,
      "nombre": "Adrian",
      "apellido": "Suar",
    },
    "condicion": "Regular",
    "oportunidad" : 1,
    "notaCursada" : 6,   
    "notaExamen" : null,    
    "notaCierre" : null,    
    "timestamp": "2018-10-20T23:44:51.625Z",
  },
  {    
    "_id": "5bcabdf63be2db250c178fdd",
    "alumno": {
      "legajo": 100002,
      "nombre": "Ernesto",
      "apellido": "Guevara",
    },
    "condicion": "Libre",
    "oportunidad" : null,
    "notaCursada" : null,   
    "notaExamen" : 7,    
    "notaCierre" : null,    
    "timestamp": "2018-10-20T23:44:51.625Z",
  }];

class MyFinals extends Component {

  state = {
    tableMessage: 'Seleccione una materia por favor',
    showEditModal: false,
    fechaEdit: null,
    selectedCourse : null,
    selectedFinal : null
  }

  //Muestra el modal para confirmar cancelar un examen. Hecho con currying porque me salió así
  confirmCancel = (row) => () => {
    Modal.confirm({
      title: 'Cancelar fecha de final',
      okText: "Si",
      content: 'Esta acción enviará una notificación a los alumnos inscriptos. ¿Esta seguro que desea cancelar esta fecha de final?  ',
      okType: 'danger',
      onOk: this.cancelExam(row),
      cancelText: "No",
      onCancel: () => { },
    });
  }

  inscriptos = (row) => () => {
    TeacherService.getExamEnrolled(row.curso._id, row._id).then(
      (response) => {
        //Data para la tabla
        //const dataSource = response.data.data.inscripciones;
        const dataSource = mockDataSource;
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
        }, {
          title: 'Condicion',
          dataIndex: 'condicion',
          key: 'condicion',
        }, {
          title: 'Oportunidad',
          dataIndex: 'oportunidad',
          key: 'oportunidad',
          align: 'center',
        }, {
          title: 'Nota de Cursada',
          dataIndex: 'notaCursada',
          key: 'notaCursada',
          align: 'center',
        }, {
          title: 'Nota de Examen',
          dataIndex: 'notaExamen',
          key: 'notaExamen',
          align: 'center',
          render: notaExamen => {
            if (notaExamen != null) {
              return notaExamen;
            }
            else {
              return <span>
              <Input style={{ width: '20%' }}/><Button type='primary'>OK</Button>
            </span>
            }
          },
        }, {
          title: 'Nota de Cierre',
          dataIndex: 'notaCierre',
          key: 'notaCierre',
          align: 'center',
          render: (text, record) => {
            if (record.notaCierre != null) {
              return record.notaCierre;
            }
            else {
              var button;
              if (record.notaExamen != null) { button = <Button type='primary'>OK</Button> }
              else { button = <Button type='primary' disabled>OK</Button> }
              return <span>
              <Input style={{ width: '20%' }}/>{button}
            </span>
            }
          },
        }];
        //Modal
        Modal.info({
          title: 'Inscriptos',
          width: '80%',
          content: (
            <div>
              <Table rowKey="_id" dataSource={dataSource} columns={columns} style={{ width: '100%' }} locale={{ emptyText: 'No hay ningún inscripto' }} />
            </div>
          ),
          onOk() { },
        });
      }).catch((e) => {
        message.error('La información no esta disponible');
      })
  }

  //Funcion a llamar al cancelar un examen. Hecho con currying porque me salió así
  cancelExam = (row) => () => {
    TeacherService.cancelExam(row.curso._id, row._id).then(
      (response) => {
        message.success('La fecha de examen fue cancelada');
        this.props.update()
      }).catch((e) => {
        message.error('La fecha no pudo ser cancelada');
      })
  }

  handleOk = () => {
    this.setState({
      showEditModal: false,
    });
    this.props.update()
  }

  handleCancel = () => {
    this.setState({
      showEditModal: false,
    });
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
          const date = new moment(row.fecha)
          return date.format('DD-MM-YYYY')
        }
      }, {
        title: 'Horario',
        index: 'horario',
        dataIndex: 'hora',
        render: (value, row, idx) => {
          const date = new moment(row.fecha)
          return date.format('HH:mm')
        }
      }, {
        title: 'Aula asignada',
        index: 'aula',
        dataIndex: 'aula'
      }, {
        title: 'Docente',
        key: 'docente',
        dataIndex: 'docente',
      }, {
        title: 'Acciones',
        render: (value, row, idx) => {
          return <Button.Group>
            <Button type='primary' icon='ordered-list' disabled={row.cantidadInscriptos <= 0} onClick={this.inscriptos(row)} >
              Inscriptos
            </Button>
            <Button type='primary' icon='edit' onClick={() => { 
              console.log("ROW",row);
              this.setState({ fechaEdit: row.fecha, selectedCourse : row.curso._id, selectedFinal : row._id});
              this.setState({ showEditModal: true });
            }}>
              Editar
            </Button>
            <Button type='primary' icon='delete' onClick={this.confirmCancel(row)} >
              Cancelar
            </Button>
            <EditFinalModal
              visible={this.state.showEditModal}
              handleCancel={this.handleCancel}
              curso={row.curso.comision}
              date={this.state.fechaEdit}
              courseId={this.state.selectedCourse}
              finalId={this.state.selectedFinal}
              handleOk={this.handleOk}
            >
            </EditFinalModal>
          </Button.Group>
        }
      }
    ];

    return <Table
      dataSource={this.props.data}
      columns={columns}
      rowKey={record => record._id}
      pagination={false}
      locale={{ emptyText: this.state.tableMessage }}
      style={{ padding: 100 }}
    />

  }
}


export default MyFinals;