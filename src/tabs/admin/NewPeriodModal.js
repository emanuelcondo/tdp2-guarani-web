import React, { Component } from 'react'
import { Modal, message } from 'antd';
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
    
    console.log('newfinalmodal handleOk');
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('values', values);

      const period = {
          cuatrimestre: values.cuatri,
          anio: values.anio,
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

      this.createPeriod(period);

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
      console.log('Period created');
      console.log('Period creation - response', response);
      //display success, hide modal and refresh list of periods
      message.success('Se ha creado el periodo');
      this.setState({
        visible: false,
      });

      this.props.handleCancel();
      
    }).catch((e) => {
      console.log('Period creation - failed');
      console.log('Period creation - error', e);
      console.log('Period creation - response', e.response);
      console.log('Error:', e.response.data.error.message);

      //display error
      message.error(e.response.data.error.message);
      
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
