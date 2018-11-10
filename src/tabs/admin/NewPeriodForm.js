import React, { Component } from 'react';
import { DatePicker, Select, Form, Radio, Row, Col } from 'antd';
import locate from 'antd/lib/date-picker/locale/es_ES'


const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { RangePicker } = DatePicker;

const CreateNewPeriodForm = Form.create()(
  class extends Component {

    render() {
      const { visible, onCancel, onCreate, form, size } = this.props;
      const { getFieldDecorator } = form;
      const state = this.state;

      return <Form className="" layout="inline">
        <Row type="flex" justify="center" >
          <Col span={12}>
            <FormItem label="Año">
              {getFieldDecorator('anio', {initialValue: '2018'})(
                  <Select defaultValue={2018} style={{ width: 120 }}>
                    <Option value='2011'>2011</Option>
                    <Option value='2012'>2012</Option>
                    <Option value='2013'>2013</Option>
                    <Option value='2014'>2014</Option>
                    <Option value='2015'>2015</Option>
                    <Option value='2016'>2016</Option>
                    <Option value='2017'>2017</Option>
                    <Option value='2018'>2018</Option>
                    <Option value='2019'>2019</Option>
                    <Option value='2020'>2020</Option>
                  </Select>
              )}
              
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="Cuatrimestre">
              {getFieldDecorator('cuatri', {
                rules: [{ required: true, message: 'Ingrese el cuatrimestre' }],
              })(
                <RadioGroup defaultValue={1} size="large">
                  <RadioButton value={1}> 1° </RadioButton>
                  <RadioButton value={2}> 2° </RadioButton>
                  <RadioButton value={0}>Verano</RadioButton>
                </RadioGroup>
              )}
            </FormItem>

          </Col>

        </Row>
        <Row type="flex" justify="center" >
          <Col span={12}>
            <FormItem label="Inscripción a cursos">
              {getFieldDecorator('ins_cur', {
                rules: [{ required: true, message: 'Ingrese el período de inscripción' }],
              })(
                <RangePicker locale={locate} />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="Desinscripción a cursos">
              {getFieldDecorator('des_cur', {
                rules: [{ required: true, message: 'Ingrese el período de desinscripción' }],
              })(
                <RangePicker locale={locate} />
              )}
            </FormItem>
          </Col>

        </Row>

        <Row type="flex" justify="center" >
          <Col span={12}>
            <FormItem label="Consulta de Prioridad">
              {getFieldDecorator('con_pri', {
                rules: [{ required: true, message: 'Ingrese el período de Consulta de Prioridad' }],
              })(
                <RangePicker locale={locate} />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="Cursada">
              {getFieldDecorator('cursad', {
                rules: [{ required: true, message: 'Ingrese el período de cursada' }],
              })(
                <RangePicker locale={locate} />
              )}
            </FormItem>
          </Col>

        </Row>
      </Form>

    }
  }
);

export default CreateNewPeriodForm;
