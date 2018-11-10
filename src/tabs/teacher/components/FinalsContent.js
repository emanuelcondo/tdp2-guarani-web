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

    state = {
      courses: []
    }

    getTeacherCourse = () => {
      TeacherService.getAsignatures().then((response) => {
        const courses = response.data.data.cursos.map((course) => { return { 'comision': course.comision, 'id': course._id, "materia" : course.materia } });
        console.log('courses', courses);
        this.setState({ courses })
      })
    }

    getCourseOption = () => {
      return this.state.courses.filter((course) => course.materia.nombre === this.props.asignatureSelected).map((course) => <Option value={course.id} key={course.id}>{course.comision}</Option>)
    }

    componentDidMount() {
      this.getTeacherCourse();
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
              <h2 align="right">{this.props.asignatureSelected}</h2>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Curso">
              {getFieldDecorator('curso', {
                rules: [{ required: true, message: 'Por favor selecciona un curso la sede del examen' }],
              })(
                <Select
                  placeholder='Seleccione un curso'
                  size={size}
                  style={{ width: '55%' }}
                >
                  {this.getCourseOption()}
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
    asignatureSelected: '',
    buttonNewFinalDisabled: true,
    visible: false,
    sede: 'Paseo Colón',
    courses: []
  }


  componentDidMount() {
    if (this.state.asignatureSelected !== '') {
      this.getTeacherCourse()
    }
  }

  getDataSource = () => {
    console.log('Las fechas de examenes actuales son', this.state.finalsToShow);
    console.log('Obteniendo las fechas de finales...');
    console.log('Los cursos que se tiene son', this.state.courses);
    const coursesIds = this.state.courses.map((course) => {
      console.log('courseId', course.id);
      return course.id
    })

    const cursosfiltrados = coursesIds.filter((id, idx) => coursesIds.indexOf(id) === idx)
    console.log('cursos filtrados', cursosfiltrados);
    cursosfiltrados.map((courseId) => {
      console.log('Pidiendo los examenes del curso', courseId);
      return TeacherService.getExamenes(courseId).then((response) => {
        console.log('Los examenes del cursos son', response.data.data.examenes);
        console.log('Cantidad de examenes', response.data.data.examenes.length);
        const finals = response.data.data.examenes
        finals.forEach((final) => final.course = courseId)
        const finalsToShow = [...this.state.finalsToShow]
        const finalsToShowUpdated = response.data.data.examenes.length === 0 ? finalsToShow : finalsToShow.concat(finals);
        this.setState({ finalsToShow: finalsToShowUpdated }, () => {
          console.log('Los finales a mostrar son', this.state.finalsToShow);
        })
      })
    })
  }


  getTeacherCourse = () => {
    console.log('getTeacherCourse');
    TeacherService.getAsignatures().then((response) => {
      console.log('Materia elegida', this.state.asignatureSelected);
      console.log('Obteniendo los cursos del docente', response);
      const courses = response.data.data.cursos.filter((course) => course.materia.nombre === this.state.asignatureSelected).map((course) => { return { 'comision': course.comision, 'id': course._id} });
      console.log('course', response.data.data.cursos);
      console.log('courses', courses);
      this.setState({ courses }, () => {
        console.log('llamando..');
        this.getDataSource()
      })
    })
  }

  getAsignaturesNamesOption = () => {
    const nombreMaterias = localStorage.getItem('asignatureNames').split(',')
    console.log('nombreMaterias', nombreMaterias);
    return nombreMaterias.filter((value, idx) => nombreMaterias.indexOf(value) === idx).map((name, idx) => (<Option key={idx} value={name}> {name} </Option>))
  }


  setFinalsToShow = () => {
    this.setState({ buttonNewFinalDisabled: false })
    this.getTeacherCourse()
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
        this.setState({ finalsToShow: [] }, () => { this.getDataSource() })
      }).catch((e) => {
        message.error('La fecha no pudo ser ingresada: ' + e.response.data.error.message)
      })
      form.resetFields();
      this.setState({ visible: false });
    });
  }

  update = () => {
    this.setState({ finalsToShow: [] }, () => { this.getDataSource() })
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
            onSelect={(value) => {
              this.setState({ finalsToShow: [], asignatureSelected: value }, this.setFinalsToShow)
            }
            }
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
          update={this.update}
        />
      </Row>
    </div>

  }

} 