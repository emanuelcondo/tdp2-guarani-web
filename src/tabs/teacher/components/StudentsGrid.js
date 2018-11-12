import React, { Component } from 'react'
import { Table, Tag, InputNumber } from 'antd'

import '../style/style.css'
import { showSaveNotesButton } from '../../../actionCreators'
import store from '../../../store'

//store.dispatch(showSaveNotesButton(true))

class EditableCell extends Component {
  state = {
    showMe: false
  }
  render() {
    return <div
    >
      <InputNumber min={2} max={10} defaultValue={this.props.note} onChange={(value) => {
        store.dispatch(showSaveNotesButton(true))
        this.props.handleSave(this.props.studentId, value)
      }} />
    </div>
  }

}


const Column = Table.Column;

class StudentGrid extends Component {

  render() {

    return <Table
      dataSource={this.props.dataSource}
      pagination={false}
      style={{ margin: '0px 40px' }}
      rowClassName={() => 'editable-row'}
      rowKey={(row) => row._id}
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
        key="nota"
        editable={true}
        render={(row) => {
          return <div
            style={{ cursor: 'pointer' }}
          >
            <EditableCell
              note={row.notaCursada}
              studentId={row.alumno.legajo}
              handleSave={this.props.handleSave}

            />
          </div>
        }}
      />

      <Column
        title="Nota Cierre"
        key="notaCierre"
        editable={true}
        render={(row) => {
          return <div
          >
            
          </div>
        }}
      />

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
    </Table >
  }
}



export default StudentGrid;