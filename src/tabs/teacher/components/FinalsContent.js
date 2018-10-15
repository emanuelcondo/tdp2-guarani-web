import React, { Component } from 'react';
import {Button, Row, DatePicker, Col, TimePicker, Select, Form, Input, Radio, Modal } from 'antd';
import MyFinals from './MyFinalsTable'
//import NewFinalModal from './NewFinalModal';

const FormItem = Form.Item;

const timeFormat = 'HH:mm';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

const CollectionCreateForm = Form.create()(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form, size } = this.props;
      const { getFieldDecorator } = form;
      const state = this.state;

      return (
        <Modal
          visible={visible}
          title="Alta de examen final"
          okText="Crear"
          cancelText="Cancelar"
          onCancel={onCancel}
          onOk={onCreate}
        >
       
          <Form layout="vertical">
            <h2>Algoritmos II</h2>
            <h3>Curso 1 - Calvo, Patricia</h3>
            
            <FormItem label="Día">
              {getFieldDecorator('dia', {
                rules: [{ required: true, message: 'Por favor ingrese el día de examen' }],
              })(
                <DatePicker />
              )}
            </FormItem>
            <FormItem label="Horario">
              {getFieldDecorator('horario', {
                rules: [{ required: true, message: 'Por favor ingrese el horario del examen' }],
              })(
                <TimePicker format={timeFormat} />
              )}
            </FormItem>
            
            
          </Form>
        </Modal>
      );
    }
  }
);

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
    buttonNewFinalDisabled: true,
    visible: false,
    otroCampo: 'Algo',
    sede: 'Paseo Colón'
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

  showModal = () => {
    this.setState({ visible: true });
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
    });
  }

  handleSedeChange = (sede) => {
    if (!('value' in this.props)) {
      this.setState({ sede });
    }
    //this.triggerChange({ sede }); ver para que se usa
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
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
      <Button type='primary' size='large'  onClick={this.showModal}>Nueva fecha de examen</Button>

      <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </Row>
    </div>

  }

  
} 