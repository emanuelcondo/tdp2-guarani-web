import React, { Component } from 'react';
import { Table, Button, Modal, Row, Col } from 'antd';


const columns = [
  {
    title: 'Número de Curso',
    dataIndex: 'comision',
    key: 'numero'
  }, {
    title: 'Día',
    index: 'dia',
    dataIndex: 'fecha'
  }, {
    title: 'Horario',
    index: 'horario',
    dataIndex: 'hora'
  }, {
    title: 'Aula',
    index: 'aula',
    dataIndex: 'aula'
  }, {
    title: 'Docente',
    key: 'docente',
    dataIndex: 'docenteACargo'
  }, {
    title: 'Examen final',
    render: (value, row, idx) => {
      return row.docenteACargo === 'Calvo, Patricia' ? <Button type='primary'>
        Cancelar final
      </Button> : <div/>
    }
  }
];


class MyFinals extends Component {

    state = {
      tableMessage: 'Seleccione una materia por favor'
    }
  
  
    render() {
      return  <Table
          dataSource={this.props.data}
          columns={columns}
          rowKey={record => record.comision}
          pagination={false}
          locale={{ emptyText: this.state.tableMessage }}
          style={{ padding: 100 }}
        />

    }
  }

  
  export default MyFinals;