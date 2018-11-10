import React, { Component } from 'react'
import { Modal } from 'antd';
import CreateNewPeriodForm from './NewPeriodForm'
import * as AdminService from './service/AdminService'


class NewPeriodModal extends Component {

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  handleOk = () => {
    /**
      {
        "cuatrimestre": 1,
        "anio": {{anio}},
        "inscripcionCurso": {
          "inicio": "{{anio}}-02-10T03:00:00.877Z",
          "fin": "{{anio}}-02-15T03:00:00.877Z"
        },
        "desinscripcionCurso": {
          "inicio": "{{anio}}-02-17T03:00:00.877Z",
          "fin": "{{anio}}-02-22T03:00:00.877Z"
        },
        "cursada": {
          "inicio": "{{anio}}-02-22T03:00:00.877Z",
          "fin": "{{anio}}-07-03T03:00:00.877Z"
        },
        "consultaPrioridad": {
          "inicio": "{{anio}}-02-07T03:00:00.877Z",
          "fin": "{{anio}}-07-03T03:00:00.877Z"
        }
      }
     */
    console.log('newfinalmodal handleOk');
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('values', values);

      const period = {
          cuatrimestre: 2,
          anio: '2001',
          inscripcionCurso: {
              inicio: '2018-08-10T03:00:00.877Z',
              fin: '2018-08-15T03:00:00.877Z'
          },
          desinscripcionCurso: {
              inicio: '2018-08-17T03:00:00.877Z',
              fin: '2018-08-22T03:00:00.877Z'
          },
          cursada: {
              inicio: '2018-08-22T03:00:00.877Z',
              fin: '2018-12-03T03:00:00.877Z'
          },
          consultaPrioridad: {
              inicio: '2018-08-07T03:00:00.877Z',
              fin: '2018-12-03T03:00:00.877Z'
          }
      }
/*
      const dateToSend = new Date(values.dia._d)
      const hour = new Date(values.horario._d)
      dateToSend.setHours(hour.getHours())
      dateToSend.setMinutes(hour.getMinutes())
      dateToSend.setSeconds(0)
      */
    })

    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  createPeriod = (periodInfo) => {
    AdminService.createPeriod(periodInfo).then((response) => {
      console.log('NormalLogin - the user is logged');
      console.log('NormalLogin - response', response);
      //display success
      
    }).catch((e) => {
      console.log('NormalLogin -  the is not logged');
      console.log('NormalLogin -  error', e);
      //display error
    })
  }

  render() {
    return <Modal
      title="Nuevo período"
      visible={this.props.visible}
      width={1000}
      onOk={this.handleOk}
      okText='Grabar'
      onCancel={this.props.handleCancel}
      cancelText='Cancelar'
    >
      <CreateNewPeriodForm
        wrappedComponentRef={this.saveFormRef}
        rowdata={this.props.rowdata}
        onCreate={this.handleOk}
      ></CreateNewPeriodForm>
    </Modal >
  }
}

export default NewPeriodModal;
