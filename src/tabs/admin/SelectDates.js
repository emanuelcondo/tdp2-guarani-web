import React,{Component } from 'react';
import { DatePicker } from 'antd';

const { RangePicker, MonthPicker } = DatePicker;



class SelectDates extends Component {
  render(){
    return <RangePicker style={{marginRight:'20px'}} renderExtraFooter={() => 'extra footer'} />
  }
}



export default SelectDates;