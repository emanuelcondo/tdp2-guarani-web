import React, { Component } from 'react'
import { Modal, message } from 'antd';
import CreateEditPeriodForm from './PeriodForm'
import * as AdminService from './service/AdminService'


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
    
    console.log('edit_period_modal handleOk');
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('values', values);

      const period = {
          _id: this.formRef.props.rowdata._id,
          cuatrimestre: this.formRef.props.rowdata.cuatrimestre,
          anio: this.formRef.props.rowdata.anio,
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

      this.updatePeriod(period);

    })

  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  updatePeriod = (periodInfo) => {
    AdminService.updatePeriod(periodInfo).then((response) => {
      console.log('Period updated');
      console.log('Period update - response', response);
      //display success, hide modal and refresh list of periods
      message.success('Se ha actualizado el periodo');

      this.props.handleOk();
      
    }).catch((e) => {
      console.log('Period update - failed');
      console.log('Period update - error', e);
      console.log('Period update - response', e.response);
      console.log('Error:', e.response.data.error.message);

      //display error
      message.error(e.response.data.error.message);
      
    })
  }



  render() {
    return <Modal
      title="Editar período"
      visible={this.props.visible}
      onOk={this.handleOk}
      width={1000}
      okText='Grabar'
      onCancel={this.props.handleCancel}
      cancelText='Cancelar'
    >
      <CreateEditPeriodForm
        wrappedComponentRef={this.saveFormRef}
        rowdata={this.props.dataSource[this.props.index]}
      >
      </CreateEditPeriodForm>
    </Modal >
  }
}

export default EditPeriodModal;
