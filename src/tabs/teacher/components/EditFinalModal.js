import React, { Component } from 'react'
import { Modal, message } from 'antd';
import CollectionCreateForm from './FinalForm'
import * as TeacherService from '../service/TeacherService'


export default class EditFinalModal extends Component {

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  handleOk = () => {
    console.log('editfinalmodal handleOk');
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('values', values);
      const dateToSend = new Date(values.dia._d)
      const hour = new Date(values.horario._d)
      dateToSend.setHours(hour.getHours())
      dateToSend.setMinutes(hour.getMinutes())
      dateToSend.setSeconds(0)
      console.log('date to send the server', dateToSend);
      TeacherService.updateExam(this.props.courseId, this.props.finalId, dateToSend).then(() => {
        console.log('Se actualizó la fecha de final');
        this.props.handleOk()
        message.success('La fecha de final se actualizó de manera correcta')
      }).catch((e) => {
        message.error('No se puedo realizar el cambio')
      })

    })
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  render() {
    return <Modal
      title="Editar fecha de final"
      visible={this.props.visible
      }
      onOk={this.handleOk}
      onCancel={this.props.handleCancel}
    >
      <CollectionCreateForm
        wrappedComponentRef={this.saveFormRef}
        curso={this.props.curso}
        date={this.props.date}
        onCreate={this.handleOk}
      ></CollectionCreateForm>
    </Modal >
  }
}