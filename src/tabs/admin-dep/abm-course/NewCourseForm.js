import React, { Component } from 'react';
import { Input, Select, Form, Radio, Row, Col } from 'antd';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;

const CreateNewCourseForm = Form.create()(
  class extends Component {

    render() {
      const { visible, onCancel, onCreate, form, size } = this.props;
      const { getFieldDecorator } = form;
      const state = this.state;

      return <Form className="" layout="vertical">
        <Row type="flex" justify="center" >
          <Col span={12}>
            <FormItem label="Año">
              {getFieldDecorator('anio', {initialValue: '2018'})(
                  <Select style={{ width: 120 }}>
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
                <RadioGroup size="large">
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
            <FormItem label="Materia">
              {getFieldDecorator('materia', {
                rules: [{ required: true, message: 'Ingrese la materia' }],
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="Cupo">
              {getFieldDecorator('cupo', {
                rules: [{ required: true, message: 'Ingrese el cupo' }],
              })(
                <Input />
              )}
            </FormItem>
          </Col>

        </Row>

        <Row type="flex" justify="center" >
          <Col span={12}>
            <FormItem label="Docente">
              {getFieldDecorator('docente', {
                rules: [{ required: true, message: 'Ingrese el Docente' }],
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="JTP">
              {getFieldDecorator('jtp', {
                rules: [{ required: true, message: 'Ingrese el jefe de trabajos prácticos' }],
              })(
                <Input/>
              )}
            </FormItem>
          </Col>

        </Row>

        <Row type="flex" justify="center" >
          <Col span={24}>
            <FormItem label="Ayudantes">
                <Input/>
            </FormItem>
          </Col>
        </Row>

      </Form>

    }
  }
);

export default CreateNewCourseForm;
