import React,{Component} from 'react';
import PeriodTable from './PeriodTable';
import SelectPeriod from './SelectPeriod';
import SelectDates from './SelectDates';
import AddNewPeriod from './AddNewPeriod';

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
      <div style={{margin:'20px'}}> 
        <span style={{marginRight:'20px'}}>Agregar periodo </span> 
        <SelectPeriod/>
        <SelectDates/>
        <AddNewPeriod/>

      </div>
      <PeriodTable
        setEditPeriodModalVisible={this.setEditPeriodModalVisible}
      />
    </div>
  }
}


export default DefinePeriod;