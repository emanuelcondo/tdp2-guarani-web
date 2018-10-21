import React, { Component } from 'react';
import { Modal, Button, Spin, Icon, Row, Col, Divider, Upload, message } from 'antd';

var onClickLoadingMock = () => {
  Modal.info({
    width: 800,
    title: <h2>Cargando alumnos al sistema</h2>,
    content: (
      <div>
        Esta operación puede demorar varios segundos<br /><br />
        <center><Spin size="large" /></center>
      </div>
    ),
    onOk() { },
  });
}

var onClickOKMock = () => {
  Modal.success({
    width: 800,
    title: <h2>Carga de alumnos exitosa</h2>,
    content: <div>Se han cargado exitosamente 51234 registros de alumnos.</div>,
  });
}

var uploadResultError = (response) => {
  Modal.error({
    width: 800,
    title: <h2>Ha fallado la carga de alumnos</h2>,
    content: <div><b>Se han cargado 0 registros de alumnos.<br/><br/>
      Corrija los siguientes errores e intentelo nuevamente:</b><br/>
      {response.error.message}</div>
  });
}

const Dragger = Upload.Dragger;

const props1 = {
  accept: ".csv",
  showUploadList: false,
  action: 'http://localhost:3000/api/v1.0/importacion/alumnos',
  headers: {
    token : localStorage.getItem('token'),
  },
  onChange(info) {
    const status = info.file.status;
    if (status !== 'uploading') {
      onClickLoadingMock();
    }
    if (status === 'done') {
      onClickOKMock();
    } else if (status === 'error') {
      uploadResultError(info.file.response);
    }
  },
};

const textos = [["Cargar Aulas", "🏫"],
["Cargar Materias", "📚"],
["Cargar Carreras", "🏁"],
["Cargar Departamentos", "🏢"],
["Cargar Docentes", "👨‍🏫"],
["Cargar Alumnos", "👨‍🎓"]];

export default class InitialLoadContainer extends Component {

  render() {
    return <Row type="flex" justify="center" align="top" style={{ marginTop: '50px' }}>
      <div>
        <Row type="flex" justify="space-around">{textos.slice(0, 3).map((i, idx) =>
          <Col span={7} key={idx}>
            <Dragger {...props1} >
              <p className="ant-upload-drag-icon">
                <font size="54"><span aria-label="Icon" role="img">{i[1]}</span></font>
              </p>
              <div className="ant-upload-text"><h1>{i[0]}</h1></div>
              <p className="ant-upload-hint">Haga click o arraste un archivo .csv apropiado</p>
            </Dragger>
          </Col>)}
        </Row>
        <br />
        <Row type="flex" justify="space-around">{textos.slice(3, 6).map((i, idx) =>
          <Col span={7} key={idx}>
            <Dragger {...props1}>
              <p className="ant-upload-drag-icon">
                <font size="54"><span aria-label="Icon" role="img">{i[1]}</span></font>
              </p>
              <div className="ant-upload-text"><h1>{i[0]}</h1></div>
              <p className="ant-upload-hint">Haga click o arraste un archivo .csv apropiado</p>
            </Dragger>
          </Col>)}
        </Row>

      </div>
    </Row>
  }

} 
