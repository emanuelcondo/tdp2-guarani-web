import React,{Component} from 'react';
import PeriodTable from './PeriodTable';
import NewPeriodModal from './NewPeriodModal'
import EditPeriodModal from './EditPeriodModal'
import { Button, Row, Col, message } from 'antd'
import * as AdminService from './service/AdminService'

class DefinePeriod extends Component {
  
  constructor (props){
    super(props);
  
    this.state = {
        newPeriodModalVisible: false,
        editPeriodModalVisible: false,
        existingPeriods: [],
        indexToEdit: -1
      };
  
    this.setEditPeriodModalVisible = this.setEditPeriodModalVisible.bind(this);
  
  }

  setEditPeriodModalVisible = (e) => {
    this.setState({editPeriodModalVisible: true});
  }

  setNewPeriodModalVisible = (e) => {
    this.setState({newPeriodModalVisible: true});
  }

  setNewPeriodModalNotVisible = (e) => {
    this.setState({newPeriodModalVisible: false});
  }

  setEditPeriodModalNotVisible = (e) => {
    this.setState({editPeriodModalVisible: false});
  }

  setIndexToEdit = (idx) => {
    this.setState({indexToEdit: idx});
  }

  onRefresh = (e) => {
    this.setState({newPeriodModalVisible: false});
    this.setState({editPeriodModalVisible: false});
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
        setIndexToEdit={this.setIndexToEdit}
        onEdit={this.setEditPeriodModalVisible}
      />

      <NewPeriodModal
        visible={this.state.newPeriodModalVisible}
        handleCancel={this.setNewPeriodModalNotVisible}
        handleOk={this.onRefresh}
      >
      </NewPeriodModal>
      <EditPeriodModal
                visible={this.state.editPeriodModalVisible}
                handleCancel={this.setEditPeriodModalNotVisible}
                handleOk={this.onRefresh}
                dataSource={this.state.existingPeriods}
                index={this.state.indexToEdit}
            >
      </EditPeriodModal>
    </div>
  }
}


export default DefinePeriod;