import React, { Component } from 'react';
import { Input, Select, Form, Radio, Row, Col, Button, message } from 'antd';
import * as DepartmentService from '../service/DepartmentService'

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;

const SUCESS_COLOR = 'green'
const ERROR_COLOR = 'red'
const NORMAL_COLOR = 'blue'

const PROFESSOR = 1
const JTP = 2
const ASSISTANT = 3

export var CourseFormModeEnum =  Object.freeze({
  NEW : 0,
  EDIT : 1
});

const CreateNewCourseForm = Form.create()(
  class extends Component {
    state = {
      submitButtonLoading: false,
      submitButtonColor: NORMAL_COLOR,
      submitButtonMessage: 'Crear',
      lsubmitButtonIcon: 'none',
      errorMessageDisplay: 'none',
      docentesArray: [],
      jtpArray: [],
      ayudantesArray: []
    }

    handleSubmit = (e) => {
      this.setState({ submitButtonLoading: true })
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (err) {
          this.setState({ submitButtonLoading: false })
          //setTimeout(() => { this.loginUser(values) }, 2000)
        }
        else {
          values.docenteACargo = values.docenteACargo[0];
          values.jtp = values.jtp[0];
          if (values.ayudantes == undefined) values.ayudantes = [];
          values.cursada = [];
          DepartmentService.newCourse(values).then(
            (response) => {
              this.setState({ submitButtonLoading: false })
              message.success('Se ha creado el curso');
              this.props.updateCallback();
              this.closeAndResetFields();
            }).catch((e) => {
              this.setState({ submitButtonLoading: false })
              message.error("No se pudo crear el curso: "+e.response.data.error.message);        
            })
        }
      });
    }

    /**
     * Cierra el modal y vuelve los campos a los iniciales
     */
    closeAndResetFields() {
      this.props.onCancel();
      this.props.form.resetFields();
    }

    searchDocentes = (text, type) => {
      let key;
      if (type == PROFESSOR) key = 'docentesArray';
      else if (type == JTP) key = 'jtpArray';
      else if (type == ASSISTANT) key ='ayudantesArray';
      else return;
      let update = {};
      update[key] = [];
      let self = this;

      this.setState(update, () => {
        DepartmentService.searchProfessors(text)
          .then((response) => {
            let docentes = response.data.data.docentes;
            let _update = {};
            _update[key] = docentes.map((item) => ({
                text: item.apellido + ', ' + item.nombre,
                value: item._id
            }));
            console.log(_update);
            self.setState(_update);
          })
          .catch((e) => {
            console.log(e);
          });
      });
    }

    onChangeDocentes = (type) => {
      let key;
      if (type == PROFESSOR) key = 'docentesArray';
      else if (type == JTP) key = 'jtpArray';
      else if (type == ASSISTANT) key ='ayudantesArray';
      else return;
      let update = {};
      update[key] = [];
      this.setState(update);
    }

    onChangeProfessor = () => {
      this.onChangeDocentes(PROFESSOR);
    }

    onChangeJTP = () => {
      this.onChangeDocentes(JTP);
    }

    onChangeAssistant = () => {
      this.onChangeDocentes(ASSISTANT);
    }

    searchProfessor = (text) => {
      this.searchDocentes(text, PROFESSOR);
    }

    searchJTP = (text) => {
      this.searchDocentes(text, JTP);
    }

    searchAssistant = (text) => {
      this.searchDocentes(text, ASSISTANT);
    }

    render() {
      const { visible, onCancel, onCreate, form, size } = this.props;
      const { getFieldDecorator, getFieldValue } = form;
      const state = this.state;
      /*
      getFieldDecorator('ayudantes', { initialValue: [] });
      const ayudates = getFieldValue('ayudantes');
      const formAyudantesItems = ayudantes.map((item, index) => {

      });
      */

      return <Form onSubmit={this.handleSubmit} className="" layout="vertical">
        <Row gutter={30} type="flex" justify="center" >
          <Col span={12}>
            <FormItem label="Año">
              {getFieldDecorator('anio', {initialValue: '2018'})(
                  <Select style={{ width: 120 }}>
                    <Option value='2018'>2018</Option>
                    <Option value='2019'>2019</Option>
                    <Option value='2020'>2020</Option>
                  </Select>
              )}
              
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="Cuatrimestre">
              {getFieldDecorator('cuatrimestre', {
                rules: [{ required: true, message: 'Ingrese el cuatrimestre' }],
              })(
                <RadioGroup size="large">
                  <RadioButton value={0}>Verano</RadioButton>
                  <RadioButton value={1}> 1° </RadioButton>
                  <RadioButton value={2}> 2° </RadioButton>
                </RadioGroup>
              )}
            </FormItem>

          </Col>

        </Row>
        <Row gutter={30} type="flex" justify="center" >
          <Col span={12}>
            <FormItem label="Materia">
              {getFieldDecorator('materia', {
                rules: [{ required: true, message: 'Ingrese la materia' }],
              })(
                <Select>
                  {this.props.materias.map( 
                      (materia)=> {
                        return <Option value={materia._id}>{materia.codigo} - {materia.nombre}</Option>;
                      }
                    )
                  }
              </Select>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="Cupo">
              {getFieldDecorator('cupos', {
                rules: [{ required: true, message: 'Ingrese el cupo. Debe ser un entero > 0' }],
              })(
                <Input type="number" min="1"/>
              )}
            </FormItem>
          </Col>

        </Row>

        <Row gutter={30} type="flex" justify="center" >
          <Col span={12}>
            <FormItem label="Docente">
              {getFieldDecorator('docenteACargo', {
                rules: [{ required: true, message: 'Ingrese el docente'},
                {validator: (rule, value, callback) => {
                  let errors = [];
                  if (value != undefined && value.length > 1) {
                    errors.push(new Error("Solo puede haber un docente"));
                  }
                  callback(errors);                  
                }
                , message: 'Solo puede haber un docente'}],
              })(
                <Select mode="multiple"
                        filterOption={false}
                        notFoundContent={null}
                        onSearch={this.searchProfessor}>
                        { this.state.docentesArray.map(d => <Option key={d.value}>{d.text}</Option>)}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="JTP">
              {getFieldDecorator('jtp', {
                rules: [{ required: true, message: 'Ingrese el jefe de trabajos prácticos'},
                {validator: (rule, value, callback) => {
                  let errors = [];
                  if (value != undefined && value.length > 1) {
                    errors.push(new Error("Solo puede haber un jtp"));
                  }
                  callback(errors);                  
                }
                , message: 'Solo puede haber un jefe de trabajos practicos'}],
              })(
                <Select mode="multiple"
                        filterOption={false}
                        notFoundContent={null}
                        onSearch={this.searchJTP}>
                        { this.state.jtpArray.map(d => <Option key={d.value}>{d.text}</Option>)}
                </Select>
              )}
            </FormItem>
          </Col>

        </Row>

        <Row type="flex" justify="center" >
          <Col span={24}>
            <FormItem label="Ayudantes">
            {getFieldDecorator('ayudantes', {}) (
                <Select mode="multiple"
                        filterOption={false}
                        notFoundContent={null}
                        onSearch={this.searchAssistant}
                        //onChange={this.onChangeAssistant}
                        >
                        { this.state.ayudantesArray.map(d => <Option key={d.value}>{d.text}</Option>)}
                </Select>
            )}
            </FormItem>
          </Col>
        </Row>

        <Row gutter={16} type="flex" justify="end">
          <Button style={{ marginRight: 8 }} onClick={this.props.onCancel} >Cancelar</Button>
          <Button style={{ marginRight: 8 }}
                  type="primary"
                  htmlType="submit"
                  loading={this.state.submitButtonLoading}
                  >{this.props.buttonText}</Button>
          {/*
            <FormItem>
              <Button style={{ marginRight: 8 }} >Cancelar</Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={this.state.submitButtonLoading}
                  className="login-form-button"
                  style={{ backgroundColor: this.state.submitButtonColor }}
                  icon={this.state.submitButtonIcon}
                >Crear Curso</Button>
              </FormItem>
              */}
        </Row>

      </Form>

    }
  }
);

export default CreateNewCourseForm;
