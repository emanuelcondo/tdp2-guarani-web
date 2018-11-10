import React, { Component } from 'react';
import { DatePicker, Form, Row, Col } from 'antd';
import locate from 'antd/lib/date-picker/locale/es_ES'


const FormItem = Form.Item;
const { RangePicker } = DatePicker;

const CreateEditPeriodForm = Form.create()(
  class extends Component {

    render() {
      const { visible, onCancel, onCreate, form, size } = this.props;
      const { getFieldDecorator } = form;
      const state = this.state;

      return <Form layout="inline">
        <FormItem>
          <h2 align="right">{this.props.rowdata.cuatrimestre}° Cuatrimestre {this.props.rowdata.anio}</h2>
        </FormItem>

        <Row type="flex" justify="center" >
          <Col span={12}>
            <FormItem label="Inscripción a cursos">
              {getFieldDecorator('ins_cur', {
                rules: [{ required: true, message: 'Ingrese el período de inscripción' }],
              })(
                <RangePicker locale={locate} />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="Desinscripción a cursos">
              {getFieldDecorator('des_cur', {
                rules: [{ required: true, message: 'Ingrese el período de desinscripción' }],
              })(
                <RangePicker locale={locate} />
              )}
            </FormItem>
          </Col>

        </Row>

        <Row type="flex" justify="center" >
          <Col span={12}>
            <FormItem label="Consulta de Prioridad">
              {getFieldDecorator('con_pri', {
                rules: [{ required: true, message: 'Ingrese el período de Consulta de Prioridad' }],
              })(
                <RangePicker locale={locate} />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="Cursada">
              {getFieldDecorator('cursad', {
                rules: [{ required: true, message: 'Ingrese el período de cursada' }],
              })(
                <RangePicker locale={locate} />
              )}
            </FormItem>
          </Col>

        </Row>


      </Form>

    }
  }
);

export default CreateEditPeriodForm;
