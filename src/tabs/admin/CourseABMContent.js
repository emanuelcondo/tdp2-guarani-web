import React, { Component } from 'react';
import { Table, Button, Modal, Col, Row } from 'antd'
import EditCourseModal from './EditCourseModal'

export default class CoursesABMContent extends Component {

  state = {
    editCourseModalVisible: false
  }


  onOk = (e) => {
    console.log(e);
    this.setState({
      editCourseModalVisible: false,
    });
  }

  onCancel = (e) => {
    console.log(e);
    this.setState({
      editCourseModalVisible: false,
    });
  }

  showWarningModal = () => {
    Modal.warning({
      title: 'Eliminar curso nro X de profesor Y',
      content: '¿Está seguro que desea eliminar este curso? Este curso tiene x cantidad de alumnos',
    });
  }

  render() {
    const dataSource = [{
      key: '1',
      name: 'Algortimos I',
      age: 1,
      address: 'Menendez, Martin',
      cantidadDeAlumnos: 14,
      jtp: 'Gomez, Juan Pablo'
    }, {
      key: '2',
      name: 'Algortimos I',
      age: 2,
      address: 'Menendez, Martin',
      cantidadDeAlumnos: 10,
      jtp: 'Davalos, Sulma'
    }];

    const columns = [{
      title: 'Materia',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: 'Nro Curso',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: 'Docente',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: 'JTP',
      dataIndex: 'jtp',
      key: 'jtp',
    }, {
      title: 'Ayudantes',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: 'Cantidad de alumnos',
      dataIndex: 'cantidadDeAlumnos',
      key: 'cantidadDeAlumnos'
    }, {
      title: 'Acciones',
      dataIndex: 'acciones',
      key: 'acciones',
      render: (value, row, idx) => {
        return <div> <Button.Group>
          <Button
            type='primary'
            icon='edit'
            onClick={() => { this.setState({ editCourseModalVisible: true }) }}

          >
            Editar
          </Button>
          <Button
            type='primary'
            icon='delete'
            onClick={() => this.showWarningModal()}
          >
            Eliminar
          </Button>
        </Button.Group>
          <EditCourseModal
            visible={this.state.editCourseModalVisible}
            onOk={() => this.onOk()}
            onCancel={() => this.onCancel()}
          />
        </div>
      }
    }];

    return <div>
      <Row type="flex" justify="end">
        <Col>
          <Button
            type='primary'
            icon='plus'
            style={{ marginRight: '25px', marginTop: '25px' }}
          >
            Agregar Curso
          </Button>
        </Col>
      </Row>


      <Table
        style={{ marginTop: '50px' }}
        dataSource={dataSource}
        columns={columns}
        pagination={false}
      />
    </div>

  }
}