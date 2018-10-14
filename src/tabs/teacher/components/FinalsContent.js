import React, { Component } from 'react';
import {Button, Row, Select, Modal } from 'antd';
import MyFinals from './MyFinalsTable'
import NewFinalModal from './NewFinalModal';


const Option = Select.Option;

const dataSource = [{
  comision: '1',
  fecha: '14/11/2018',
  hora: '17:30',
  aula: '203',
  docenteACargo: 'Wachenchauzer, Rosa'
}, {
  comision: '2',
  fecha: '03/12/2018',
  hora: '20:15',
  aula: '400',
  docenteACargo: 'Carolo, Gustavo'
}, {
  comision: '3',
  fecha: '08/12/2018',
  hora: '14:20',
  aula: 'LB',
  docenteACargo: 'Calvo, Patricia'
}];


export default class FinalsContent extends Component {
  state = {
    finalsToShow: [],
    asignatureSelected: '',
    buttonNewFinalDisabled: true

  }

  getAsignaturesNamesOption = () => {
    const nombreMaterias = localStorage.getItem('asignatureNames').split(',')
    return nombreMaterias.filter((value, idx) => nombreMaterias.indexOf(value) === idx).map((name, idx) => (<Option key={idx} value={name}> {name} </Option>))
  }



  setFinalsToShow = () => {
    const finalsToShow = dataSource;
    this.setState({buttonNewFinalDisabled:false})
    this.setState({ finalsToShow })
  }

  render() {
    return <div>
      <Row type="flex" justify="space-around" align="middle">
        <div style={{ margin: '25px' }}>
          <Select
            placeholder="Selecciona una materia"
            style={{ width: '300px' }}
            onSelect={(value) => {
              this.setState({ asignatureSelected: value }, this.setFinalsToShow)
            }
            }
          >
            {this.getAsignaturesNamesOption()}
          </Select>

        </div>
      </Row>
      <Row type="flex" justify="end">
      </Row>
      <MyFinals
        data={this.state.finalsToShow}
      />
      <Row type="flex" justify="center">
      <Button 
        type='primary' 
        size='large' 
        disabled={this.state.buttonNewFinalDisabled}
        onClick={() => {
          
          // TODO : Mostrar NewFinalModal
          Modal.info({
            content:
              <NewFinalModal/>
          })
        }}
      >
        Nueva fecha de examen
      </Button>
      </Row>
    </div>

  }

  
} 