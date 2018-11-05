import React, { Component } from 'react';
import { DatePicker, TimePicker, Select, Form } from 'antd';
import locate from 'antd/lib/date-picker/locale/es_ES'


const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

const CreatePeriodForm = Form.create()(
  class extends Component {

    render() {
      const { visible, onCancel, onCreate, form, size } = this.props;
      const { getFieldDecorator } = form;
      const state = this.state;

      return <Form layout="vertical">
        <FormItem
          {...formItemLayout}
        >
          <h2 align="right">{this.props.rowdata.cuatrimestre}° Cuatrimestre {this.props.rowdata.anio}</h2>
        </FormItem>

        <h3 align="center">Inscripción a cursos</h3>

        <FormItem
          {...formItemLayout}
          label="Desde">
          {getFieldDecorator('desde', {
            rules: [{ required: true, message: 'Por favor ingrese el día de inicio' }],
          })(
            <DatePicker locale={locate} style={{ width: '50%' }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Hasta">
          {getFieldDecorator('hasta', {
            rules: [{ required: true, message: 'Por favor ingrese el día de fin' }],
          })(
            <DatePicker locale={locate} style={{ width: '50%' }} />
          )}
        </FormItem>
        <h3 align="center">Desinscripción a cursos</h3>

        <FormItem
          {...formItemLayout}
          label="Desde">
          {getFieldDecorator('desde', {
            rules: [{ required: true, message: 'Por favor ingrese el día de inicio' }],
          })(
            <DatePicker locale={locate} style={{ width: '50%' }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Hasta">
          {getFieldDecorator('hasta', {
            rules: [{ required: true, message: 'Por favor ingrese el día de fin' }],
          })(
            <DatePicker locale={locate} style={{ width: '50%' }} />
          )}
        </FormItem>
        <h3 align="center">Cursada</h3>

        <FormItem
          {...formItemLayout}
          label="Desde">
          {getFieldDecorator('desde', {
            rules: [{ required: true, message: 'Por favor ingrese el día de inicio' }],
          })(
            <DatePicker locale={locate} style={{ width: '50%' }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Hasta">
          {getFieldDecorator('hasta', {
            rules: [{ required: true, message: 'Por favor ingrese el día de fin' }],
          })(
            <DatePicker locale={locate} style={{ width: '50%' }} />
          )}
        </FormItem>
        <h3 align="center">Consulta de Prioridad</h3>

        <FormItem
          {...formItemLayout}
          label="Desde">
          {getFieldDecorator('desde', {
            rules: [{ required: true, message: 'Por favor ingrese el día de inicio' }],
          })(
            <DatePicker locale={locate} style={{ width: '50%' }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Hasta">
          {getFieldDecorator('hasta', {
            rules: [{ required: true, message: 'Por favor ingrese el día de fin' }],
          })(
            <DatePicker locale={locate} style={{ width: '50%' }} />
          )}
        </FormItem>
      </Form>

    }
  }
);

export default CreatePeriodForm;
