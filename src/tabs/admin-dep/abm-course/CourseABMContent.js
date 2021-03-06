import React, { Component } from 'react';
import { Table, Button, Modal, Col, Row, message } from 'antd'
import EditCourseModal from '../../admin/EditCourseModal'
import * as DepartmentService from '../service/DepartmentService'
import CreateNewCourseForm from './NewCourseForm'
import {CourseFormModeEnum} from './NewCourseForm'

const ITEMS_PER_PAGE = 9;

export default class CoursesABMContent extends Component {

  state = {
    departamento_id: null,
    codigo : null,
    materias : [],
    docentesList: [],
    cursos : [],
    anios : new Set(),
    cuatrimestres : new Set(),
    nombresMaterias : new Set(),
    docentes : new Set(),
    jtps : new Set(),
    pagination: {
      pageSize: ITEMS_PER_PAGE,
      total: 0
    },
    courseModalVisible : false,
    courseModalMode : CourseFormModeEnum.NEW,
    courseModalButtonText : "",
    selectedRow : null,
  }

  componentDidMount() {
    this.update();
  }

  /**
   * Carga los datos
   */
  async update() {
    await this.loadProfessorsFromServer();
    await this.loadMateriasFromServer();
    console.log("Materias recibidas: ", this.state.materias)
    this.loadCoursesFromServer();
    console.log("Cursos recibidos: ", this.state.cursos)
  }

  async loadProfessorsFromServer() {
    let self = this;
    return DepartmentService.searchProfessors('')
      .then((response) => {
        let _docentes = response.data.data.docentes;
        self.setState({
          docentesList: _docentes
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  /**
   * Carga las materias para el departamento que esta logeado usando el token
   * Devuelve una promise para chainearle más cosas
   */
  async loadMateriasFromServer () {
    return DepartmentService.getDepartmentDataByToken().then(
      (response) => {
        let depto = response.data.data.departamentos[0];
        this.setState({ departamento_id: depto._id, codigo : depto.codigo, materias: depto.materias });
      }
    )
  }

  /**
   * Resetea la info que se saca de los cursos
   */
  resetInfo() {
    this.setState({ 
      cursos : [],
      anios : new Set(),
      cuatrimestres : new Set(),
      nombresMaterias : new Set(),
      docentes : new Set(),
      jtps : new Set(),
      pagination: {
        pageSize: ITEMS_PER_PAGE,
        total: 0
      },
    });
  }

  /**
   * Resetea la info y carga los cursos, docentes, anios, cuatrimestres, etc
   */
  loadCoursesFromServer () {
    let depto = this.state.departamento_id;
    this.resetInfo();
    DepartmentService.getCoursesByDepartamentID(depto, { limit: 100 })
      .then((response) => {
        let data = response.data.data;
        this.setState({
          pagination: { pageSize: ITEMS_PER_PAGE, total: data.totalcount }
        });

        let cursos = data.cursos;
        cursos.forEach((curso) => {
          this.aplanarCurso(curso);
          let nuevoArray = this.state.cursos.concat(curso);
          this.setState({ 
            cursos : nuevoArray, 
            anios : this.state.anios.add(curso.anio),
            cuatrimestres : this.state.cuatrimestres.add(curso.cuatrimestre),
            nombresMaterias : this.state.nombresMaterias.add(curso.materia.nombre),
            docentes : this.state.docentes.add(curso.docenteACargo.nombreYApellido),
            jtps : this.state.jtps.add(curso.jtp.nombreYApellido)
          });
        });
      });
  }

  /**
   * Dado el JSON de curso que recibo del server, lo transforma un poco para que sea
   * más comodo de mostrar.
   * No retorna nada, se hace in place
   * @param {*} curso El curso como viene en el JSON
   */
  aplanarCurso (curso) {
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
    this.setState({courseModalVisible : false});
  }

  onCancel = () => {
    this.setState({courseModalVisible : false});
  }

  /**
   * Setea la selected row con los los valores faltantes
   */
  fillPresets(arow) {
    let row = arow;
    if (row == null) row = {};
    if (row.anio == null) row.anio = 2018;
    if (row.cuatrimestre == null) row.cuatrimestre = 0;
    if (row.cupos == null) row.cupos = 10;
    if (row.materia == null) row.materia = this.state.materias[0];
    if (row.docenteACargo == null) row.docenteACargo = null;
    if (row.jtp == null) row.jtp = null;
    if (row.ayudantes == null) row.ayudantes = [];
    this.setState({selectedRow : row});
  }

  /**
   * Funcion a llamar cuando se clickea el boton para agregar un nuevo curso
   */
  onClickNewCourse() {
    this.setState({courseModalVisible : true, courseModalMode : CourseFormModeEnum.NEW, courseModalTitle : "Nuevo curso", courseModalButtonText : "Crear curso", selectedRow : null});
    this.fillPresets(null);
  }

  /**
   * Funcion a llamar cuando se clickea el boton ver curso actual
   */
  onClickView = (row) => {
    this.setState({courseModalVisible : true, courseModalMode : CourseFormModeEnum.VIEW, courseModalTitle : "Detalle de curso", courseModalButtonText: "Cerrar", selectedRow : row});
    this.fillPresets(row);
  }

  /**
   * Funcion a llamar cuando se clickea el boton editar un curso actual
   */
  onClickEdit = (row) => {
    this.setState({courseModalVisible : true, courseModalMode : CourseFormModeEnum.EDIT, courseModalTitle : "Editar curso", courseModalButtonText: "Editar curso", selectedRow : row});
    this.fillPresets(row);
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

  updateTable = (pagination, filters) => {
    console.log(pagination);
    console.log(filters);
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
      render: cuatrimestre => cuatrimestre < 1 ? 'Verano' : (cuatrimestre + 'º'),
      filters: this.setToFilter(this.state.cuatrimestres),
      onFilter: (value, record) => { return record.cuatrimestre == value }
    },{
      title: 'Materia',
      dataIndex: 'materia',
      key: 'materia',
      render: materia => `${materia.codigo} - ${materia.nombre}`,
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
        return <div> <Button.Group style={{ whiteSpace:"pre" }} >
          <Button
              type='primary'
              icon='eye'
              onClick={() => { this.onClickView(row) }}>Ver</Button>
          { (row.anio > 2018 || (row.anio == 2018 && row.cuatrimestre > 1)) ?
            (
              <Button
                type='primary'
                icon='edit'
                onClick={() => { this.onClickEdit(row) }}>Editar</Button>
              ) : ('')
          }
          { (row.anio > 2018 || (row.anio == 2018 && row.cuatrimestre > 1)) ?
            (
              <Button
                type='primary'
                icon='delete'
                onClick={() => this.warningEliminarCurso(row)}>Eliminar</Button>
            ) : ('')
          }
        </Button.Group>
        </div>
      }
    }];

    return <div>
      <Row type="flex" justify="end">
        <Col>
          <Button
            type='primary'
            icon='plus'
            style={{ marginRight: '25px', marginTop: '10px', marginBottom: '10px' }}
            onClick={this.onClickNewCourse.bind(this)}
          >
            Agregar Curso
          </Button>
        </Col>
      </Row>


      <Table
        //style={{ whiteSpace: 'pre'}}
        dataSource={dataSource}
        columns={columns}
        pagination={this.state.pagination}
        onChange={this.updateTable}
        
      />

      <Modal
      title={this.state.courseModalTitle}
      visible={this.state.courseModalVisible}
      width="90%"
      onCancel={this.onCancel}
      footer={null}
      destroyOnClose="true"
       >
        <CreateNewCourseForm
          materias={this.state.materias}
          docentes={this.state.docentesList}
          cursos={this.state.cursos}
          onCancel={this.onCancel}
          updateCallback={ () => {this.loadCoursesFromServer()}}
          mode={this.state.courseModalMode}
          buttonText={this.state.courseModalButtonText}
          selectedRow={this.state.selectedRow}
          //wrappedComponentRef={this.saveFormRef}
          //rowdata={this.props.rowdata}
        ></CreateNewCourseForm>
      </Modal >
    </div>

  }
}