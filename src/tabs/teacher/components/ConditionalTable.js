import React, { Component } from 'react'
import { Button, Table, Modal, message } from 'antd';
import * as TeacherService from '../service/TeacherService'

class ConditionalTable extends Component {

  state = { visible: false }

  showModal = () => {
    this.setState({
      visible: true,
      conditionals: []
    });
  }


  /* usar para actualizar
  updateConditionals = () => {
    console.log('ConditionalGreed - get conditionals')
    this.setState({ conditionals: this.props.conditionals })
  }
  */

  componentDidMount() {
    //this.updateConditionals()
    this.setState({ conditionals: this.props.conditionals });
  }

  handleOk = (courseId, studentId) => {
    console.log(`courseId ${courseId} studentId ${studentId}`);
    const newConditionals = this.state.conditionals.filter((inscription) => inscription.alumno._id != studentId);
    this.setState({
      visible: false,
      conditionals: newConditionals
    });
    console.log('New conds ', this.state.conditionals);
    
    /*
    TeacherService.addConditionalStudent(courseId, studentId).then(() => {
      message.success('El alumno se pudo agregar de manera exitosa');
      const newConditionals = this.state.conditionals.filter((inscription) => inscription.alumno._id != studentId);
      
      this.setState({
        conditionals: newConditionals
      });
      
    }).catch((e) => {
      console.log('salio mal');
      message.error('No se pudo agregar al alumno');
    })
    */
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }



  render() {

    const columns = [{
      title: 'Padrón',
      dataIndex: 'alumno.legajo',
      key: 'padron',
      width: 70
    }, {
      title: 'Nombre y Apellido',
      dataIndex: 'nombre',
      key: 'nombre',
      width: 170,
      render: (value, row, index) => {
        return <div> {row.alumno.apellido}, {row.alumno.nombre}</div>
      }
    }, {
      title: 'Prioridad',
      dataIndex: 'alumno.prioridad',
      key: 'prioridad',
      width: 70
    }, {
      title: 'Inscribir',
      key: 'inscribir',
      render: (value, row, idx) => {
        return <div>
          <Button
            type="primary"
            onClick={() => { this.setState({ visible: true }) }}
          >
            Inscribir
          </Button>
          <Modal
            title="Inscribir alumno condicional"
            visible={this.state.visible}
            onOk={() => { this.handleOk(this.props.courseId, row.alumno._id) }}
            onCancel={this.handleCancel}
          >
            ¿Estás seguro que querés inscribir a {row.alumno.apellido}, {row.alumno.nombre}?
        </Modal>
        </div>
      }
    }
    ];


    return <div>
      <Table
        columns={columns}
        dataSource={this.state.conditionals}
        pagination={false}
        title={() => { return <h1>Inscriptos Condicionales</h1> }}
        locale={{ emptyText: 'No hay alumnos condicionales' }}
        rowKey={row => row._id}
      />
    </div>
  }
}


export default ConditionalTable;