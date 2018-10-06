import React,{Component} from 'react'
import { Button,Table,Modal,message } from 'antd';
import * as TeacherService from '../service/TeacherService'

class ConditionalTable extends Component {

  state = { visible: false }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
    TeacherService.addConditionalStudent('José','Pérez').then(()=>{
      console.log('salio bien');
    }).catch((e)=>{
      console.log('salio mal');
      message.error('No se pudo agregar al alumno');
    })
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }



  render(){


    const dataSource = [
      {
        padron:'98745',
        nombre:'Martín Aguilar',
        prioridad:2
      },{
        padron:'95482',
        nombre:'Mariela García',
        prioridad:4
      }
    ];
    

    const columns = [{
      title: 'Padrón',
      dataIndex: 'padron',
      key: 'padron',
    }, {
      title: 'Nombre y Apellido',
      dataIndex: 'nombre',
      key: 'nombre',
    }, {
      title: 'Prioridad',
      dataIndex: 'prioridad',
      key: 'prioridad',
    },{
      title:'Inscribir',
      key:'inscribir',
      render:(value,row,idx) => {
        return <div>
          <Button 
            type="primary"
            onClick={()=>{this.setState({visible:true})}}
          >
          Inscribir
          </Button>
          <Modal
          title="Inscribir alumno condicional"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
        ¿Estás seguro que querés inscribir a {row.nombre}? 
        </Modal>
          </div>
      }
    }
  ];


    return <div>
      <Table
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      title={()=>{return <h1>Tabla de condicionales</h1>}}
      locale={{emptyText:'No hay ningún alumno condicional'}}
      />
    </div>
  }
}


export default ConditionalTable;