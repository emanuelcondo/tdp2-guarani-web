import React, { Component } from 'react';
import { DatePicker, TimePicker, Select, Form } from 'antd';
import locate from 'antd/lib/date-picker/locale/es_ES'
import moment from 'moment';


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

const formatTime = "HH:mm";
const formatDate = "YYYY-MM-DD"

const CollectionCreateForm = Form.create()(
  class extends Component {

    getMoment = () => {
      return moment(this.props.date);
    }

    getDate = () => {
      const date = new Date(this.props.date)
      const dateStringToReturn = date.getUTCDate() + '/' + (date.getUTCMonth()) + '/' + date.getFullYear()
      return dateStringToReturn
    }

    getTime = () => {
      const date = new Date(this.props.date)
      const timeStringToReturn = `${date.getHours()}:${date.getMinutes()}`
      return timeStringToReturn
    }


    render() {
      const { visible, onCancel, onCreate, form, size } = this.props;
      const { getFieldDecorator } = form;
      const state = this.state;

      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };


      return <Form layout="vertical">
        <FormItem
          {...formItemLayout}
        >
          <h2 align="right">{this.props.asignatureSelected}</h2>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Curso">
          {getFieldDecorator('curso', {})(
            <div>
              Curso {this.props.curso}
            </div>
          )}
        </FormItem>


        <FormItem
          {...formItemLayout}
          label="Día">
          {getFieldDecorator('dia', {
            rules: [{ required: true, message: 'Por favor ingrese el día de examen' }],
            initialValue : this.getMoment()
          })(
            <DatePicker locale={locate} style={{ width: '50%' }} format={formatDate} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Horario">
          {getFieldDecorator('horario', {
            rules: [{ required: true, message: 'Por favor ingrese el horario del examen' }],
            initialValue : this.getMoment()
          })(
            <TimePicker format={formatTime} />
          )}
        </FormItem>
      </Form>

    }
  }
);


export default CollectionCreateForm;