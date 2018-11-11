import React,{Component} from 'react';
import PeriodTable from './PeriodTable';
import NewPeriodModal from './NewPeriodModal'
import { Button, Row, Col, message } from 'antd'
import * as AdminService from './service/AdminService'

class DefinePeriod extends Component {
  
  constructor (props){
    super(props);
  
    this.state = {
        newPeriodModalVisible: false,
        editPeriodModalVisible: false,
        existingPeriods: []
      };
  
    this.setEditPeriodModalVisible = this.setEditPeriodModalVisible.bind(this);
  
  }

  setEditPeriodModalVisible() {
    this.setState({editPeriodModalVisible: true});
  }

  setNewPeriodModalVisible = (e) => {
    this.setState({newPeriodModalVisible: true});
  }

  setNewPeriodModalNotVisible = (e) => {
    this.setState({newPeriodModalVisible: false});
  }

  onRefresh = (e) => {
    this.setState({newPeriodModalVisible: false});
    this.getPeriods();
  }

  onCancel = (e) => {
    this.setState({newPeriodModalVisible: false});
  }

  /*
  onRefresh = (e) => {
    this.getPeriods().then((this)=> {this.setState({newPeriodModalVisible: false})});
  }
  */

  componentDidMount() {
    this.getPeriods()
  }
  
  getPeriods = () => {
    console.log('getPeriods');
    AdminService.getPeriods().then((response) => {
      console.log('Periodos obtenidos', response);
      const periods = response.data.data.periodos;
      console.log('Periodos: ', periods);
      this.setState({existingPeriods: periods});
    }).catch((e) => {
      console.log('Period fetch - failed');
      console.log('Period fetch - error', e);
      console.log('Period fetch - response', e.response);
      console.log('Error:', e.response.data.error.message);

      //display error
      message.error(e.response.data.error.message);
      
    })
  }
  
  render(){
    return <div>
      <Row type="flex" justify="end">
        <Col>
          <Button
            type='primary'
            icon='plus'
            style={{ marginRight: '25px', marginTop: '25px' }}
            onClick={() => { this.setState({ newPeriodModalVisible: true }) }}
          >
            Agregar Periodo
          </Button>
        </Col>
      </Row>
      <PeriodTable
        setEditPeriodModalVisible={this.setEditPeriodModalVisible}
        dataSource={this.state.existingPeriods}
      />

      <NewPeriodModal
        visible={this.state.newPeriodModalVisible}
        handleCancel={this.setNewPeriodModalNotVisible}
        handleOk={this.onRefresh}
      >
      </NewPeriodModal>
    </div>
  }
}


export default DefinePeriod;