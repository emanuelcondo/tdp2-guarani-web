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

var onClickErrorMock = () => {
  Modal.error({
    width: 800,
    title: <h2>Ha fallado la carga de alumnos</h2>,
    content: <div><b>Se han cargado 0 registros de alumnos.<br/><br/>
      Corrija los siguientes errores e intentelo nuevamente:</b><br/>
      Linea 123: Se hallaron 6 campos. Se esperaban 5.<br/>
      Linea 1357: El DNI "32q26723" contiene caracteres invalidos.<br/>
      Linea 7513: El formato es incorrecto.<br/>
      Linea 13047: El nombre "Juan6" contiene caracteres invalidos.<br/>
      Linea 17894: El campo "nombre" se encuentra vacio.<br/>
      Linea 20157: El padrón 85468 ya fue definido en la linea 3457.<br/>
      Linea 22314: La carrera "49" no es valida.<br/>
      Linea 27645: El campo "prioridad" se encuentra vacio.<br/></div>
  });
}

const Dragger = Upload.Dragger;

const props1 = {
  showUploadList: false,
  name: 'file',
  multiple: true,
  action: '/',
  onChange(info) {
    const status = info.file.status;
    if (status !== 'uploading') {
      //onClickLoadingMock();
    }
    if (status === 'done') {
      onClickOKMock();
    } else if (status === 'error') {
      onClickOKMock();
    }
  },
};

const props2 = {
  showUploadList: false,
  name: 'file',
  multiple: true,
  action: '/',
  onChange(info) {
    const status = info.file.status;
    if (status !== 'uploading') {
      //onClickLoadingMock();

    }
    if (status === 'done') {
      onClickErrorMock();
    } else if (status === 'error') {
      onClickErrorMock();
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
            <Dragger {...props2}>
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
