import React,{Component} from 'react';
import {Table, Button, Modal, DatePicker} from 'antd';

const { RangePicker, MonthPicker } = DatePicker;

const dataSource = [{
  key: '1',
  tipo: 'Periodo de desinscipción',
  inicio: '03-08-2017',
  fin: '10-08-2017'
}, {
  key: '2',
  tipo: 'Periodo inscripción',
  inicio: '27-07-2017',
  fin: '03-08-2017'
}];

const columns = [{
  title: 'Periodo',
  dataIndex: 'tipo',
  key: 'tipo',
}, {
  title: 'Día de inicio',
  dataIndex: 'inicio',
  key: 'inicio',
}, {
  title: 'Día de finalización',
  dataIndex: 'fin',
  key: 'fin',
}, {
    title: 'Acciones',
    key: 'acciones',
    render: () => (
      <div>
        <Button type="primary" onClick={mockEdit}>Editar</Button>
        <Button type="primary" onClick={mockDelete}>Eliminar</Button>
      </div>
    ),
}];

function mockEdit() {
  Modal.confirm({
    title: 'Seleccione el nuevo rango',
    content: <RangePicker/>,
    okText: "OK",
    cancelText: "Cancelar",
    open: true,
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  }); 
}

function mockDelete() {
  Modal.confirm({
    title: 'Esta seguro que desea eliminar este periodo?',
    okText: "OK",
    cancelText: "Cancelar",
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}


class PeriodTable extends Component {
  render(){
    return <Table dataSource={dataSource} columns={columns} />
  }
}


export default PeriodTable;