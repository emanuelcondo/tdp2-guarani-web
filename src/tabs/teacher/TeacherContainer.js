import React, { Component } from 'react';
import { Tabs, Layout, Menu, Icon, Select, Row, Col, Button } from 'antd';
import * as TeacherService from './service/TeacherService'
import MyCoursesContent from './components/MyCoursesContent';


const TabPane = Tabs.TabPane;
const ButtonGroup = Button.Group;



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
    const token = localStorage.getItem('token');
    TeacherService.getTeacherDataByToken(token).then((response) => {
      console.log('response', response);
      const teacherData = response.data.data.docente;
      this.setState({ teacherName: teacherData.apellido + ',' + teacherData.nombre })
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
                <Menu.Item key="1">
                  <Icon type="database" />
                  Mis Cursos
            </Menu.Item>
                <Menu.Item key="2" onClick={() => { console.log('click en mis cursos'); }}>
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
            <MyCoursesContent
            />
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default TeacherContainer;