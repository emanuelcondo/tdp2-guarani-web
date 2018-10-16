import React, { Component } from 'react';
import { Button, Row, DatePicker, Col, TimePicker, Select, Form, Input, Modal } from 'antd';
import MyFinals from './MyFinalsTable'
import locate from 'antd/lib/date-picker/locale/es_ES'

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

      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };


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

            <FormItem
              {...formItemLayout}
            >
              <h2 align="right">Algoritmos II</h2>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Curso"
            >
              <span className="ant-form-text">1 - Calvo, Patricia</span>
            </FormItem>


            <FormItem
              {...formItemLayout}
              label="Día">
              {getFieldDecorator('dia', {
                rules: [{ required: true, message: 'Por favor ingrese el día de examen' }],
              })(
                <DatePicker locale={locate} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Horario">
              {getFieldDecorator('horario', {
                rules: [{ required: true, message: 'Por favor ingrese el horario del examen' }],
              })(
                <TimePicker format={timeFormat} placeholder='Selecciona la hora' style={{ width: '200px' }} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Sede">
              {getFieldDecorator('sede', {
                rules: [{ required: true, message: 'Por favor ingrese la sede del examen' }],
              })(
                <Select
                  //value={""}
                  placeholder='Seleccione una sede'
                  size={size}
                  style={{ width: '55%' }}
                //onChange={this.handleCurrencyChange}
                >
                  <Option value="pc">Paseo Colón</Option>
                  <Option value="lh">Las Heras</Option>
                </Select>
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
  aula: null,
  docenteACargo: 'Calvo, Patricia'
}];


export default class FinalsContent extends Component {
  state = {
    finalsToShow: [],
    asignatureSelected: '',
    buttonNewFinalDisabled: true,
    visible: false,
    sede: 'Paseo Colón'
  }

  getAsignaturesNamesOption = () => {
    const nombreMaterias = localStorage.getItem('asignatureNames').split(',')
    return nombreMaterias.filter((value, idx) => nombreMaterias.indexOf(value) === idx).map((name, idx) => (<Option key={idx} value={name}> {name} </Option>))
  }



  setFinalsToShow = () => {
    const finalsToShow = dataSource;
    this.setState({ buttonNewFinalDisabled: false })
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
        <Button type='primary' size='large' onClick={this.showModal}>Nueva fecha de examen</Button>

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