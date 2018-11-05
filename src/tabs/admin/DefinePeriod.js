import React,{Component} from 'react';
import PeriodTable from './PeriodTable';
import NewPeriodModal from './NewPeriodModal'
import { Button, Row, Col } from 'antd'

class DefinePeriod extends Component {
  
  constructor (props){
    super(props);
  
    this.state = {
        editPeriodModalVisible: false,
      };
  
    this.setEditPeriodModalVisible = this.setEditPeriodModalVisible.bind(this);
  
  }

  setEditPeriodModalVisible() {
    this.setState({editPeriodModalVisible: true});
  }

  onOk = (e) => {
    this.setState({editPeriodModalVisible: false});
  }

  onCancel = (e) => {
    this.setState({editPeriodModalVisible: false});
  }

  
  
  render(){
    return <div>
      <Row type="flex" justify="end">
        <Col>
          <Button
            type='primary'
            icon='plus'
            style={{ marginRight: '25px', marginTop: '25px' }}
            onClick={() => { this.setState({ editPeriodModalVisible: true }) }}
          >
            Agregar Periodo
          </Button>
        </Col>
      </Row>
      <PeriodTable
        setEditPeriodModalVisible={this.setEditPeriodModalVisible}
      />

      <NewPeriodModal
                visible={this.state.editPeriodModalVisible}
                handleCancel={this.onCancel}
                handleOk={this.onOk}
                >
                </NewPeriodModal>
    </div>
  }
}


export default DefinePeriod;