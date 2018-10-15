import React, { Component } from 'react';
import { Tabs, Icon, Button, Layout, Row, Col, Menu } from 'antd';
import DefinePeriod from './DefinePeriod'
import InitialLoadContainer from '../admin-load/InitialLoadContainer';


const TabPane = Tabs.TabPane;
const ButtonGroup = Button.Group;
const { Content } = Layout;



class AdminContainer extends Component {

  state = {
    childrens: {
      definePeriod: <DefinePeriod />,
      initialLoad: <InitialLoadContainer />
    },
    currentChilder: <DefinePeriod />
  }

  selectNewChilder = (childrenName) => {
    this.setState({ currentChilder: this.state.childrens[childrenName] })
  }

  render() {
    return (
      <div>
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
                    onClick={() => this.selectNewChilder('definePeriod')}
                    key="1"
                  >
                    Definir Periodos
            </Menu.Item>
                  <Menu.Item key="2" onClick={() => this.selectNewChilder('initialLoad')}>
                    Carga Inicial
            </Menu.Item>
                </Menu></Col>
              <Col span={6}>
                <Row type="flex" justify="end">
                  <ButtonGroup style={{ padding: '16px' }}>
                    <Button style={{ cursor: 'text' }}>
                      <Icon type="user" theme="outlined" />
                      Amarilla, Cristobal
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