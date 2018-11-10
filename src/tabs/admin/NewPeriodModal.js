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
    
    console.log('new_period_modal handleOk');
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
              inicio: values.ins_cur[0]._d,
              fin: values.ins_cur[1]._d
          },
          desinscripcionCurso: {
            inicio: values.des_cur[0]._d,
            fin: values.des_cur[1]._d
          },
          cursada: {
            inicio: values.cursad[0]._d,
            fin: values.cursad[1]._d
          },
          consultaPrioridad: {
            inicio: values.con_pri[0]._d,
            fin: values.con_pri[1]._d
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

      this.props.handleRefresh().then((this) => {this.props.handleCancel()})
      //this.props.handleCancel();
      
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
