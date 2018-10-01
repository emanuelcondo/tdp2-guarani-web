import React,{Component} from 'react'
import {Modal,Table,Button,Select,message} from 'antd'
import * as TeacherService from '../service/TeacherService'


const Option = Select.Option;

export default class ConditionalModal extends Component{

  state={
    modalInscripcionAlumnoCondicional:false,
    studentName:'',
    idAlumno:'',
    idCourse:'',
    confirmLoading:false
  }

  handleOk = (e) => {
    console.log(e);
    this.props.show(false)
  }

  handleCancel = (e) => {
    console.log(e);
    this.props.show(false)
  }


  handleCancelConditional= (e) => {
    console.log(e);
    this.setState({modalInscripcionAlumnoCondicional:false})
  }

  handleOkConditional = (e) => {
    console.log(e);
    this.setState({confirmLoading:true})
    TeacherService.addConditionalStudent(this.state.idCourse,this.state.idAlumno).then(()=>{
      this.props.update()
      message.success('El alumno fue agregado de manera correcta')
      this.setState({confirmLoading:false})
      setTimeout(()=>{this.setState({modalInscripcionAlumnoCondicional:false})},1000);
    }).catch(()=>{

    })
    

  }

  orderByPrioridad = () => {
    console.log('condicionales',this.props.data);
    return this.props.data.sort((a,b)=>{
      console.log('condicionales row a',a.alumno.prioridad);
      return a.alumno.prioridad > b.alumno.prioridad
    })
  }

  render(){
    const columns = [
      {
        title:'Padron',
        index:'padron',
        dataIndex:'alumno.legajo'
      },
      {
        title:'Nombre',
        index:'nombre',
        dataIndex:'nombre',
        render:(value,row,index)=>{
          return <div> {row.alumno.apellido},{row.alumno.nombre}</div>
        }
      },{
        title:'Prioridad',
        index:'prioridad',
        dataIndex:'alumno.prioridad'
      },
      {
        title:'Accion',
        index:'accion',
        render:(value,row,idx)=>{
          const name = row.alumno.apellido+','+row.alumno.nombre
          return <Button 
          key={idx}
          onClick={()=>{
            this.setState({modalInscripcionAlumnoCondicional:true,studentName:name,idAlumno:row._id})}
          }
          >
            Inscribir alumno
          </Button>
        }
      }
  ]


    console.log('Numero de cursos',this.props.courses);
    

  
    return (
        <div>
        <Modal
          title="Condicionales"
          visible={this.props.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width='700px'
        >
        <Table
          columns={columns}
          dataSource={this.orderByPrioridad()}
          pagination={false}
          rowKey={(row)=>{row.alumno.padron}}
        />
        </Modal>

        <Modal
          title="Inscripción alumno condicional"
          visible={this.state.modalInscripcionAlumnoCondicional}
          onOk={this.handleOkConditional}
          onCancel={this.handleCancelConditional}
          confirmLoading={this.state.confirmLoading}
          destroyOnClose={true}
        >
        <div>Usted está inscribiendo al alumno <b>{this.state.studentName}</b></div>
        <Select
          placeholder="Seleccione el curso"
          style={{ width: 200 ,margin:10}}
          onSelect={
            (value) => {
              console.log('id del curso elegido',value);
              this.setState({idCourse:value})
              console.log('id del alumno',this.state.idAlumno);
              
            }
          }
        >
        {this.props.courses.map((course)=>{return <Option value={course.id}>000{course.numero}</Option>})}
        </Select>
        </Modal>
        </div>
        )

  }
}