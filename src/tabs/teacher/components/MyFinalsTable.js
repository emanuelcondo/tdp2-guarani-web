import React, { Component } from 'react';
import { Table, Button, Modal, Row, Col, message } from 'antd';
import * as TeacherService from '../service/TeacherService'

import EditFinalModal from './EditFinalModal'

class MyFinals extends Component {

  state = {
    tableMessage: 'Seleccione una materia por favor',
    showEditModal: false
  }

  //Muestra el modal para confirmar cancelar un examen. Hecho con currying porque me salió así
  confirm = (row) => () => {
    Modal.confirm({
      title: 'Cancelar fecha de final',
      content: '¿Esta seguro que desea cancelar este fecha de final?',
      okText: "Si",
      okType: 'danger',
      onOk: this.cancelExam(row),
      cancelText: "No",
      onCancel: () => { },
    });
  }

  inscriptos = (row) => () => {
    TeacherService.getExamEnrolled(row.course, row._id).then(
      (response) => {
        //Data para la tabla
        const dataSource = response.data.data.inscripciones;
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
          onOk() { },
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
        this.props.update()
      }).catch((e) => {
        message.error('La fecha no pudo ser cancelada');
      })
  }

  handleOk = () => {
    console.log('handleOk my finals');
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
          const date = new Date(row.fecha)
          console.log('Dibujando la fecha', date);
          console.log('Fecha obtenida', date.getUTCDate() + '-' + date.getUTCMonth() + 1 + '-' + date.getFullYear());
          return ("0" + date.getUTCDate()).slice(-2) + '-' + (date.getUTCMonth() + 1) + '-' + date.getFullYear()
        }
      }, {
        title: 'Horario',
        index: 'horario',
        dataIndex: 'hora',
        render: (value, row, idx) => {
          const date = new Date(row.fecha)
          return ("0" + date.getHours()).slice(-2) + ':' + ("0" + date.getMinutes()).slice(-2)
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
        title: 'Acciones',
        render: (value, row, idx) => {
          return <Button.Group>
            <Button type='primary' onClick={this.confirm(row)} >
              Cancelar
            </Button>
            <Button type='primary' onClick={this.inscriptos(row)} >
              Ver Inscriptos
          </Button>
            <Button type='primary' onClick={() => { this.setState({ showEditModal: true }) }}>
              Editar
              </Button>
            <EditFinalModal
              visible={this.state.showEditModal}
              handleCancel={this.handleCancel}
              curso={row.curso.comision}
              date={row.fecha}
              courseId={row.curso._id}
              finalId={row._id}
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