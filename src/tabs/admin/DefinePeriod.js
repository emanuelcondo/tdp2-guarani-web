import React,{Component} from 'react';
import PeriodTable from './PeriodTable'
import SelectPeriod from './SelectPeriod'
import SelectDates from './SelectDates';
import AddNewPeriod from './AddNewPeriod'

class DefinePeriod extends Component {
  render(){
    return <div>
      <div style={{margin:'20px'}}> 
        <span style={{marginRight:'20px'}}>Agregar periodo </span> 
        <SelectPeriod/>
        <SelectDates/>
        <AddNewPeriod/>

      </div>
      <PeriodTable/>
    </div>
  }
}


export default DefinePeriod;