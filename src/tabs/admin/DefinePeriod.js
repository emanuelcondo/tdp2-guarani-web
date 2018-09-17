import React,{Component} from 'react';
import PeriodTable from './PeriodTable'

class DefinePeriod extends Component {
  render(){
    return <div>
      <div style={{margin:'20px'}}> Agregar periodo </div>
      <PeriodTable/>
    </div>
  }
}


export default DefinePeriod;