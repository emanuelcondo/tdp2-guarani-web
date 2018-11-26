import React, { Component } from 'react'
import { Modal, message, Input, Button, Table, Divider  } from 'antd';
import CollectionCreateForm from './FinalForm'
import * as TeacherService from '../service/TeacherService'


    

export default class FinalActModal extends Component {

    state = {
        suma : 0,
        visible : false,
    }

    handleOk = () => {

        let inconsistenciaDeNotas = ""

        this.props.notasFinal.registros.forEach( 
            registro => {
                if (registro.notaCierre != null && registro.notaExamen == null) {
                    inconsistenciaDeNotas += "El alumno "+registro.alumno+" tiene nota de cierre pero no tiene nota de examen\n";                    
                }
                if (registro.notaCierre == null && registro.notaExamen != null && registro.notaExamen >= 4) {
                    inconsistenciaDeNotas += "El alumno "+registro.alumno+" tiene nota examen >=4 pero no se le ha asignado nota de cierre\n";                    
                }
                if (registro.notaCierre != null && registro.notaCierre >= 4 && registro.notaExamen != null && registro.notaExamen < 4) {
                    inconsistenciaDeNotas += "El alumno "+registro.alumno+" tiene nota de cierre >=4 pero nota de examen < 4\n";                    
                }
            }
        )

        if (inconsistenciaDeNotas != "") {
            return Modal.error({
                title: 'Incosistencia de notas',
                content: <p style={{whiteSpace: "pre-line"}}>{inconsistenciaDeNotas}</p>,
                width: "50%"
            });
        }
        else {
    
            let sumatoria = this.props.notasFinal.registros.reduce( 
                (acum, val) => {
                    let nota = parseInt(val.notaCierre)
                    if (nota !== nota) return acum;
                    return acum + nota;
                }, 0
            )
            if (sumatoria !== sumatoria) sumatoria = 0;

            if (sumatoria !== this.state.suma) {
                return Modal.error({
                    title: 'Suma de seguridad incorrecta',
                    content: 'Por favor verifique que las notas de cierre ingresadas den como resultado de su suma el valor de la suma de seguridad',
                });
            }
            else {
                Modal.confirm({
                    title: 'Cargar notas de final',
                    okText: "Si",
                    content: 'Una vez cargadas las notas del final estas no podran modificarse ni se podrán agregar notas nuevas. Esta seguro que desea continuar?  ',
                    onOk: this.generarActa,
                    cancelText: "No",
                    onCancel: () => { },
                })
            }
        }
    }

    componentWillReceiveProps(props) {
        this.setState( {acta: props.acta, visible:props.visible} );
    }

    generarActa = () => {
        TeacherService.gradeExam(this.props.finalId, this.props.notasFinal).then(
            (response) => {
                console.log("OK", response)
                message.success('Se han cargado correctamente las notas al sistema bajo el acta '+response.data.data.acta.codigo);
                this.setState( {acta : response.data.data.acta.codigo } )
            }).catch((e) => {
                console.log("ERROR", e)
                message.error('No se puedieron cargar las notas al sistema')
            }
        )
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

    onChangeNotaFinal = (row) => (event) => {
        let result = this.props.notasFinal;
        let nota = parseInt(event.target.value);
        let elem = result.registros.find( 
            (element) => {
                return element.alumno == row.alumno.legajo;
            } 
        )
        if (elem != null) {
            elem.notaExamen = nota;
            if (nota !== nota) delete elem.notaExamen
        }
        else {
            result.registros.push( {alumno : row.alumno.legajo, notaExamen : nota} )
        }        
    }

    onChangeNotaCierre = (row) => (event) => {
        let result = this.props.notasFinal;
        let nota = parseInt(event.target.value);
        let elem = result.registros.find( 
            (element) => {
                return element.alumno == row.alumno.legajo;
            } 
        )
        if (elem != null) {
            elem.notaCierre = nota;
            if (nota !== nota) delete elem.notaCierre
        }
        else {
            result.registros.push( {alumno : row.alumno.legajo, notaCierre : nota} )
        }
    }

    onChangeSumaSeguridad = (event) => {
        let sum = parseInt(event.target.value);
        if (sum !== sum) sum = 0;
        this.setState({suma : sum});
    }

  render() {

    let sum = <div></div>
    if (this.state.acta == null) sum = <div>
    <Divider>Suma de seguridad</Divider>
    <div align="Right"><Input type="number" min={0} onChange={this.onChangeSumaSeguridad} /></div>
    </div>

    let titulo = "Inscriptos"
    if (this.state.acta != null) titulo += "- Acta " + this.state.acta;

    const columns = [{
        title: 'Padrón',
        dataIndex: 'alumno.legajo',
        key: 'alumno.legajo',
    }, {
        title: 'Nombre',
        dataIndex: 'alumno.nombre',
        key: 'alumno.nombre',
    }, {
        title: 'Apellido',
        dataIndex: 'alumno.apellido',
        key: 'alumno.apellido',
    }, {
        title: 'Condicion',
        dataIndex: 'condicion',
        key: 'condicion',
    }, {
        title: 'Oportunidad',
        dataIndex: 'oportunidad',
        key: 'oportunidad',
        align: 'center',
    }, {
        title: 'Nota de Cursada',
        dataIndex: 'notaCursada',
        key: 'notaCursada',
        align: 'center',
    }, {
        title: 'Nota de Examen',
        dataIndex: 'notaExamen',
        key: 'notaExamen',
        align: 'center',
        render: (text, record)  => {
            if (this.state.acta != null || record.notaExamen != null) {
                return record.notaExamen;
            }
            else {
                return <Input type="number" min={2} max={10} style={{ width: '30%' }} onChange={this.onChangeNotaFinal(record)}/>
            }
        },
    }, {
        title: 'Nota de Cierre',
        dataIndex: 'notaCierre',
        key: 'notaCierre',
        align: 'center',
        render: (text, record) => {
            if (this.state.acta != null || record.notaCierre != null) {
                return record.notaCierre;
            }
            else {
                return <Input type="number" min={2} max={10} style={{ width: '30%' }} onChange={this.onChangeNotaCierre(record)}/>
            }
        },
    }];
   
    return <Modal
      title={titulo}
      width="90%"
      visible={this.state.visible}
      onOk={this.handleOk}
      onCancel={this.props.handleCancel}
      destroyOnClose="true"
      okText="Guardar"
      cancelText="Cerrar"
      okButtonProps={{ disabled : (this.state.acta != null) }}
    >
    <div>
        <Table 
            rowKey="_id" 
            dataSource={this.props.inscriptosAFinal} 
            columns={columns} 
            style={{ width: '100%' }} 
            locale={{ emptyText: 'No hay ningún inscripto', }}
            pagination={false} />
    </div>
    {sum}

    </Modal >
  }
}