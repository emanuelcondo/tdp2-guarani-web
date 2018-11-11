import React, { Component } from 'react'
import { Breadcrumb, Button, Row, Col, notification } from 'antd';
import { connect } from 'react-redux'
import StudentGrid from './StudentsGrid'
import { downloadCourseInformation, updateNote } from '../service/TeacherService'
import fileDownload from 'js-file-download'

import store from '../../../store'
import { changeTeacherContainerChildren, showSaveNotesButton } from '../../../actionCreators'

const ButtonGroup = Button.Group;


class CourseInfo extends Component {

  state = {
    studentsNotes: []
  }

  handleSave = (studentId, note) => {
    const newData = [...this.state.studentsNotes];
    const index = newData.findIndex(item => item.padron === studentId);
    /**dont found case */
    if (index < 0) {
      newData.push({ padron: studentId, nota: note })
    } else {
      const item = newData[index];
      newData[index] = { padron: studentId, nota: note }
    }
    console.log('newData', newData);
    this.setState({ studentsNotes: newData });
  }

  render() {
    return <div>
      <Breadcrumb separator=">" style={{ marginLeft: '20px', marginTop: '50px', fontSize: '18px', marginBottom: '30px' }}>
        <Breadcrumb.Item
          onClick={() => {
            store.dispatch(changeTeacherContainerChildren({ myCourse: true, finalsContent: false, courseInformation: false }))
            store.dispatch(showSaveNotesButton(false))
          }}
        >
          <span
            style={{ textDecorationLine: 'underline', cursor: 'pointer' }}
          >
            {this.props.asignatureName}
          </span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          Curso {this.props.comission}
        </Breadcrumb.Item>
      </Breadcrumb >
      <StudentGrid
        dataSource={this.props.data}
        handleSave={this.handleSave}
      />
      <Row type="flex" justify="end">
        <Col>
          <ButtonGroup style={{ marginTop: '30px', marginRight: '40px' }}>
            <Button
              icon='save'
              disabled={!this.props.showSaveButton}
              onClick={() => {
                updateNote(this.props.courseId, this.state.studentsNotes).then(() => {
                  notification['success']({
                    message: 'Guardar notas de cursada',
                    description: 'Se guarda de manera exitosa las nuevas notas'
                  })
                  store.dispatch(showSaveNotesButton(false))
                })

              }}
            >
              Guardar
          </Button>
            <Button
              onClick={() => {
                downloadCourseInformation(this.props.courseId).then((data) => {
                  fileDownload(data.data, `75.44-${this.props.asignatureName}.csv`)
                })
              }}
              icon='cloud-download'
            >
              Descargar
          </Button>

          </ButtonGroup>

        </Col>
      </Row>

    </div >
  }
}

const mapStateToProps = state => {
  return {
    asignatureName: state.currentCourse.materia.nombre,
    comission: state.currentCourse.comision,
    data: state.currentCourse.regulares,
    courseId: state.currentCourse._id,
    showSaveButton: state.showSaveNotes
  }
}

export default connect(mapStateToProps, null)(CourseInfo);
