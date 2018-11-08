import React, { Component } from 'react'
import { Modal } from 'antd';
import CreateNewPeriodForm from './NewPeriodForm'


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
    console.log('editfinalmodal handleOk');
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('values', values);
      
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
