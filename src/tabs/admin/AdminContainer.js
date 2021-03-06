import React, { Component } from 'react';
import { Tabs, Icon, Button, Layout, Row, Col, Menu } from 'antd';
import DefinePeriod from './DefinePeriod'
//import SurveyGraph from './SurveyGraph'
import AdminSurveyChart from './AdminSurveyChart'
import InitialLoadContainer from '../admin-load/InitialLoadContainer';
import * as AuthService from '../login/service/AuthService'
//import CourseABMContent from '../admin-dep/abm-course/CourseABMContent'
//import BookABMContent from './BookABMContent'


const TabPane = Tabs.TabPane;
const ButtonGroup = Button.Group;
const { Content } = Layout;



class AdminContainer extends Component {

  state = {
    childrens: {
      definePeriod: <DefinePeriod />,
      initialLoad: <InitialLoadContainer />,
      //surveyGraph: <SurveyGraph anio={2018} cuatrimestre={2} depto={75}/>
      surveyChart: <AdminSurveyChart/>
      //books: <BookABMContent />,
      //courses: <CourseABMContent />
    },
    currentChilder: <DefinePeriod />,
    userName: ''
  }

  selectNewChilder = (childrenName) => {
    this.setState({ currentChilder: this.state.childrens[childrenName] })
  }

  getUserInformation = () => {
    AuthService.getUserInformation().then((response) => {
      console.log('user', response.data.data.usuario);
      const user = response.data.data.usuario;
      this.setState({ userName: user.apellido + ', ' + user.nombre })
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
                    onClick={() => this.selectNewChilder('definePeriod')}
                    key="1"
                  >
                    Definir Periodos
                    </Menu.Item>
                  <Menu.Item
                    key="2"
                    onClick={() => this.selectNewChilder('initialLoad')}
                  >
                    Carga Inicial
                  </Menu.Item>
                  <Menu.Item
                    key="3"
                    onClick={() => this.selectNewChilder('surveyChart')}
                  >
                    Reporte de encuestas
                  </Menu.Item>

                  {/*<Menu.Item
                    key="4"
                    onClick={() => this.selectNewChilder('courses')}
                  >
                    Cursos
                  </Menu.Item>
                  {<Menu.Item
                    key="5"
                    onClick={() => this.selectNewChilder('books')}
                  >
                    Libros
                  </Menu.Item>*/}

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
              {this.state.currentChilder}
            </Content>
          </Layout>
        </Layout>
      </div>
    )
  }
}

export default AdminContainer;