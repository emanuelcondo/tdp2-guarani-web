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
    this.loadCursesFromServer();
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
  loadCursesFromServer () {
    this.state.materias.forEach( 
      (materia) => {
        DepartmentService.getCoursesByMateriaID(materia._id).then(
          (response) => {
            response.data.data.cursos.forEach(
              (curso) => {
                console.log("QUE ONDA: ", curso)
                this.aplanarCurso(curso);
                let nuevoArray = this.state.cursos.concat(curso);
                this.setState({ cursos : nuevoArray });
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
    const dataSource = this.state.cursos;/*[{
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
    }];*/

    const columns = [{
      title: 'Año',
      dataIndex: 'anio',
      key: 'anio',
    },{
      title: 'Cuatrimestre',
      dataIndex: 'cuatrimestre',
      key: 'cuatrimestre',
    },{
      title: 'Materia',
      dataIndex: 'materia.nombre',
      key: 'materia.nombre',
    }, {
      title: 'Nro Curso',
      dataIndex: 'comision',
      key: 'comision',
    }, {
      title: 'Docente',
      dataIndex: 'docenteACargo.nombreYApellido',
      key: 'docenteACargo.nombreYApellido',
    }, {
      title: 'JTP',
      dataIndex: 'jtp.nombreYApellido',
      key: 'jtp.nombreYApellido',
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