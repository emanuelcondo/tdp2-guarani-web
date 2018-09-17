import React,{Component} from 'react';
import {Button,Row,Col} from 'antd';

class AddCourse extends Component {
  render(){
    return <Row type="flex" justify="end">
       <Col 
       span={2} >
        <Button 
        type="primary"
        style={{margin:'20px'}}
        >Agregar Curso</Button>
       </Col>
    </Row>
  }
}


export default AddCourse;