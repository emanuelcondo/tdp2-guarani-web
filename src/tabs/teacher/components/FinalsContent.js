import React, { Component } from 'react';
import { Button, Row, Select } from 'antd';


const Option = Select.Option;


export default class FinalsContent extends Component {

  getAsignaturesNamesOption = () => {
    const nombreMaterias = localStorage.getItem('asignatureNames').split(',')
    return nombreMaterias.filter((value, idx) => nombreMaterias.indexOf(value) === idx).map((name, idx) => (<Option key={idx} value={name}> {name} </Option>))
  }

  render() {
    return <div>
      <Select
        placeholder='Selecciona una materia'
        style={{ width: '300px' }}
      >
        {this.getAsignaturesNamesOption()}
      </Select>
      <Row type="flex" justify="end" style={{ marginTop: '50px', marginRight: '15px' }}>
        <Button
          type={'primary'}
        >
          Agregar fechas de finales
      </Button>
      </Row>

    </div>
  }
} 