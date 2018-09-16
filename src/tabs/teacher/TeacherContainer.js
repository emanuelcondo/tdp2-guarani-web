import React,{Component} from 'react';
import { Tabs ,Icon} from 'antd';
import MyCourses from './MyCourses'

const TabPane = Tabs.TabPane;


class TeacherContainer extends Component {
  callback = (key) => {
    console.log(key);
  }
  
  render(){
    return (
    <Tabs defaultActiveKey="1" onChange={this.callback}>
      <TabPane 
        tab={<span><Icon type="database"/>Mis Cursos</span>} 
        key="1"
        >
        <MyCourses/>
      </TabPane>
      <TabPane 
        tab={<span><Icon type="plus"/>Agregar Alumno a Curso</span>} 
        key="2"
        >
        Content of Tab Pane 2
        </TabPane>
      <TabPane 
        tab={<span><Icon type="rocket"/>Otra accion</span>} 
        key="2"
      >
        Content of Tab Pane 2
      </TabPane>
    </Tabs>
    )
  }
}

export default TeacherContainer;