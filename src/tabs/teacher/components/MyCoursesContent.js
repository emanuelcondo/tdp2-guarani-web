import React, { Component } from 'react';
import { Row, Select } from 'antd'
import MyCourses from './MyCoursesTable'
import * as TeacherService from '../service/TeacherService'

const Option = Select.Option;


export default class MyCoursesContent extends Component {

  state = {
    nombreMaterias: [],
    allCourses: [],
    courseToShow: [],
    disableConditionalStudentButton: true,
    conditionalModal: false,
    conditionalStudents: [],
    asignatureSelected: ''

  }


  getAsignaturesNamesOption = () => {
    return this.state.nombreMaterias.filter((value, idx) => this.state.nombreMaterias.indexOf(value) === idx).map((name, idx) => (<Option key={idx} value={name}> {name} </Option>))
  }

  getAsignatureNames = () => {
    console.log('TeacherContainer - getAsignaturesName');
    return TeacherService.getAsignatures().then((response) => {
      const asignatureNames = response.data.data.cursos.map((course) => course.materia.nombre);
      this.setState({ nombreMaterias: asignatureNames })
      console.log('TeacherContainer - courses', response.data.data.cursos);
      response.data.data.cursos.forEach(course => {
        TeacherService.getMoreInformationFromCourseById(course._id).then((response) => {
          console.log('response,obtener infor curso', response.data.data);

          course['regulares'] = response.data.data.regulares
          course['condicionales'] = response.data.data.condicionales
          this.setState({ conditionalStudents: response.data.data.condicionales })
        })
      });
      console.log('TeacherContainers - allCursos', response.data.data.cursos[0]);
      this.setState({ allCourses: response.data.data.cursos }, this.setCoursesToShow)
    })
  }

  setCoursesToShow = () => {
    console.log('MyCoursesContent - setCoursesToShow');
    const courseToShow = this.state.allCourses.filter((course) => course.materia.nombre === this.state.asignatureSelected)
    console.log('courseToShow', courseToShow);
    this.setState({ courseToShow, disableConditionalStudentButton: false })
  }

  componentDidMount() {
    this.getAsignatureNames()
  }

  render() {
    return <div>
      <Row type="flex" justify="space-around" align="middle">
        <div style={{ margin: '25px' }}>
          <Select
            placeholder="Selecciona una materia"
            style={{ width: '300px' }}
            onSelect={(value) => {
              this.setState({ asignatureSelected: value }, this.setCoursesToShow)
            }
            }
          >
            {this.getAsignaturesNamesOption()}
          </Select>

        </div>
      </Row>
      <Row type="flex" justify="end">
      </Row>
      <MyCourses
        data={this.state.courseToShow}
      />
    </div>

  }
}