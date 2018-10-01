import React,{Component} from 'react'
import {Modal,Table,Button} from 'antd'


export default class ConditionalModal extends Component{


  handleOk = (e) => {
    console.log(e);
    this.props.show(false)
  }

  handleCancel = (e) => {
    console.log(e);
    this.props.show(false)
  }


  render(){
    const columns = [
      {
        title:'Padron',
        index:'padron',
        dataIndex:'padron'
      },
      {
        title:'Nombre',
        index:'nombre',
        dataIndex:'nombre'
      },{
        title:'Prioridad',
        index:'prioridad',
        dataIndex:'prioridad'
      },
      {
        title:'Accion',
        index:'accion',
        render:()=>{
          return <Button>
            Inscribir alumno a curso
          </Button>
        }
      }
  ]
    return <Modal
          title="Basic Modal"
          visible={this.props.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width='700px'
        >
        <Table
          columns={columns}
        />
        </Modal>
  }
}