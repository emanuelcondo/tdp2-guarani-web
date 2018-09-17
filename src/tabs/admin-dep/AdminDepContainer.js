import React,{Component} from 'react';
import { Tabs ,Icon} from 'antd';
import ABMCoursesContainer from './abm-course/AbmCoursesContainer';

const TabPane = Tabs.TabPane;

class AdminDepContainer extends Component {
  render(){
    return (
      <Tabs defaultActiveKey="1" onChange={this.callback}>
        <TabPane 
          tab={<span><Icon type="database"/>ABM Cursos</span>} 
          key="1"
          >
          <ABMCoursesContainer/>
        </TabPane>
        <TabPane 
          tab={<span><Icon type="plus"/>ABM Materias</span>} 
          key="2"
          >
          Content of Tab Pane 2
          </TabPane>
        <TabPane 
          tab={<span><Icon type="rocket"/>Otra accion</span>} 
          key="3"
        >
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
      )
  }
}

export default AdminDepContainer;