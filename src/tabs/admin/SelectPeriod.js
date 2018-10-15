import React,{Component}from 'react';
import { Select } from 'antd';

const Option = Select.Option;

class SelectPeriod extends Component {
  
  handleChange = (value)  => {
    console.log(`selected ${value}`);
  }
  
  handleBlur = () => {
    console.log('blur');
  }
  
  handleFocus = () => {
    console.log('focus');
  }
  


  render(){
  return <Select
    showSearch
    style={{ width: 300 ,marginRight:'50px'}}
    placeholder="Seleccionar periodo"
    optionFilterProp="children"
    onChange={this.handleChange}
    onFocus={this.handleFocus}
    onBlur={this.handleBlur}
    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
  >
    <Option value="inscripcion">Periodo de Inscripción</Option>
    <Option value="desincripcion">Periodo de Desinscripción</Option>
    <Option value="finales">Periodo de Finales</Option>
  </Select>
  }
}


export default SelectPeriod;