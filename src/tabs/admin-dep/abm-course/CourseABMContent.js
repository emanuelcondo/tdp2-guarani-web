import React, { Component } from 'react';
import { Table, Button, Modal, Col, Row, message } from 'antd'
import EditCourseModal from '../../admin/EditCourseModal'
import * as DepartmentService from '../service/DepartmentService'

export default class CoursesABMContent extends Component {

  state = {
    editCourseModalVisible: false,
    codigo : null,
    materias : [],
    cursos : [],
    anios : new Set(),
    cuatrimestres : new Set(),
    nombresMaterias : new Set(),
    docentes : new Set(),
    jtps : new Set(),
  }

  componentDidMount() {
    this.update();
  }

  /**
   * Carga los datos
   */
  async update() {
    await this.loadMateriasFromServer();
    console.log("Materias recibidas: ", this.state.materias)
    await this.loadCursesFromServer();
    console.log("Cursos recibidos: ", this.state.cursos)
  }

  /**
   * Carga las materias para el departamento que esta logeado usando el token
   * Devuelve una promise para chainearle más cosas
   */
  async loadMateriasFromServer () {
    return DepartmentService.getDepartmentDataByToken().then(
      (response) => {
        let depto = response.data.data.departamentos[0];
        this.setState({ codigo : depto.codigo, materias: depto.materias });
      }
    )
  }

  /**
   * Por cada materia, carga los cursos a la lista
   * Si bien uno esperaria tener problemas de concurrencia con estos requests->array, 
   * parece que js es single threaded y no pasa nada
   */
  async loadCursesFromServer () {
    return this.state.materias.forEach( 
      (materia) => {
        DepartmentService.getCoursesByMateriaID(materia._id).then(
          (response) => {
            response.data.data.cursos.forEach(
              (curso) => {
                console.log("QUE ONDA: ", curso)
                this.aplanarCurso(curso);
                let nuevoArray = this.state.cursos.concat(curso);
                this.setState({ 
                  cursos : nuevoArray, 
                  anios : this.state.anios.add(curso.anio),
                  cuatrimestres : this.state.cuatrimestres.add(curso.cuatrimestre),
                  nombresMaterias : this.state.nombresMaterias.add(curso.materia.nombre),
                  docentes : this.state.docentes.add(curso.docenteACargo.nombreYApellido),
                  jtps : this.state.jtps.add(curso.jtp.nombreYApellido)});
                console.log("ESTADO: ",this.state)
              }
            )
          }
        )
      } 
    );
  }

  /**
   * Dado el JSON de curso que recibo del server, lo transforma un poco para que sea
   * más comodo de mostrar.
   * No retorna nada, se hace in place
   * @param {*} curso El curso como viene en el JSON
   */
  aplanarCurso (curso) {
    console.log("ESTADO: ", curso)
    curso.docenteACargo.nombreYApellido = curso.docenteACargo.nombre + " " + curso.docenteACargo.apellido;
    curso.jtp.nombreYApellido = curso.jtp.nombre + " " + curso.jtp.apellido;
    curso.ayudantesPlanos = [];
    curso.ayudantes.forEach(
      (ayudante) => {
        curso.ayudantesPlanos.push(ayudante.nombre + " " + ayudante.apellido + "\n")

      }
    );
  }

  /**
   * Dado un set devuelve un array de objetos con los items del set como text y value
   * @param {*} set El set
   */
  setToFilter (set) {
    let filter = [];
    set.forEach( 
      (item) => {
        filter.push({text : item.toString(), value : item})
      }
    )
    return filter;
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

  /**
   * Devuelve una funcion que Intenta eliminar un curso, y de tener exito actualiza el estado
   * Hay un currying aca para poder setear el curso de antemano
   */
  eliminarCurso (curso) {
    return () => {
      DepartmentService.deleteCourseByID(curso.materia._id, curso._id).then(
        (response) => {
          let nuevoArray = this.state.cursos.filter( 
            (elem) => { return curso._id != elem._id; }
          )
          this.setState({ cursos : nuevoArray });
          message.success('Se ha eliminado el curso con éxito.');
        }
      ).catch(
        (e) => {
          message.error('No se pudo eliminar el curso:\n'+e.response.data.error.message);
        }
      )
    }
  }

  warningEliminarCurso = (row) => {
    let self = this;
    Modal.confirm({
      title: `Eliminar curso ${row.comision} de ${row.materia.nombre} del profesor ${row.docenteACargo.nombreYApellido} del año ${row.anio} cuatrimestre ${row.cuatrimestre}`,
      content: `¿Está seguro que desea eliminar este curso? Este curso tiene ${row.cupos - row.vacantes} alumnos`,
      width: '80%',
      okText:'Si',
      okType: 'danger',
      onOk: this.eliminarCurso(row),
      cancelText:'No'
    });
  }

  render() {
    const dataSource = this.state.cursos;

    const columns = [{
      title: 'Año',
      dataIndex: 'anio',
      key: 'anio',
      filters: this.setToFilter(this.state.anios),
      onFilter: (value, record) => { return record.anio == value }
    },{
      title: 'Cuatrimestre',
      dataIndex: 'cuatrimestre',
      key: 'cuatrimestre',
      filters: this.setToFilter(this.state.cuatrimestres),
      onFilter: (value, record) => { return record.cuatrimestre == value }
    },{
      title: 'Materia',
      dataIndex: 'materia.nombre',
      key: 'materia.nombre',
      filters: this.setToFilter(this.state.nombresMaterias),
      onFilter: (value, record) => { return record.materia.nombre == value }
    }, {
      title: 'Nro Curso',
      dataIndex: 'comision',
      key: 'comision',
    }, {
      title: 'Docente',
      dataIndex: 'docenteACargo.nombreYApellido',
      key: 'docenteACargo.nombreYApellido',
      filters: this.setToFilter(this.state.docentes),
      onFilter: (value, record) => { return record.docenteACargo.nombreYApellido == value }
    }, {
      title: 'JTP',
      dataIndex: 'jtp.nombreYApellido',
      key: 'jtp.nombreYApellido',
      filters: this.setToFilter(this.state.jtps),
      onFilter: (value, record) => { return record.jtp.nombreYApellido == value }
    }, {
      title: 'Ayudantes',
      dataIndex: 'ayudantesPlanos',
      key: 'ayudantesPlanos',
    }, {
      title: 'Cupo',
      dataIndex: 'cupos',
      key: 'cupos'
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
            onClick={() => this.warningEliminarCurso(row)}
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
        style={{ marginTop: '50px', whiteSpace: 'pre'}}
        dataSource={dataSource}
        columns={columns}
        pagination={false}
      />
    </div>

  }
}