import React, { Component } from 'react'
import { Table, Tag } from 'antd'


const Column = Table.Column;

const StudentGrid = (props) => {
  console.log('props', props);
  return <Table
    dataSource={props.dataSource}
    pagination={false}
    style={{ margin: '10px' }}
  >
    <Column title="Padron" dataIndex="alumno.legajo" key="transactionId" />
    <Column
      title="Nombre y Apellido"
      key="nombreyapellido"
      render={(row) => {
        return <div> {row.alumno.apellido}, {row.alumno.nombre}</div>
      }
      } />
    <Column
      title="Nota Cursada"
      dataIndex="alumno.prioridad"
      key="nota"
    />
    <Column
      title="Nota de cierre de Cursada"
      dataIndex="transactionId"
      key="transactionId" />
    <Column
      title="Observaciones"
      key="observaciones"
      render={(row, idx) => {
        if (row.exCondicional) {
          return <Tag color="blue" key={idx}>Condicional</Tag>
        } return <div></div>
      }
      }
    />
  </Table>

}



export default StudentGrid;