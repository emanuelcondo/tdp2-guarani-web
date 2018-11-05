import React, { Component } from 'react'
import { Modal } from 'antd';
import CreatePeriodForm from './PeriodForm'


class EditPeriodModal extends Component {

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
      
      /*
      const dateToSend = new Date(values.dia._d)
      const hour = new Date(values.horario._d)
      dateToSend.setHours(hour.getHours())
      dateToSend.setMinutes(hour.getMinutes())
      dateToSend.setSeconds(0)
      console.log('date to send the server', dateToSend);
      */

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
      title="Editar período"
      visible={this.props.visible
      }
      onOk={this.handleOk}
      okText='Grabar'
      onCancel={this.props.handleCancel}
      cancelText='Cancelar'
    >
      <CreatePeriodForm
        wrappedComponentRef={this.saveFormRef}
        rowdata={this.props.rowdata}
        onCreate={this.handleOk}
      ></CreatePeriodForm>
    </Modal >
  }
}

export default EditPeriodModal;
