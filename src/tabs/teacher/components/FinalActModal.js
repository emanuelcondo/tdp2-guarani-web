import React, { Component } from 'react'
import { Modal, message, Input, Button, Table, Divider  } from 'antd';
import CollectionCreateForm from './FinalForm'
import * as TeacherService from '../service/TeacherService'

const columns = [{
        title: 'Padrón',
        dataIndex: 'alumno.legajo',
        key: 'alumno.legajo',
    }, {
        title: 'Nombre',
        dataIndex: 'alumno.nombre',
        key: 'alumno.nombre',
    }, {
        title: 'Apellido',
        dataIndex: 'alumno.apellido',
        key: 'alumno.apellido',
    }, {
        title: 'Condicion',
        dataIndex: 'condicion',
        key: 'condicion',
    }, {
        title: 'Oportunidad',
        dataIndex: 'oportunidad',
        key: 'oportunidad',
        align: 'center',
    }, {
        title: 'Nota de Cursada',
        dataIndex: 'notaCursada',
        key: 'notaCursada',
        align: 'center',
    }, {
        title: 'Nota de Examen',
        dataIndex: 'notaExamen',
        key: 'notaExamen',
        align: 'center',
        render: notaExamen => {
            if (notaExamen != null) {
                return notaExamen;
            }
            else {
                return <Input style={{ width: '20%' }}/>
            }
        },
    }, {
        title: 'Nota de Cierre',
        dataIndex: 'notaCierre',
        key: 'notaCierre',
        align: 'center',
        render: notaCierre => {
            if (notaCierre != null) {
                return notaCierre;
            }
            else {
                return <Input style={{ width: '20%' }}/>
            }
        },
    }];
    

export default class FinalActModal extends Component {

    handleOk = () => {

    /*TeacherService.updateExam(this.props.courseId, this.props.finalId, dateToSend).then(
        (response) => {
            this.props.handleOk()
            message.success('La fecha de final se actualizó de manera correcta')
        }).catch((e) => {
        message.error('No se puedo realizar el cambio')
        }
    )*/
    this.setState({ visible: false });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

  render() {
   
    return <Modal
      title="Inscriptos"
      width="90%"
      visible={this.props.visible}
      onOk={this.handleOk}
      onCancel={this.props.handleCancel}
      destroyOnClose="true"
    >
    <div>
        <Table rowKey="_id" dataSource={this.props.inscriptosAFinal} columns={columns} style={{ width: '100%' }} locale={{ emptyText: 'No hay ningún inscripto' }} />
    </div>
    <Divider>Suma de seguridad</Divider>
    <div align="Right"><Input/></div>

    </Modal >
  }
}