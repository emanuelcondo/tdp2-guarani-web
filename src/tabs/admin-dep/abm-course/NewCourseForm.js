import React, { Component } from 'react';
import { Input, Select, Form, Radio, Row, Col, Button, Icon, TimePicker } from 'antd';
import * as DepartmentService from '../service/DepartmentService'
import moment from 'moment';

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

const formatTime = "HH:mm";

const CursadaForm = Form.create({
  onFieldsChange(props, changedFields) {
    let data = {};
    if (changedFields.hasOwnProperty('dia')) data['dia'] = changedFields.dia.value;
    if (changedFields.hasOwnProperty('tipo')) data['tipo'] = changedFields.tipo.value;
    if (changedFields.hasOwnProperty('horario_desde')) data['horario_desde'] = ( changedFields.horario_desde.value ? changedFields.horario_desde.value.format('HH:mm') : '');
    if (changedFields.hasOwnProperty('horario_hasta')) data['horario_hasta'] = (changedFields.horario_hasta.value ? changedFields.horario_hasta.value.format('HH:mm') : '');

    props.onChange(data, props.index);
  },
  mapPropsToFields(props) {
    return {
      dia: Form.createFormField({
        value: props.cursada.dia
      }),
      tipo: Form.createFormField({
        value: props.cursada.tipo
      }),
      horario_desde: Form.createFormField({
        value: props.cursada.horario_desde ? moment(props.cursada.horario_desde, 'HH:mm') : moment('09:00','HH:mm')
      }),
      horario_hasta: Form.createFormField({
        value: props.cursada.horario_hasta ? moment(props.cursada.horario_hasta, 'HH:mm') : moment('09:00','HH:mm')
      })
    };
  },
  onValuesChange(_, values) {
    console.log(values);
  },
})((props) => {
  const { getFieldDecorator } = props.form;
  return (
    <Row gutter={16} type="flex" justify="center" key={props.key}>
      <Col span={6}>
        <FormItem>
          {getFieldDecorator(`dia`, {
            rules: [{
              required: true,
              whitespace: true,
              message: "Día",
            }],
          })(
            <Select placeholder="Día">
                <Option value='Lunes'>Lunes</Option>
                <Option value='Martes'>Martes</Option>
                <Option value='Miércoles'>Miércoles</Option>
                <Option value='Jueves'>Jueves</Option>
                <Option value='Viernes'>Viernes</Option>
                <Option value='Sábado'>Sábado</Option>
            </Select>
          )}
        </FormItem>
      </Col>

      <Col span={6}>
        <FormItem>
          {getFieldDecorator(`tipo`, {
            rules: [{
              required: true,
              whitespace: true,
              message: "Tipo",
            }],
          })(
            <Select placeholder="Tipo">
                <Option value='Teórica'>Teórica</Option>
                <Option value='Teórica Obligatoria'>Teórica Obligatoria</Option>
                <Option value='Práctica'>Práctica</Option>
                <Option value='Práctica Obligatoria'>Práctica Obligatoria</Option>
                <Option value='Teórica Práctica'>Teórica Práctica</Option>
                <Option value='Teórica Práctica Obligatoria'>Teórica Práctica Obligatoria</Option>
                <Option value='Desarrollo y Consultas'>Desarrollo y Consultas</Option>
            </Select>
          )}
        </FormItem>
      </Col>
      <Col span={6}>
        <FormItem>
          {getFieldDecorator(`horario_desde`, {
            rules: [{
              required: true,
              whitespace: true,
              message: "Tipo",
            }],
          })(
            <TimePicker placeholder="Horario Desde" format={formatTime}/>
          )}
        </FormItem>
      </Col>
      <Col span={6}>
        <FormItem>
          {getFieldDecorator(`horario_hasta`, {
            rules: [{
              required: true,
              whitespace: true,
              message: "Tipo",
            }],
          })(
            <TimePicker placeholder="Horario Hasta" format={formatTime}/>
          )}
        </FormItem>
      </Col>
    </Row>
  );
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
        if (!err) {
          //setTimeout(() => { this.loginUser(values) }, 2000)
        }
        console.log(values);
      });
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

    onChangeCursada = (changes, index) => {
      const { form } = this.props;
      let cursada = form.getFieldValue('cursada');
      let item = cursada[index];
      if (changes.hasOwnProperty('dia')) item.dia = changes.dia;
      if (changes.hasOwnProperty('tipo')) item.tipo = changes.tipo;
      if (changes.hasOwnProperty('horario_desde')) item.horario_desde = changes.horario_desde;
      if (changes.hasOwnProperty('horario_hasta')) item.horario_hasta = changes.horario_hasta;
      cursada[index] = item;
      this.setState(cursada);
      console.log(changes);
    }

    addCursadaItem = () => {
      const { form } = this.props;
      const cursada = form.getFieldValue('cursada');
      const updateCursada = cursada.concat({
        'dia': '',
        'horario_desde': '09:00',
        'horario_hasta': '09:00',
        'tipo': ''
      });
      form.setFieldsValue({
        cursada: updateCursada
      });
    }

    removeCursadaItem = (index) => {
      const { form } = this.props;
      const cursada = form.getFieldValue('cursada');
      form.setFieldsValue({
        cursada: cursada.filter((value, i) => i !== index),
      });
    }

    renderCursadaItems = () => {
      const { form } = this.props;
      const { getFieldDecorator, getFieldValue } = form;
      getFieldDecorator('cursada', { initialValue: [] });
      const cursada = getFieldValue('cursada');

      const formItems = cursada.map((item, index) => {
        const data = { cursada: item, index: index, key: index };
        return <Row type="flex">
            <Col span={23}>
              <CursadaForm {...data} onChange={this.onChangeCursada}/>
            </Col>
            <Col span={1}>
              <Icon
                    className="dynamic-delete-button"
                    type="minus-circle-o"
                    onClick={() => this.removeCursadaItem(index)} />
            </Col>
          </Row>
      });

      return formItems;
    }

    render() {
      const { visible, onCancel, onCreate, form, size } = this.props;
      const { getFieldDecorator, getFieldValue } = form;
      const state = this.state;

      const formCursadaItems = this.renderCursadaItems();

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
              {getFieldDecorator('cuatri', {
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
                  <Option value='5ba6cf168b7931ac3e21de27'>Alritmos y Programación I</Option>
                  <Option value='5ba705601dabf8854f11ddfd'>Alritmos y Programación II</Option>
                  <Option value='5ba706661dabf8854f11de22'>Alritmos y Programación III</Option>
              </Select>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="Cupo">
              {getFieldDecorator('cupo', {
                rules: [{ required: true, message: 'Ingrese el cupo' }],
              })(
                <Input/>
              )}
            </FormItem>
          </Col>

        </Row>

        <Row gutter={30} type="flex" justify="center" >
          <Col span={12}>
            <FormItem label="Docente">
              {getFieldDecorator('docente', {
                rules: [{ required: true, message: 'Ingrese el Docente' }],
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
                rules: [{ required: true, message: 'Ingrese el jefe de trabajos prácticos' }],
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
              <Select mode="multiple"
                      filterOption={false}
                      notFoundContent={null}
                      onSearch={this.searchAssistant}
                      onChange={this.onChangeAssistant}>
                      { this.state.ayudantesArray.map(d => <Option key={d.value}>{d.text}</Option>)}
              </Select>
            </FormItem>
          </Col>
        </Row>

        <Row gutter={30} type="flex" justify="center" >
          <Col span={24}>
                <Button style={{ marginBottom: 10 }} type="primary" onClick={this.addCursadaItem}>Agregar Cursada</Button>
                {formCursadaItems}
          </Col>
        </Row>

        <Row gutter={16} type="flex" justify="end">
          <Button style={{ marginRight: 8 }} >Cancelar</Button>
          <Button style={{ marginRight: 8 }}
                  type="primary"
                  htmlType="submit">Crear Curso</Button>
        </Row>

      </Form>

    }
  }
);

export default CreateNewCourseForm;
