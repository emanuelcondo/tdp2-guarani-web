import React, { Component } from 'react';
import { Table, Button, Modal, Alert, Row, Col, Tag } from 'antd';
import * as TeacherService from '../service/TeacherService';
import ConditionalTable from './ConditionalTable'
import fileDownload from 'js-file-download'

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
    const columns = [
      {
        title: 'Número de Curso',
        dataIndex: 'comision',
        key: 'numero'
      },
      {
        title: 'Docente',
        key: 'name',
        render: (e, v, c) => {
          return <div key={c}>{v.docenteACargo.apellido + ', ' + v.docenteACargo.nombre}</div>
        }
      }, {
        title: 'JTP',
        key: 'jtp',
        render: (value, row, idx) => {
          if (row.jtp !== null) {
            return <div key={idx}>{row.jtp.apellido + ', ' + row.jtp.nombre}</div>
          }
          return <div></div>
        }
      }, {
        title: 'Cantidad de Inscriptos',
        dataIndex: 'cantidadDeInscriptos',
        key: 'cantidadAlumno',
        render: (value, row, idx) => {
          return row.cantidadInscriptos
        }

      }, {
        title: 'Ayudantes de Primera',
        dataIndex: 'ayudantesDePrimera',
        key: 'ayudantesDePrimera'
      }, {
        title: 'Ayudantes de Segunda',
        dataIndex: 'ayudantesDeSegunda',
        key: 'ayudantesDeSegunda'
      }, {
        title: 'Alumnos',
        render: (value, row, idx) => {
          console.log('row.inscriptos', row);
          return <div><Button
            onClick={() => {
              const columns = [
                {
                  title: 'Padrón',
                  index: 'padron',
                  dataIndex: 'alumno.legajo',
                  render: (value, row, idx) => {
                    return <div style={{ padding: '6px' }}>{row.alumno.legajo}</div>
                  }
                }, {
                  title: 'Nombre y Apellido',
                  index: 'nombre',
                  render: (value, row, index) => {
                    return <div> {row.alumno.apellido},{row.alumno.nombre}</div>
                  }
                }, {
                  title: 'Prioridad',
                  index: 'prioridad',
                  dataIndex: 'alumno.prioridad'
                }, {
                  title: 'Observaciones',
                  index: 'siEsCondicional',
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
                width: '1500px'
              })
            }}
          >
            Ver
          </Button>
            <Button
              style={{ marginLeft: '10px' }}
              onClick={() => {
                console.log(row);
                TeacherService.downloadCourseInformation(row._id).then((data) => {
                  console.log('data', data.data);
                  fileDownload(data.data, `${row.materia.codigo}-${row.comision}.csv`)
                })
              }}
            >
              Descargar
            </Button>
          </div>
        }
      }
    ];



    return <Table
      dataSource={this.props.data}
      columns={columns}
      rowKey={record => record.comision}
      expandedRowRender={this.expandedRowRender}
      pagination={false}
      locale={{ emptyText: this.state.tableMessage }}
    />
  }
}

export default MyCourses;

