import React, {Component} from 'react';
import {Table, Button, Modal, message} from 'antd';
import * as AdminService from './service/AdminService'

/*
const dataSource = [
    {
        _id: "5be6d493fc5a1c0cdd40b068",
        cuatrimestre: 2,
        anio: 2018,
        inscripcionCurso: {
            inicio: '2018-08-10T03:00:00.877Z',
            fin: '2018-08-15T03:00:00.877Z'
        },
        desinscripcionCurso: {
            inicio: '2018-08-17T03:00:00.877Z',
            fin: '2018-08-22T03:00:00.877Z'
        },
        cursada: {
            inicio: '2018-08-22T03:00:00.877Z',
            fin: '2018-12-03T03:00:00.877Z'
        },
        consultaPrioridad: {
            inicio: '2018-08-07T03:00:00.877Z',
            fin: '2018-12-03T03:00:00.877Z'
        }
    },
    {
        _id: "5be6d493fc5a1c0cdd40b069",
        cuatrimestre: 1,
        anio: 2018,
        inscripcionCurso: {
            inicio: '2018-02-10T03:00:00.877Z',
            fin: '2018-02-15T03:00:00.877Z'
        },
        desinscripcionCurso: {
            inicio: '2018-02-17T03:00:00.877Z',
            fin: '2018-02-22T03:00:00.877Z'
        },
        cursada: {
            inicio: '2018-02-22T03:00:00.877Z',
            fin: '2018-07-03T03:00:00.877Z'
        },
        consultaPrioridad: {
            inicio: '2018-02-07T03:00:00.877Z',
            fin: '2018-07-03T03:00:00.877Z'
        }
    },
    {
        _id: "5be6d493fc5a1c0cdd40b070",
        cuatrimestre: 1,
        anio: 2016,
        inscripcionCurso: {
            inicio: '2016-02-10T03:00:00.877Z',
            fin: '2016-02-15T03:00:00.877Z'
        },
        desinscripcionCurso: {
            inicio: '2016-02-17T03:00:00.877Z',
            fin: '2016-02-22T03:00:00.877Z'
        },
        cursada: {
            inicio: '2016-02-22T03:00:00.877Z',
            fin: '2016-07-03T03:00:00.877Z'
        },
        consultaPrioridad: {
            inicio: '2016-02-07T03:00:00.877Z',
            fin: '2016-07-03T03:00:00.877Z'
        }
    },
    {
        _id: "5be6d493fc5a1c0cdd40b071",
        cuatrimestre: 1,
        anio: 2015,
        inscripcionCurso: {
            inicio: '2015-02-10T03:00:00.877Z',
            fin: '2015-02-15T03:00:00.877Z'
        },
        desinscripcionCurso: {
            inicio: '2015-02-17T03:00:00.877Z',
            fin: '2015-02-22T03:00:00.877Z'
        },
        cursada: {
            inicio: '2015-02-22T03:00:00.877Z',
            fin: '2015-07-03T03:00:00.877Z'
        },
        consultaPrioridad: {
            inicio: '2015-02-07T03:00:00.877Z',
            fin: '2015-07-03T03:00:00.877Z'
        }
    }
];
*/

function Transformar(date) {
    var month = date.substring(5, 7);
    var day = date.substring(8, 10);
    var monthLabel;
    switch (month) {
        case "01":
            monthLabel = "Ene";
            break;
        case "02":
            monthLabel = "Feb";
            break;
        case "03":
            monthLabel = "Mar";
            break;
        case "04":
            monthLabel = "Abr";
            break;
        case "05":
            monthLabel = "May";
            break;
        case "06":
            monthLabel = "Jun";
            break;
        case "07":
            monthLabel = "Jul";
            break;
        case "08":
            monthLabel = "Ago";
            break;
        case "09":
            monthLabel = "Sep";
            break;
        case "10":
            monthLabel = "Oct";
            break;
        case "11":
            monthLabel = "Nov";
            break;
        default:
            monthLabel = "Dic";
    }

    return day + '-' + monthLabel;
}

function MostrarRango(rango) {
    return Transformar(rango.inicio) + '  a  ' + Transformar(rango.fin)
}

function MostrarCuatrimestre(id) {
    var cuatr
    switch(id) {
        case 1:
            cuatr = "1°";
            break;
        case 2:
            cuatr = "2°";
            break;
        default:
            cuatr = "Verano";
       }
    
    return cuatr
}

class PeriodTable extends Component {

    deleteRecord = (period) => {
        console.log('deletePeriod');
        AdminService.deletePeriod(period).then((response) => {
            console.log('Period deleted', response);
            message.success('Periodo eliminado');
            this.props.handleOk();
        }).catch((e) => {
            console.log('Period delete - failed');
            console.log('Period delete - error', e);
            console.log('Period delete - response', e.response);
            console.log('Error:', e.response.data.error.message);
        
            //display error
            message.error(e.response.data.error.message);
        
        });
    }

    showWarningModal = (row) => {
        let self = this
        Modal.confirm({
            title: 'Eliminar período ' + row.anio + ' - ' + row.cuatrimestre + '° Cuatrimestre',
            content: '¿Está seguro que desea eliminar este período? ',
            okText:'Si',
            onOk(){ 
                self.deleteRecord(row);
            },
            cancelText:'Cancelar'
        });
    }

    render(){

        //var { setEditPeriodModalVisible } = this.props;

        const columns = [{
            title: 'Cuatrimestre',
            key: 'cuatrimestre',
            render: (value, row, idx) => {
                return <div key={idx}>
                    {MostrarCuatrimestre(row.cuatrimestre)}
                    </div>
            }
        }, {
            title: 'Año',
            dataIndex: 'anio',
            key: 'anio',
        }, {
            title: 'Inscripción',
            key: 'inscripcionCurso',
            render: (value, row, idx) => {
                return <div key={idx}>
                    {MostrarRango(row.inscripcionCurso)}
                </div>
            }
        }, {
            title: 'Desinscripción',
            key: 'desinscripcionCurso',
            render: (value, row, idx) => {
                return <div key={idx}>
                    {MostrarRango(row.desinscripcionCurso)}
                </div>
            }
        }, {
            title: 'Cursada',
            key: 'cursada',
            render: (value, row, idx) => {
                return <div key={idx}>
                    {MostrarRango(row.cursada)}
                </div>
            }
        }, {
            title: 'Consulta Prioridad',
            key: 'consultaPrioridad',
            render: (value, row, idx) => {
                return <div key={idx}>
                    {MostrarRango(row.consultaPrioridad)}
                </div>
            }
        }, {
            title: 'Acciones',
            dataIndex: 'acciones',
            key: 'acciones',
            render: (value, row, idx) => {
            return <div> <Button.Group>
                <Button
                    disabled={row.anio <= 2018 && row.cuatrimestre <= 2}
                    type='primary'
                    icon='edit'
                    onClick={
                        () => { 
                            this.props.onEdit();
                            this.props.setIndexToEdit(idx);
                        }
                    }
                >
                Editar
                </Button>
                <Button 
                    disabled={row.anio <= 2018 && row.cuatrimestre <= 2}
                    type='primary'
                    icon='delete'
                    onClick={() => this.showWarningModal(row)}
                >
                    Eliminar
                </Button>
            </Button.Group>
            

            
            </div>
            }
        }];

        return <div styles={{margin: '50', padding: '50'}}>
                <h1 styles={{margin: '50', padding: '50'}}>Períodos</h1>
                <Table 
                   dataSource={this.props.dataSource} 
                   columns={columns} 
                   rowKey={record => record._id} 
                   size="small"
                />
               </div>
  }
}

export default PeriodTable;