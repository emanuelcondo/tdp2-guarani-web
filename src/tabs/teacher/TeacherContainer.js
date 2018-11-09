import React, { Component } from 'react';
import { Tabs, Layout, Menu, Icon, Select, Row, Col, Button } from 'antd';
import * as TeacherService from './service/TeacherService'
import MyCoursesContent from './components/MyCoursesContent';
import FinalsContent from './components/FinalsContent'
import * as AuthService from '../login/service/AuthService'
import CourseInfo from './components/CourseInfo'
import { connect } from 'react-redux'

import store from '../../store'
import { changeTeacherContainerChildren } from '../../actionCreators'

const TabPane = Tabs.TabPane;
const ButtonGroup = Button.Group;



const { Content } = Layout;

class TeacherContainer extends Component {

  state = {
    teacherName: 'teacher name',
    childrens: {
      myCourses: <MyCoursesContent />,
      finalsContent: <FinalsContent />,
      courseInformation: <CourseInfo />
    },
    /**this value is for default */
    children: <MyCoursesContent />,
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
          <Row>
            <Col span={1}>
            </Col>
            <Col span={17}>
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                style={{ lineHeight: '64px', backgroundColor: '#404040' }}
              >
                <Menu.Item
                  onClick={() => store.dispatch(changeTeacherContainerChildren('myCourses'))}
                  key="1"
                >
                  <Icon type="database" />
                  Mis Cursos
            </Menu.Item>
                <Menu.Item key="2" onClick={() => store.dispatch(changeTeacherContainerChildren('finalsContent'))}>
                  Examenes
            </Menu.Item>
              </Menu></Col>
            <Col span={6}>
              <Row type="flex" justify="end">
                <ButtonGroup style={{ padding: '16px' }}>
                  <Button style={{ cursor: 'text' }}>
                    <Icon type="user" theme="outlined" />
                    {this.state.teacherName}
                  </Button>
                  <Button
                    onClick={() => { localStorage.removeItem('rol'); localStorage.removeItem('token'); this.props.update() }}
                  >
                    <Icon type="logout" theme="outlined" />
                    Salir
                </Button>
                </ButtonGroup>
              </Row>
            </Col>
          </Row>
        </div>
        <Layout>
          <Content style={{ backgroundColor: 'white' }}>
            {this.state.childrens[this.props.currentChildren]}
          </Content>
        </Layout>
      </Layout >
    )
  }
}


const mapStateToProps = state => {
  return {
    data: state.data,
    currentChildren: state.teacherContainerChildren
  }
}

export default connect(mapStateToProps, null)(TeacherContainer);