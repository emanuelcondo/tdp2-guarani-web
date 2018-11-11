import React, { Component } from 'react'
import { Row, Col, Menu, Icon, Button } from 'antd'
import store from '../../../store'
import { changeTeacherContainerChildren } from '../../../actionCreators'
import { connect } from 'react-redux'

const ButtonGroup = Button.Group;


export default class Header extends Component {
  render() {
    return <Row>
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
            onClick={() => store.dispatch(changeTeacherContainerChildren({ myCourse: true, finalsContent: false, courseInformation: false }))}
            key="1"
          >
            <Icon type="database" />
            Mis Cursos
    </Menu.Item>
          <Menu.Item key="2" onClick={() => store.dispatch(changeTeacherContainerChildren({ myCourse: false, finalsContent: true, courseInformation: false }))}>
            Examenes
    </Menu.Item>
        </Menu></Col>
      <Col span={6}>
        <Row type="flex" justify="end">
          <ButtonGroup style={{ padding: '16px' }}>
            <Button style={{ cursor: 'text' }}>
              <Icon type="user" theme="outlined" />
              {this.props.teacherName}
            </Button>
            <Button
              onClick={() => {
                localStorage.removeItem('rol');
                localStorage.removeItem('token');
                this.props.update()
              }}
            >
              <Icon type="logout" theme="outlined" />
              Salir
        </Button>
          </ButtonGroup>
        </Row>
      </Col>
    </Row>
  }
}