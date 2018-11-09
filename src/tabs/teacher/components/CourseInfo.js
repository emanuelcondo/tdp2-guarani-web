import React, { Component } from 'react'
import { Breadcrumb, Button, Row, Col } from 'antd';
import { connect } from 'react-redux'
import StudentGrid from './StudentsGrid'
import { downloadCourseInformation } from '../service/TeacherService'
import fileDownload from 'js-file-download'



const CourseInfo = (props) => {
  return <div>
    <Breadcrumb separator=">" style={{ marginLeft: '20px', marginTop: '50px', fontSize: '18px', marginBottom: '30px' }}>
      <Breadcrumb.Item>
        {props.asignatureName}
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        Curso {props.comission}
      </Breadcrumb.Item>
    </Breadcrumb >
    <StudentGrid dataSource={props.data} />
    <Row type="flex" justify="end">
      <Col>
        <Button
          onClick={() => {
            downloadCourseInformation(props.courseId).then((data) => {
              fileDownload(data.data, `75.44-${props.asignatureName}.csv`)
            })
          }}
          icon='cloud-download'
          style={{ marginRight: '30px', marginTop: '30px' }}
        >
          Descargar
      </Button>
      </Col>
    </Row>

  </div>
}

const mapStateToProps = state => {
  return {
    asignatureName: state.currentCourse.materia.nombre,
    comission: state.currentCourse.comision,
    data: state.currentCourse.regulares,
    courseId: state.currentCourse._id
  }
}

export default connect(mapStateToProps, null)(CourseInfo);
