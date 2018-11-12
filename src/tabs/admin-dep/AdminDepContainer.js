import React, { Component } from 'react';
import { Tabs, Icon, Button, Layout, Row, Col, Menu } from 'antd';
import * as AuthService from '../login/service/AuthService'
import CourseABMContent from './abm-course/CourseABMContent'

const TabPane = Tabs.TabPane;
const ButtonGroup = Button.Group;
const { Content } = Layout;

class AdminDepContainer extends Component {

  state = {
    childrens: {
      courses: <CourseABMContent />
    },
    currentChildren: <CourseABMContent />,
    userName: '',
    userID: null,
    userDNI: null,
  }

  selectNewChilder = (childrenName) => {
    this.setState({ currentChildren: this.state.childrens[childrenName] })
  }

  getUserInformation = () => {
    AuthService.getUserInformation().then((response) => {
      console.log('user', response.data.data.usuario);
      const user = response.data.data.usuario;
      this.setState({ userName: user.nombre + " de " + user.apellido, userID : user._id, userDNI : user.dni  });
    })
  }


  componentDidMount() {
    this.getUserInformation()
  }

  render() {
    return (
      <div>
        <Layout>
          <div style={{ backgroundColor: '#404040' }}>
            <Row>
              <Col span={1}>
              </Col>
              <Col span={15}>
                <Menu
                  theme="dark"
                  mode="horizontal"
                  defaultSelectedKeys={['1']}
                  style={{ lineHeight: '64px', backgroundColor: '#404040' }}
                >
                  <Menu.Item
                    key="1"
                    onClick={() => this.selectNewChilder('courses')}
                  >
                    Cursos
                  </Menu.Item>
                </Menu>
              </Col>
              <Col span={8}>
                <Row type="flex" justify="end">
                  <ButtonGroup style={{ padding: '16px' }}>
                    <Button style={{ cursor: 'text' }}>
                      <Icon type="user" theme="outlined" />
                      {this.state.userName}
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
              {this.state.currentChildren}
            </Content>
          </Layout>
        </Layout>
      </div>
    )
  }
}

export default AdminDepContainer;