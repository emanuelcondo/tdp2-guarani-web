import React, { Component } from 'react';
import { Table, Button, Modal, Row, Col } from 'antd';




class MyFinals extends Component {

  state = {
    tableMessage: 'Seleccione una materia por favor'
  }


  warning = () => {
    Modal.confirm({
      title: 'Cancelar fecha de final',
      content: '¿Esta seguro que desea cancelar este fecha de final?',
      okText : "Si",
      onOk : this.cancelExam,
      okText : "No",
      onCancel : {},
    });

  }

  cancelExam = () => {
    console.log("Aca va el post");
    console.log(this.props.data);
  }

  render() {

    const columns = [
      {
        title: 'Número de Curso',
        dataIndex: 'curso.comision',
        key: 'numero'
      }, {
        title: 'Día',
        index: 'dia',
        dataIndex: 'fecha',
        render: (value, row, idx) => {
          const date = new Date(row.fecha)
          return date.getDay() + '-' + date.getMonth() + '-' + date.getFullYear()
        }
      }, {
        title: 'Horario',
        index: 'horario',
        dataIndex: 'hora',
        render: (value, row, idx) => {
          const date = new Date(row.fecha)
          return date.getHours() + ':' + date.getMinutes()
        }
      }, {
        title: 'Aula asignada',
        index: 'aula',
        dataIndex: 'aula'
      }, {
        title: 'Docente',
        key: 'docente',
        dataIndex: 'docenteACargo',
        render: (value, row, idx) => {
          return row.curso.docenteACargo.nombre + ', ' + row.curso.docenteACargo.apellido
        }

      }, {
        title: 'Examen final',
        render: (value, row, idx) => {
          return <Button type='primary' onClick={this.warning} >
            Cancelar final
          </Button>
        }
      }
    ];

    return <Table
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