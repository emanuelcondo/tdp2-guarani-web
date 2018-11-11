import React, { Component } from 'react';
import { Tabs, Layout, Menu, Icon, Row, Col, Button } from 'antd';
import MyCoursesContent from './components/MyCoursesContent';
import FinalsContent from './components/FinalsContent'
import * as AuthService from '../login/service/AuthService'
import CourseInfo from './components/CourseInfo'
import { connect } from 'react-redux'
import Header from './components/Header'




const { Content } = Layout;

class TeacherContainer extends Component {

  state = {
    teacherName: 'teacher name',
  }



  setModal = (value) => {
    this.setState({ conditionalModal: value })
  }

  callback = (key) => {
    console.log(key);
  }

  getTeacherName = () => {
    AuthService.getUserInformation().then((response) => {
      console.log('user', response.data.data.usuario);
      const user = response.data.data.usuario;
      this.setState({ teacherName: user.apellido + ', ' + user.nombre })
    })
  }




  componentDidMount() {
    this.getTeacherName()
  }




  render() {
    return (
      <Layout>
        <div style={{ backgroundColor: '#404040' }}>
          <Header
            teacherName={this.state.teacherName}
            update={this.props.update}
          />
        </div>
        <Layout>
          <Content style={{ backgroundColor: 'white' }}>
            <div
              className={this.props.showConfig.myCourse ? 'content-show' : 'content-hidden'}
            >
              <MyCoursesContent />
            </div>
            <div
              className={this.props.showConfig.finalsContent ? 'content-show' : 'content-hidden'}
            >
              <FinalsContent />
            </div>
            <div
              className={this.props.showConfig.courseInformation ? 'content-show' : 'content-hidden'}
            >
              <CourseInfo />
            </div>
          </Content>
        </Layout>
      </Layout >
    )
  }
}


const mapStateToProps = state => {
  return {
    data: state.data,
    currentChildren: state.teacherContainerChildren,
    showConfig: state.showConfig
  }
}

export default connect(mapStateToProps, null)(TeacherContainer);