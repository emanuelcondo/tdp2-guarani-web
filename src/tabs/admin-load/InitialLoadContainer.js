import React, { Component } from 'react';
import { Modal, Button, Spin, Icon, Row, Col, Divider, Upload, message } from 'antd';

const props = {
  name: 'file',
  action: '//jsonplaceholder.typicode.com/posts/',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

export default class InitialLoadContainer extends Component {

  onClickLoadingMock = () => {
    Modal.info({
      title: <h2>Cargando alumnos al sistema</h2>,
      content: (
        <div>
          Esta operación puede demorar varios minutos<br/><br/>
          <center><Spin size="large" /></center>
        </div>
      ),
      onOk() {},
    });
  }

  onClickOKMock = () => {
    Modal.success({
      title: <h2>Carga de alumnos exitosa</h2>,
      content: <div>Se han cargado exitosamente 51234 registros de alumnos.</div>,
    });
  }

  onClickErrorMock = () =>  {
    Modal.error({
      title: <h2>Ha fallado la carga de alumnos</h2>,
      content: <div><div><b>Se han encontrado los siguientes errores:</b></div>
      <div>Linea 123: Se hallaron 6 campos. Se esperaban 5.</div>
      <div>Linea 1357: El DNI "32q26723" contiene caracteres invalidos.</div>
      <div>Linea 7513: El formato es incorrecto.</div>
      <div>Linea 13047: El nombre "Juan6" contiene caracteres invalidos.</div>
      <div>Linea 17894: El campo "nombre" se encuentra vacio.</div>
      <div>Linea 20157: El padrón 85468 ya fue definido en la linea 3457.</div>
      <div>Linea 22314: La carrera "49" no es valida.</div>
      <div>Linea 27645: El campo "prioridad" se encuentra vacio.</div></div>
    });
  }
  
  render() {
    return <div>
      <Row>
        <Col span={8} offset={8}>
            <Button type="primary" size="large" block onClick={this.onClickLoadingMock}>
              <Icon type="upload"/>Cargar Aulas <span aria-label="Close" role="img">🏫</span>
            </Button>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={8} offset={8}>
            <Button type="primary" size="large" block onClick={this.onClickOKMock}>
            <Icon type="upload"/>Cargar Docentes <span aria-label="Close" role="img">👨‍🏫</span>
            </Button>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={8} offset={8}>
            <Button type="primary" size="large" block onClick={this.onClickErrorMock}>
              <Icon type="upload"/>Cargar Materias <span aria-label="Close" role="img">📚</span>
            </Button>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={8} offset={8}>
            <Button type="primary" size="large" block>
            <Icon type="upload"/>Cargar Carreras <span aria-label="Close"role="img">🏁</span>
            </Button>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={8} offset={8}>
          <Upload {...props} block>
            <Button type="primary" size="large" block>
            <Icon type="upload"/>Cargar Departamentos <span aria-label="Close"role="img">🏢</span>
            </Button>
          </Upload>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={8} offset={8}>
            <Button type="primary" size="large" block>
            <Icon type="upload"/>Cargar Alumnos <span aria-label="Close"role="img">👨‍🎓</span>
            </Button>
        </Col>
      </Row>
    </div>
  }
} 
