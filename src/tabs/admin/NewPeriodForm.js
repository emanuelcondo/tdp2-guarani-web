import React, { Component } from 'react';
import { DatePicker, Select, Form, Radio, Row, Col } from 'antd';
import locate from 'antd/lib/date-picker/locale/es_ES'


const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { RangePicker } = DatePicker;

const formItemLayout = {
  labelCol: {
    xs: { span: 8, offset: 10 },
    sm: { span: 6, offset: 0 },
  },
  wrapperCol: {
    xs: { span: 4, offset: 0 },
    sm: { span: 6, offset: 0 },
  },
};

const CreateNewPeriodForm = Form.create()(
  class extends Component {

    render() {
      const { visible, onCancel, onCreate, form, size } = this.props;
      const { getFieldDecorator } = form;
      const state = this.state;

      return <Form className="" layout="inline">
        <Row type="flex" justify="center" >
          <Col span={12} xs="2">
            <FormItem
              label="Año"
            >
              <div>
                <Select defaultValue='2018' style={{ width: 120 }}>
                  <Option value='2016'>2016</Option>
                  <Option value='2017'>2017</Option>
                  <Option value='2018'>2018</Option>
                  <Option value='2019'>2019</Option>
                  <Option value='2020'>2020</Option>
                </Select>
              </div>
            </FormItem>
          </Col>
          <Col span={12} xs="2">
            <FormItem
              label="Cuatrimestre"
            >
              <div>
                <RadioGroup defaultValue="1" size="large">
                  <RadioButton value="1"> 1° </RadioButton>
                  <RadioButton value="2"> 2° </RadioButton>
                  <RadioButton value="0">Verano</RadioButton>
                </RadioGroup>
              </div>
            </FormItem>

          </Col>

        </Row>
        <Row type="flex" justify="center" >
          <Col span={12} xs="2">
            <FormItem
              label="Inscripción a cursos"
            >
              {getFieldDecorator('r1', {
                rules: [{ required: true, message: 'Ingrese el período de inscripción' }],
              })(
                <RangePicker locale={locate} />
              )}
            </FormItem>
          </Col>
          <Col span={12} xs="2">
            <FormItem
              label="Desinscripción a cursos">
              {getFieldDecorator('r2', {
                rules: [{ required: true, message: 'Ingrese el período de desinscripción' }],
              })(
                <RangePicker locale={locate} />
              )}
            </FormItem>
          </Col>

        </Row>



        <Row type="flex" justify="center" >
          <Col span={12} xs="2">
            <FormItem
              label="Consulta de Prioridad">
              {getFieldDecorator('r4', {
                rules: [{ required: true, message: 'Ingrese el período de Consulta de Prioridad' }],
              })(
                <RangePicker locale={locate} />
              )}
            </FormItem>
          </Col>
          <Col span={12} xs="2">
            <FormItem
              label="Cursada">
              {getFieldDecorator('r3', {
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
