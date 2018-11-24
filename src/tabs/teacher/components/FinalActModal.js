import React, { Component } from 'react'
import { Modal, message, Input, Button, Table, Divider  } from 'antd';
import CollectionCreateForm from './FinalForm'
import * as TeacherService from '../service/TeacherService'


    

export default class FinalActModal extends Component {

    state = {
        suma : 0,
    }

    handleOk = () => {

        let sumatoria = this.props.notasFinal.registros.reduce( 
            (acum, val) => {
                return acum + parseInt(val.notaCierre);
            }, 0
        )

        console.log("SUMA", this.state.suma)
        console.log("SUMA", sumatoria)

        if (sumatoria !== this.state.suma) {
            Modal.error({
                title: 'Suma de seguridad incorrecta',
                content: 'Por favor verifique las notas ingresadas',
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

    generarActa = () => {
        TeacherService.gradeExam(this.props.finalId, this.props.notasFinal).then(
        (response) => {
            message.success('Se han cargado correctamente las notas al sistema bajo el acta '+response.data.acta.codigo);
            this.props.hayActa  = true;
        }).catch((e) => {
            message.error('No se puedieron cargar las notas al sistema')
        }
    )
    this.setState({ visible: false });
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
        console.log("E",this.props.notasFinal);
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
        console.log("E",this.props.notasFinal);
    }

    onChangeSumaSeguridad = (event) => {
        this.setState({suma : parseInt(event.target.value)});
    }

  render() {

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
            if (this.props.hayActa || record.notaExamen != null) {
                return record.notaExamen;
            }
            else {
                return <Input type="number" min={0} max={10} style={{ width: '30%' }} onChange={this.onChangeNotaFinal(record)}/>
            }
        },
    }, {
        title: 'Nota de Cierre',
        dataIndex: 'notaCierre',
        key: 'notaCierre',
        align: 'center',
        render: (text, record) => {
            if (this.props.hayActa || record.notaCierre != null) {
                return record.notaCierre;
            }
            else {
                return <Input type="number" min={0} max={10} style={{ width: '30%' }} onChange={this.onChangeNotaCierre(record)}/>
            }
        },
    }];
   
    return <Modal
      title="Inscriptos"
      width="90%"
      visible={this.props.visible}
      onOk={this.handleOk}
      onCancel={this.props.handleCancel}
      destroyOnClose="true"
      okText="Guardar"
      cancelText="Cerrar"
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
    <Divider>Suma de seguridad</Divider>
    <div align="Right"><Input type="number" min={0} onChange={this.onChangeSumaSeguridad} /></div>

    </Modal >
  }
}