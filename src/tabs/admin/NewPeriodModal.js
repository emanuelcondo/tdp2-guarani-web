import React, { Component } from 'react'
import { Modal, message } from 'antd';
import CreateNewPeriodForm from './NewPeriodForm'
import * as AdminService from './service/AdminService'

function RedondearHoras(date, start) {
  const dateToSend = new Date(date._d);
  dateToSend.setHours(start);
  dateToSend.setMinutes(0);
  dateToSend.setSeconds(0);
  dateToSend.setMilliseconds(0);
    
  return dateToSend;
}

function Desde(date) {
  //arranca a las 9:00a.m.
  return RedondearHoras(date, 9);
}

function Hasta(date) {
  //finaliza a las 6:00p.m.
  return RedondearHoras(date, 18);
}

class NewPeriodModal extends Component {

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
              inicio: Desde(values.ins_cur[0]),
              fin: Hasta(values.ins_cur[1])
          },
          desinscripcionCurso: {
            inicio: Desde(values.des_cur[0]),
            fin: Hasta(values.des_cur[1])
          },
          cursada: {
            inicio: Desde(values.cursad[0]),
            fin: Hasta(values.cursad[1])
          },
          consultaPrioridad: {
            inicio: Desde(values.con_pri[0]),
            fin: Hasta(values.con_pri[1])
          }
      }

      this.createPeriod(period);

    })

  }

  createPeriod = (periodInfo) => {
    AdminService.createPeriod(periodInfo).then((response) => {
      console.log('Period created');
      console.log('Period creation - response', response);
      //display success, hide modal and refresh list of periods
      message.success('Se ha creado el periodo');

      this.props.handleOk();
      
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
      ></CreateNewPeriodForm>
    </Modal >
  }
}

export default NewPeriodModal;
