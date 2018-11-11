import React, { Component } from 'react';
import { Table, Button, Modal, Row, Col, Tag } from 'antd';
import * as TeacherService from '../service/TeacherService';
import ConditionalTable from './ConditionalTable'
import fileDownload from 'js-file-download'
import ButtonGroup from 'antd/lib/button/button-group';
import CalificationTable from './MyCourseCalificationTable';

import store from '../../../store'
import { changeTeacherContainerChildren, changeCurrentCourse } from '../../../actionCreators'

const Column = Table.Column


class MyCourses extends Component {

  state = {
    tableMessage: 'Seleccione una materia por favor'
  }


  expandedRowRender = (row, idx, indent, expanded) => {
    const columns = [
      {
        title: 'Dia',
        index: 'dia',
        dataIndex: 'dia'
      }, {
        title: 'Horario',
        render: (e, row, idx) => {
          console.log('row', row);
          return row.horario_desde + ' - ' + row.horario_hasta
        }
      }, {
        title: 'Sede',
        index: 'sede',
        dataIndex: 'sede'
      }, {
        title: 'Aula',
        dataIndex: 'aula'
      }, {
        title: 'Tipo',
        dataIndex: 'tipo'
      }
    ]
    console.log('row.cursada', row.cursada);
    row.cursada.forEach(element => {
      element['sede'] = row.sede.nombre
    });
    return <Table
      dataSource={row.cursada}
      columns={columns}
      pagination={false}
    />
  }

  render() {
    return <Table
      dataSource={this.props.data}
      rowKey={record => record.comision}
      expandedRowRender={this.expandedRowRender}
      pagination={false}
      locale={{ emptyText: this.state.tableMessage }}
    >
      <Column title='Año' dataIndex='anio' key='anio'
        filters={[{ text: 'Joe', value: 'Joe' }, { text: 'Jim', value: 'Jim' },
        ]} />
      <Column title='Cuatrimestre' dataIndex='cuatrimestre' key='cuatrimestre'
        filters={[{ text: '1° Cuatrimestre', value: '1' }, { text: '2° Cuatrimestre', value: '2' }, { text: 'Curso Verano', value: 'cursoVerano' }
        ]} />
      <Column title='Curso' dataIndex='comision' key='numero' />
      <Column title='Docente' key='docente'
        render={(row, value, idx) => (<div key={idx}>{value.docenteACargo.apellido + ', ' + value.docenteACargo.nombre}</div>)
        }
      />
      <Column title='JTP' key='jtp' render={(row, value, idx) => {
        if (row.jtp !== null) {
          return <div key={idx}>{row.jtp.apellido + ', ' + row.jtp.nombre}</div>
        }
        return <div></div>
      }} />
      <Column
        title='Ayudantes' key='ayudantesDePrimera'
        render={(value, row, idx) => {
          return row.ayudantes.map((ayudante) => (<div>{ayudante.apellido}, {ayudante.nombre}</div>))
        }}
      />

      <Column title='Cantidad de Inscriptos' dataIndex='cantidadInscriptos' key='cantidadInscriptos' />
      <Column title='Alumnos' key='alumnos' render={(value, row, idx) => {
        return <div>
          <ButtonGroup>
            <Button
              onClick={() => {
                const columns = [
                  {
                    title: 'Padrón',
                    index: 'padron',
                    dataIndex: 'alumno.legajo',
                    width: 70,
                    render: (value, row, idx) => {
                      return <div style={{ padding: '6px' }}>{row.alumno.legajo}</div>
                    }
                  }, {
                    title: 'Nombre y Apellido',
                    index: 'nombre',
                    width: 170,
                    render: (value, row, index) => {
                      return <div> {row.alumno.apellido}, {row.alumno.nombre}</div>
                    }
                  }, {
                    title: 'Prioridad',
                    index: 'prioridad',
                    dataIndex: 'alumno.prioridad',
                    width: 70
                  }, {
                    title: 'Observaciones',
                    index: 'siEsCondicional',
                    width: 110,
                    render: (value, row, idx) => {
                      if (row.exCondicional) {
                        return <Tag color="blue" key={idx}>Condicional</Tag>
                      } return <div></div>
                    }
                  }
                ]

                Modal.info({
                  title: 'Alumnos',
                  content:
                    <div>
                      <Row>
                        <Col span={12}>
                          <Table
                            columns={columns}
                            dataSource={row.regulares}
                            rowKey={(row) => (row.alumno.legajo)}
                            pagination={false}
                            style={{ marginRight: '30px' }}
                            title={() => { return <h1>Inscriptos Regulares</h1> }}
                            locale={{ emptyText: 'No hay alumnos regulares inscriptos' }}
                          />
                        </Col>
                        <Col span={12}>
                          <ConditionalTable
                            getConditionals={this.props.getConditionals}
                            courseId={row._id}
                            update={() => { this.props.update() }}
                          />
                        </Col>
                      </Row>
                    </div>
                  ,
                  width: '1200px'
                })
              }}
              disabled={row.regulares === undefined || row.regulares.length === 0}
              icon='eye'
            >
              Ver
              </Button>
            <Button
              onClick={() => {
                store.dispatch(changeTeacherContainerChildren({ myCourse: false, finalsContent: false, courseInformation: true }));
                store.dispatch(changeCurrentCourse(row))
              }}
              disabled={row.regulares.length === 0}
              icon='ordered-list'
            >
              Calificar
              </Button>
          </ButtonGroup>
        </div>
      }} />
    </Table >
  }
}

export default MyCourses;

