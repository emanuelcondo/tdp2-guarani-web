import React, { Component } from 'react';
import { DatePicker, TimePicker, Select, Form, Radio, Input } from 'antd';
import locate from 'antd/lib/date-picker/locale/es_ES'


const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { MonthPicker, RangePicker} = DatePicker;

const formItemLayout = {
  labelCol: {
    xs: { span: 54, offset: 0 },
    sm: { span: 5, offset: 0  },
  },
  wrapperCol: {
    xs: { span: 34, offset: 30  },
    sm: { span: 12, offset: 30  },
  },
};

const CreateNewPeriodForm = Form.create()(
  class extends Component {

    render() {
      const { visible, onCancel, onCreate, form, size } = this.props;
      const { getFieldDecorator } = form;
      const state = this.state;

      return <Form layout="vertical">
        <FormItem
          {...formItemLayout}
          label="Cuatrimestre"
        >
          <div>
              <RadioGroup defaultValue="1">
                <RadioButton value="1"> 1° </RadioButton>
                <RadioButton value="2"> 2° </RadioButton>
                <RadioButton value="0">Verano</RadioButton>
              </RadioGroup>
          </div>
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Año"
        >
          <div>
              <Select defaultValue='2018' style={{width: 120}}>
                <Option value='2016'>2016</Option>
                <Option value='2017'>2017</Option>
                <Option value='2018'>2018</Option>
                <Option value='2019'>2019</Option>
                <Option value='2020'>2020</Option>
              </Select>
          </div>
        </FormItem>

        <h3 align="center">Inscripción a cursos</h3>

        <FormItem
          {...formItemLayout}
          label="Rango"
        >
          {getFieldDecorator('r1', {
            rules: [{ required: true, message: 'Ingrese el período de inscripción' }],
          })(
            <RangePicker locale={locate}  />
          )}
        </FormItem>
        
        <h3 align="center">Desinscripción a cursos</h3>

        <FormItem
          {...formItemLayout}
          label="Rango">
          {getFieldDecorator('r2', {
            rules: [{ required: true, message: 'Ingrese el período de desinscripción' }],
          })(
            <RangePicker locale={locate}   />
          )}
        </FormItem>
        
        <h3 align="center">Cursada</h3>

        <FormItem
          {...formItemLayout}
          label="Rango">
          {getFieldDecorator('r3', {
            rules: [{ required: true, message: 'Ingrese el período de cursada' }],
          })(
            <RangePicker locale={locate}  />
          )}
        </FormItem>
        
        <h3 align="center">Consulta de Prioridad</h3>

        <FormItem
          {...formItemLayout}
          label="Rango">
          {getFieldDecorator('r4', {
            rules: [{ required: true, message: 'Ingrese el período de Consulta de Prioridad' }],
          })(
            <RangePicker locale={locate}  />
          )}
        </FormItem>
        
      </Form>

    }
  }
);

export default CreateNewPeriodForm;
