import React, { Component } from 'react';
import { Modal, Spin, Row, Col, Upload } from 'antd';

var varShowModal;
var varHideModal;

var uploadResultOK = (response,name) => {
  Modal.success({
    width: 800,
    title: <h2>Carga de {name} exitosa</h2>,
    content: <div>Se han cargado exitosamente {response.data.cantidadRegistrosProcesados} registros de {name}.</div>,
  });
}

var uploadResultError = (response,name) => {
  Modal.error({
    width: 800,
    title: <h2>Ha fallado la carga de {name}</h2>,
    content: <div><b>Se han cargado 0 registros de {name}.<br /><br />
      Corrija los siguientes errores e intentelo nuevamente:</b><br />
      {response.error.message}</div>
  });
}

var uploadMysteryProblem = (response,name) => {
  Modal.error({
    width: 800,
    title: <h2>Ha fallado la carga de {name}</h2>,
    content: <div><b>Se han cargado 0 registros de {name}.<br /><br />
      Se ha encontrado un error inesperado. Comunique a los desarrolladores lo siguiente:</b><br />
      {JSON.stringify(response)}</div>
  });
}

const Dragger = Upload.Dragger;

const textos = [["Cargar Aulas", "🏫"],
                ["Cargar Materias", "📚"],
                ["Cargar Carreras", "🏁"],
                ["Cargar Departamentos", "🏢"],
                ["Cargar Docentes", "👨‍🏫"],
                ["Cargar Alumnos", "👨‍🎓"]];

const endpoints = ["aulas","materias","carreras","departamentos","docentes","alumnos"]

var genProp = (id) => {
    return {
      accept: ".csv",
      showUploadList: false,
      action: "http://localhost:3000/api/v1.0/importacion/"+endpoints[id],
      headers: {
        token: localStorage.getItem('token')
      },
      onChange(info, context) {
        const status = info.file.status;
        if (status === 'uploading') {
          varShowModal();
        }
        else if (status === 'done') {
          varHideModal();
          uploadResultOK(info.file.response, info.file.name);
        } else if (status === 'error' ) {
          varHideModal();
          uploadResultError(info.file.response, info.file.name);
        } else {
          varHideModal();
          uploadMysteryProblem(info.file.response, info.file.name);
        }
      },
    };
}

export default class InitialLoadContainer extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      showLoading:false
    };
    varShowModal = () => { this.setState({showLoading:true}) }
    varHideModal = () => { this.setState({showLoading:false}) }
  }

  render() {

    const props = [genProp(0),genProp(1),genProp(2),genProp(3),genProp(4),genProp(5)];

    return <div>

      <div>
        <Modal
          visible={this.state.showLoading}
          title={<h2>Cargando archivo al sistema</h2>}
          footer={[]}
        >
          <div>
          Esta operación puede demorar varios segundos<br /><br />
          <center><Spin size="large" /></center>
          </div>
        </Modal>
      </div>
      
      <Row type="flex" justify="center" align="top" style={{ marginTop: '50px' }}>
        <div>
          <Row type="flex" justify="space-around">{textos.slice(0, 3).map((i, idx) =>
            <Col span={7} key={idx}>
              <Dragger {...props[idx]} >
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
              <Dragger {...props[idx+3]}>
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
    </div>
  }

} 
