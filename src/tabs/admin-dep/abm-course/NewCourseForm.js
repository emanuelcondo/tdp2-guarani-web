import React, { Component } from 'react';
import { Input, Select, Form, Radio, Row, Col, Button, Icon, TimePicker, message, Tooltip } from 'antd';
import * as DepartmentService from '../service/DepartmentService'
import moment from 'moment';

export var CourseFormModeEnum =  Object.freeze({
  NEW : 0,
  EDIT : 1,
  VIEW: 2
})

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
    if (changedFields.hasOwnProperty('aula')) data['aula'] = changedFields.aula.value;
    if (changedFields.hasOwnProperty('sede')) data['sede'] = changedFields.sede.value;
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
      sede: Form.createFormField({
        value: props.cursada.sede
      }),
      aula: Form.createFormField({
        value: props.cursada.aula
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
    <Row gutter={30} type="flex" justify="center" key={props.key}>
      <Col span={4}>
        <FormItem label="Día">
          {getFieldDecorator(`dia`, {
            rules: [{
              required: true,
              message: "Día"
            }],
          })(
            <Select placeholder="Día" disabled={props.readOnly}>
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

      <Col span={4}>
        <FormItem label="Tipo">
          {getFieldDecorator(`tipo`, {
            rules: [{
              required: true,
              whitespace: true,
              message: "Tipo",
            }],
          })(
            <Select placeholder="Tipo" disabled={props.readOnly}>
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

      <Col span={4}>
        <FormItem label="Sede">
          {getFieldDecorator(`sede`, {
            rules: [{
              message: "Sede",
            }],
          })(
            <Select placeholder="Sede" disabled={props.readOnly}>
                <Option value='PC'>PC</Option>
                <Option value='LH'>LH</Option>
                <Option value='CU'>CU</Option>
            </Select>
          )}
        </FormItem>
      </Col>

      <Col span={4}>
        <FormItem label="Aula">
          {getFieldDecorator(`aula`, {
            rules: [{
              message: "Aula",
            }],
          })(
            <Input disabled={props.readOnly} type="number"/>
          )}
        </FormItem>
      </Col>

      <Col span={4}>
        <FormItem label="Horario Desde">
          {getFieldDecorator(`horario_desde`, {
            rules: [{
              required: true,
              whitespace: true,
              message: "Tipo",
            }],
          })(
            <TimePicker disabled={props.readOnly} minuteStep={15} placeholder="9:15" format={formatTime}/>
          )}
        </FormItem>
      </Col>
      <Col span={4}>
        <FormItem label="Horario Hasta">
          {getFieldDecorator(`horario_hasta`, {
            rules: [{
              required: true,
              whitespace: true,
              message: "Tipo",
            }],
          })(
            <TimePicker disabled={props.readOnly} minuteStep={15} placeholder="Horario Hasta" format={formatTime}/>
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
      ayudantesArray: [],
      readOnly: false
    }

    handleSubmit = (e) => {
      if (this.state.readOnly) {
        this.props.onCancel();
        return;
      }

      this.setState({ submitButtonLoading: true })
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (err) {
          this.setState({ submitButtonLoading: false })
          //setTimeout(() => { this.loginUser(values) }, 2000)
        }
        else {
          console.log("Course Values to Send", values)
          values.docenteACargo = values.docenteACargo[0];
          values.jtp = values.jtp[0];
          if (values.ayudantes == null) values.ayudantes = [];
          values.cursada = [];
          if (this.state.cursada != null) {
            this.arreglarNullsCursada(this.state.cursada);
            values.cursada = this.state.cursada;
          } 
          let APICall = DepartmentService.newCourse;
          let messageWord = "cre";
          if (this.props.mode == CourseFormModeEnum.EDIT) {
            values.curso = this.props.selectedRow._id;
            APICall = DepartmentService.editCourse;
            messageWord = "edit";
          }
          APICall(values).then(
            (response) => {
              this.setState({ submitButtonLoading: false })
              message.success(`Se ha ${messageWord}ado el curso`);
              this.props.updateCallback();
              this.closeAndResetFields();
            }).catch((e) => {
              this.setState({ submitButtonLoading: false })
              message.error(`No se pudo ${messageWord}ar el curso: `+e.response.data.error.message);        
            })
        }
      });
    }

    arreglarNullsCursada(cursada) {
      cursada.forEach( 
        (elem) => {
          if (elem.sede == null)    
          delete elem.sede;
      });
      this.setState({cursada : cursada});
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

    onChangeCursada = (changes, index) => {
      const { form } = this.props;
      let cursada = form.getFieldValue('cursada');
      let item = cursada[index];
      if (changes.hasOwnProperty('dia')) item.dia = changes.dia;
      if (changes.hasOwnProperty('tipo')) item.tipo = changes.tipo;
      if (changes.hasOwnProperty('aula')) item.aula = changes.aula;
      if (changes.hasOwnProperty('sede')) item.sede = changes.sede;
      if (changes.hasOwnProperty('horario_desde')) item.horario_desde = changes.horario_desde;
      if (changes.hasOwnProperty('horario_hasta')) item.horario_hasta = changes.horario_hasta;
      cursada[index] = item;
      this.setState({ cursada : cursada });
      console.log(changes);
    }

    addCursadaItem = (event = null, dia = '', desde = '09:00', hasta = '11:00', tipo = '', sede = '', aula = '') => {
      const { form } = this.props;
      const cursada = form.getFieldValue('cursada');
      const updateCursada = cursada.concat({
        'dia': dia,
        'horario_desde': desde,
        'horario_hasta': hasta,
        'tipo': tipo,
        'sede': sede,
        'aula': aula,
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
        const data = { cursada: item, index: index, key: index, readOnly: this.state.readOnly };
        return <Row type="flex">
            <Col span={this.state.readOnly ? 24 : 23}>
              <CursadaForm {...data} onChange={this.onChangeCursada}/>
            </Col>
            { !this.state.readOnly && 
            <Col span={1}>
              <Tooltip placement="right" title="Eliminar">
              <Icon style={{marginTop:35}}
                    className="dynamic-delete-button"
                    type="minus-circle-o"
                    onClick={() => this.removeCursadaItem(index)} />
                    </Tooltip>
            </Col>
            }
          </Row>
      });

      return formItems;
    }

    initialDocente() {
      if (this.props.selectedRow.docenteACargo != null) {
        return [this.props.selectedRow.docenteACargo._id]
      }
      else return []
    }

    initialJTP() {
      if (this.props.selectedRow.jtp != null) {
        return [this.props.selectedRow.jtp._id]
      }
      else return []
    }

    componentDidMount(){
      const { form } = this.props;
      console.log("Course Row: ", this.props.selectedRow)
      let docentesMapped = this.props.docentes.map((item) => {
        return { value: item._id, text: item.apellido+', '+item.nombre }
      });
      this.setState({ 
        docentesArray: docentesMapped,
        jtpArray: docentesMapped,
        ayudantesArray: docentesMapped,
        readOnly: (this.props.mode == CourseFormModeEnum.VIEW)
       });
      form.setFieldsValue({
          cupos : this.props.selectedRow.cupos,
          cuatrimestre : this.props.selectedRow.cuatrimestre,
          anio : this.props.selectedRow.anio,
          materia : this.props.selectedRow.materia._id,
          jtp: this.initialJTP(),
          docenteACargo: this.initialDocente(),
          ayudantes: this.props.selectedRow.ayudantes.map(ayudante => ayudante._id)
      });
      if (this.props.selectedRow.cursada != null) {
        this.setState({ cursada : this.props.selectedRow.cursada });
        this.props.selectedRow.cursada.forEach( 
          (cursada) => {
            this.addCursadaItem(null, cursada.dia, cursada.horario_desde, cursada.horario_hasta, cursada.tipo, cursada.sede, cursada.aula);
          }
        )        
      }
    }


    render() {
      const { visible, onCancel, onCreate, form, size } = this.props;
      const { getFieldDecorator, getFieldValue } = form;
      const state = this.state;

      const formCursadaItems = this.renderCursadaItems();

      return <Form onSubmit={this.handleSubmit} className="" layout="vertical">
        <Row gutter={30} type="flex" justify="center" >
          <Col span={3}>
            <FormItem label="Año">
              {getFieldDecorator('anio')(
                  <Select style={{ width: 120 }} disabled={this.state.readOnly}>
                    <Option value='2018'>2018</Option>
                    <Option value='2019'>2019</Option>
                    <Option value='2020'>2020</Option>
                  </Select>
              )}
              
            </FormItem>
          </Col>
          <Col span={4}>
            <FormItem label="Cuatrimestre">
              {getFieldDecorator('cuatrimestre',  {
                rules: [{ required: true, message: 'Ingrese el cuatrimestre' }],
              })(
                <RadioGroup disabled={this.state.readOnly}>
                  <RadioButton value={0}>Verano</RadioButton>
                  <RadioButton value={1}> 1° </RadioButton>
                  <RadioButton value={2}> 2° </RadioButton>
                </RadioGroup>
              )}
            </FormItem>

          </Col>

          <Col span={5}>
            <FormItem label="Cupo">
              {getFieldDecorator('cupos', {
                rules: [{ required: true, message: 'Ingrese el cupo. Debe ser un entero > 0' }],
              })(
                <Input disabled={this.state.readOnly} type="number" min="1"/>
              )}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem label="Materia">
              {getFieldDecorator('materia', {
                rules: [{ required: true, message: 'Ingrese la materia' }],
              })(
                <Select disabled={this.state.readOnly}>
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
          

        </Row>

        <Row gutter={30} type="flex" justify="center" >
          <Col span={6}>
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
                        disabled={this.state.readOnly}
                        filterOption={false}
                        notFoundContent={null}
                        onSearch={this.searchProfessor}>
                        { this.state.docentesArray.map(d => <Option key={d.value}>{d.text}</Option>)}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={6}>
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
                        disabled={this.state.readOnly}
                        filterOption={false}
                        notFoundContent={null}
                        onSearch={this.searchJTP}>
                        { this.state.jtpArray.map(d => <Option key={d.value}>{d.text}</Option>)}
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem label="Ayudantes">
            {getFieldDecorator('ayudantes') (
                <Select mode="multiple"
                        disabled={this.state.readOnly}
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

        <Row gutter={30} type="flex" justify="center" >
          <Col span={24}>
                <Button disabled={this.state.readOnly} style={{ marginBottom: 10 }} type="primary" onClick={this.addCursadaItem}>Agregar Cursada</Button>
                {formCursadaItems}
          </Col>
        </Row>

        <Row gutter={16} type="flex" justify="end">
          <Button style={{ marginRight: 8 }} onClick={this.props.onCancel} >{this.state.readOnly ? 'Cerrar' : 'Cancelar'}</Button>
          { !this.state.readOnly &&
          <Button style={{ marginRight: 8 }}
                  type="primary"
                  htmlType="submit"
                  loading={this.state.submitButtonLoading}
                  >{this.props.buttonText}</Button>
          }
        </Row>

      </Form>

    }
  }
);

export default CreateNewCourseForm;
