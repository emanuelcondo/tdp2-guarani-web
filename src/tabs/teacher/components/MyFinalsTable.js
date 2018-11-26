import React, { Component } from 'react';
import { Table, Button, Modal, Row, Col, message, Input } from 'antd';
import * as TeacherService from '../service/TeacherService'
import moment from 'moment';

import EditFinalModal from './EditFinalModal'
import FinalActModal from './FinalActModal';

class MyFinals extends Component {

  state = {
    tableMessage: 'Seleccione una materia por favor',
    showEditModal: false,
    showFinalModal: false,
    fechaEdit: null,
    selectedCourse : null,
    selectedFinal : null,
    selectedFinalActa : null,
    inscriptosAFinal : {},
    notasFinal : {}
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

  handleCancelFinal = () => {
    this.setState({
      showFinalModal: false,
    });
  }

  onClickInscriptosAFinal = (row) => () => {
    this.setState( { inscriptosAFinal : {} } );
      TeacherService.getExamEnrolled(row.curso._id, row._id).then( 
          (response) => {
            let notasFinal =  { registros : [] }
            this.setState( { selectedCourse : row.curso._id, selectedFinal : row._id, showFinalModal : true, inscriptosAFinal : response.data.data.inscripciones,
            notasFinal : notasFinal, selectedFinalActa : row.acta } )
          }
      ) 
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
            <Button type='primary' icon='ordered-list' disabled={row.cantidadInscriptos <= 0} onClick={this.onClickInscriptosAFinal(row)}>
              Inscriptos
            </Button>
            <Button type='primary' icon='edit' onClick={() => { 
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
            ></EditFinalModal>
            <FinalActModal
              courseId={this.state.selectedCourse}
              finalId={this.state.selectedFinal}   
              visible={this.state.showFinalModal}  
              handleCancel={this.handleCancelFinal}
              inscriptosAFinal={this.state.inscriptosAFinal}      
              notasFinal={this.state.notasFinal} 
              acta={this.state.selectedFinalActa} 
            ></FinalActModal>
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