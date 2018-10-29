import React, { Component } from 'react';
import { Table, Button, Modal, Input, Row, Col } from 'antd'

const Search = Input.Search;

export default class BookABMContent extends Component {

  showWarningModal = () => {
    Modal.warning({
      title: 'Eliminación de registro',
      content: '¿Está seguro que desea eliminar este registro?',
    });
  }


  render() {
    const dataSource = [{
      key: '1',
      name: '99999 - Gonzalez, Cristian',
      nroDeFolio: 939292,
      nroLibro: 122,
      address: '10 Downing Street',
      nota: 10
    }, {
      key: '2',
      name: '99998 - Robles, Martin',
      nroDeFolio: 939293,
      nroLibro: 122,
      address: '10 Downing Street',
      nota: 7
    }];

    const columns = [{
      title: 'Nro Libro',
      dataIndex: 'nroLibro',
      key: 'nroLibro',
    }, {
      title: 'Nro de folio',
      dataIndex: 'nroDeFolio',
      key: 'nroDeFolio'
    }, {
      title: 'Alumno',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: 'Nota',
      dataIndex: 'nota',
      key: 'nota',
    }, {
      title: 'Acciones',
      dataIndex: 'acciones',
      key: 'acciones',
      render: (value, row, idx) => {
        return <Button.Group>
          <Button
            type='primary'
            icon='edit'
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
      }
    }
    ];

    return <div>
      <Row type="flex" justify="center" style={{ marginTop: '30px' }}>
        <Col span={4}>
          <Search
            placeholder="numero de folio"
            onSearch={value => console.log(value)}
            style={{ width: 200 }}
          />
        </Col>
        <Col span={4}>
          <Search
            placeholder="numero de libro"
            onSearch={value => console.log(value)}
            style={{ width: 200 }}
          /></Col>
      </Row>
      <Row type="flex" justify="end">
        <Col>
          <Button
            type='primary'
            icon='plus'
            style={{ marginRight: '25px', marginTop: '25px' }}
          >
            Agregar Folio
          </Button>
        </Col>
      </Row>
      <Table
        style={{ marginTop: '50px' }}
        dataSource={dataSource}
        columns={columns}
        pagination={false} s
      />
    </div>

  }
}