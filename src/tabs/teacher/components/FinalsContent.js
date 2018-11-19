import React, { Component } from 'react';
import { Button, Row, DatePicker, TimePicker, Select, Form, message, Modal, Popover } from 'antd';
import MyFinals from './MyFinalsTable'
import locate from 'antd/lib/date-picker/locale/es_ES'
import * as TeacherService from '../service/TeacherService'
//import { loadavg } from 'os';
//import { stringify } from 'querystring';

const FormItem = Form.Item;
const Option = Select.Option;

const timeFormat = 'HH:mm';

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

const CollectionCreateForm = Form.create()(
  class extends React.Component {
   
    getOptions = () => {
      if (this.props.cursosPorMateria == null || this.props.cursosPorMateria[this.props.asignatureSelected._id] == null ) return;
      return this.props.cursosPorMateria[this.props.asignatureSelected._id].map(
        (course) => {
          console.log(course);
          return <Option key={course._id} value={course._id}>{course.comision}</Option>
        }
      )
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


      return (
        <Modal
          visible={visible}
          title="Alta de examen final"
          okText="Crear"
          cancelText="Cancelar"
          onCancel={onCancel}
          onOk={onCreate}
        >

          <Form layout="vertical">

            <FormItem
              {...formItemLayout}
            >
              <h2 align="right">{this.props.asignatureSelected.nombre}</h2>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Curso">
              {getFieldDecorator('curso', {
                rules: [{ required: true, message: 'Por favor selecciona un curso' }],
              })(
                <Select
                  placeholder='Seleccione un curso'
                  size={size}
                  style={{ width: '55%' }}
                >
                  {this.getOptions()}
                </Select>
              )}
            </FormItem>


            <FormItem
              {...formItemLayout}
              label="Día">
              {getFieldDecorator('dia', {
                rules: [{ required: true, message: 'Por favor ingrese el día de examen' }],
              })(
                <DatePicker locale={locate} style={{ width: '50%' }} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Horario">
              {getFieldDecorator('horario', {
                rules: [{ required: true, message: 'Por favor ingrese el horario del examen' }],
              })(
                <TimePicker format='h:mm' minuteStep={10} style={{ width: '100px' }} placeholder={'Hora'} />
              )}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);



const dataSource = []


export default class FinalsContent extends Component {
  state = {
    finalsToShow: [],
    asignatureSelected: {},
    buttonNewFinalDisabled: true,
    visible: false,
    sede: 'Paseo Colón',
    courses: [],
    
    materias: [],
    cursosPorMateria : null,    
    finalesPorMateria: null,
    finalesPorCurso: null
  }

  constructor(props) {
    super(props);
    this.refModal = React.createRef();
  }


  componentDidMount() {
    //if (this.state.asignatureSelected !== '') this.getTeacherCourse()
    this.getMateriasYFinales();
  }

  getMateriasYFinales() {
    TeacherService.getExamenesNew().then(
      (response) => {
        let materias = response.data.data.materias;
        let finalesPorMateria = {};
        let cursosPorMateria = {};
        let finalesPorCurso = {};
        materias.forEach( 
          (materia) => {
            cursosPorMateria[materia._id] = materia.cursos;
            finalesPorMateria[materia._id] = [];
            materia.cursos.forEach(
              (curso) => {
                curso.examenes.forEach(
                  (examen) => {
                    examen.docente = curso.docenteACargo.nombre + " " + curso.docenteACargo.apellido;
                    examen.curso = curso;
                  }
                )
                finalesPorMateria[materia._id] = finalesPorMateria[materia._id].concat(curso.examenes);
                finalesPorCurso[curso._id] = curso.examenes;
              }
            )
          }
        )
        this.setState({ materias : materias, finalesPorMateria : finalesPorMateria, finalesPorCurso : finalesPorCurso, cursosPorMateria : cursosPorMateria})
        this.setFinalsToShow(this.state.asignatureSelected._id);
      }
    )
  }

  getAsignaturesNamesOption = () => {
    if (this.state.materias.length <= 0) return;
    let result = this.state.materias.map( (materia) => {return <Option key={materia._id} value={materia._id}> {materia.nombre} </Option>} );
    return result;
  }


  setFinalsToShow = (materiaID) => {
    if (materiaID == null) return;
    let finalsToShow = this.state.finalesPorMateria[materiaID]
    let materia = this.state.materias.find( (mat) => { return mat._id == materiaID } );
    this.setState({ buttonNewFinalDisabled: false , finalsToShow: finalsToShow, asignatureSelected : materia })
  }

  showModal = () => {
    this.setState({ visible: true });
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('values', values);
      const dateToSend = new Date(values.dia._d)
      const hour = new Date(values.horario._d)
      dateToSend.setHours(hour.getHours())
      dateToSend.setMinutes(hour.getMinutes())
      dateToSend.setSeconds(0)
      console.log('date to send the server', dateToSend);
      TeacherService.createExam(values.curso, dateToSend).then((response) => {
        message.success('La fecha de examen fue creada')
        this.update();
      }).catch((e) => {
        message.error('La fecha no pudo ser ingresada: ' + e.response.data.error.message)
      })
      form.resetFields();
      this.setState({ visible: false });
    });
  }

  update = () => {
    this.getMateriasYFinales();
  }

  handleSedeChange = (sede) => {
    if (!('value' in this.props)) {
      this.setState({ sede });
    }
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }


  render() {
    return <div>
      <Row type="flex" justify="space-around" align="middle">
        <div style={{ margin: '25px' }}>
          <Select
            placeholder="Selecciona una materia"
            style={{ width: '300px' }}
            onSelect={ this.setFinalsToShow }
          >
            {this.getAsignaturesNamesOption()}
          </Select>

        </div>
      </Row>
      <Row type="flex" justify="end">
      </Row>
      <MyFinals
        data={this.state.finalsToShow}
        update={this.update}
      />
      <Row type="flex" justify="center">
        <Popover
          visible={this.state.buttonNewFinalDisabled}
          content='Seleccione una materia para poder agregar un examen de final'
        >
          <Button type='primary' size='large' onClick={this.showModal} disabled={this.state.buttonNewFinalDisabled} >
            Nueva fecha de examen
        </Button>
        </Popover>

        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          asignatureSelected={this.state.asignatureSelected}
          cursosPorMateria={this.state.cursosPorMateria}
          update={this.update}
        />
      </Row>
    </div>

  }

} 