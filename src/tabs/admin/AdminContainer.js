import React,{Component} from 'react';
import { Tabs ,Icon} from 'antd';
import DefinePeriod from './DefinePeriod'
import InitialLoadContainer from '../admin-load/InitialLoadContainer';
const TabPane = Tabs.TabPane;

class AdminContainer extends Component {
  render(){
    return (
      <Tabs defaultActiveKey="1" onChange={this.callback}>
        <TabPane 
          tab={<span><Icon type="database"/>Definir periodos</span>} 
          key="1"
          >
          <DefinePeriod/>
        </TabPane>
        <TabPane 
          tab={<span><Icon type="plus"/>Agregar Alumno a Curso</span>} 
          key="2"
          >
          Content of Tab Pane 2
          </TabPane>
        <TabPane 
          tab={<span><Icon type="rocket"/>Carga inicial</span>} 
          key="3"
        >
          <InitialLoadContainer/>
        </TabPane>
        <TabPane 
          tab={<span><Icon type="rocket"/>Otra accion</span>} 
          key="4"
        >
          Content of Tab Pane 2
        </TabPane>
      </Tabs>
      )
  }
}

export default AdminContainer;