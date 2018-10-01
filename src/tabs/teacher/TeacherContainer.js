import React,{Component} from 'react';
import { Tabs ,Layout,Menu,Icon,Select,Row,Col,Button} from 'antd';
import MyCourses from './MyCourses'
import * as TeacherService from './service/TeacherService'
import logo from '../../resource/logo.png'
import ConditionalModal from './components/ConditionalModal'

const TabPane = Tabs.TabPane;
const Option = Select.Option;
const ButtonGroup = Button.Group;



const {Content } = Layout;

class TeacherContainer extends Component {

  state={
    teacherName:'teacher name',
    nombreMaterias:[],
    allCourses:[],
    courseToShow:[],
    disableConditionalStudentButton:true,
    conditionalModal:false,
    conditionalStudents:[],
    asignatureSelected : ''
  }
  



  setModal = (value) => {
    this.setState({conditionalModal:value})
  }

  callback = (key) => {
    console.log(key);
  }
  
  getTeacherName = () => {
    const token = localStorage.getItem('token');
    TeacherService.getTeacherDataByToken(token).then((response)=>{
      console.log('response',response);
      const teacherData = response.data.data.docente;
      this.setState({teacherName:teacherData.apellido+','+teacherData.nombre})
    })
  }

  getAsignatureNames = () => {
    console.log('TeacherContainer - getAsignaturesName');
    return TeacherService.getAsignatures().then((response)=>{
      const asignatureNames = response.data.data.cursos.map((course)=>course.materia.nombre);
      this.setState({nombreMaterias:asignatureNames})
      console.log('TeacherContainer - courses',response.data.data.cursos);
      response.data.data.cursos.forEach(course => {
         TeacherService.getMoreInformationFromCourseById(course._id).then((response)=>{
           console.log('response,obtener infor curso',response.data.data);
           
           course['regulares'] = response.data.data.regulares
           course['condicionales'] = response.data.data.condicionales
           this.setState({conditionalStudents:response.data.data.condicionales})
        })
      });
      console.log('TeacherContainers - allCursos',response.data.data.cursos[0]);
      this.setState({allCourses:response.data.data.cursos})
    })
  }

  getAsignaturesNamesOption = () => {
    return this.state.nombreMaterias.map((name,idx)=>(<Option key={idx} value={name}> {name} </Option>) )
  }


  setCoursesToShow = () => {
    console.log('TeacherContainer - setCoursesToShow');
    const courseToShow = this.state.allCourses.filter((course) => course.materia.nombre === this.state.asignatureSelected)
    console.log('courseToShow',courseToShow);
    this.setState({courseToShow,disableConditionalStudentButton:false})
  }
  
  getNumerosDeCursos = () => {
    console.log('getNumerosDeCursos',this.state.courseToShow);
    return this.state.courseToShow.map((course)=>{return {
      'numero':course.comision,
      'id':course._id
    }})
  }
  componentDidMount(){
    this.getTeacherName()
    this.getAsignatureNames();
  }

  render(){
    return (
        <Layout>
          <div style={{backgroundColor:'#404040'}}>
          <Row>
            <Col span={1}>
            Logo
            </Col>
            <Col span={19}>
            <Menu
            theme="dark"
             mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' ,backgroundColor:'#404040'}}
          >
            <Menu.Item key="1">
              <Icon type="database" />
              Mis Cursos
            </Menu.Item>
            <Menu.Item key="2">Otra Opcion</Menu.Item>
          </Menu></Col>
            <Col span={4}>
              <ButtonGroup style={{padding:'16px'}}>
                <Button style={{cursor:'text'}}>
                  <Icon type="user" theme="outlined" />
                  {this.state.teacherName}
                </Button>
                <Button
                  onClick={()=> {localStorage.removeItem('rol');localStorage.removeItem('token');this.props.update()}}
                >
                <Icon type="logout" theme="outlined" />
                  Salir
                </Button>
            </ButtonGroup>
            </Col>
           </Row>
          </div>
          <Layout>
            <Content style={{backgroundColor:'white'}}>
            <Row type="flex" justify="space-around" align="middle">
              <div style={{margin:'25px'}}>
                <Select
                  placeholder="Selecciona una materia"
                  style={{width:'300px'}}
                  onSelect={(value)=>{
                    this.setState({asignatureSelected:value},this.setCoursesToShow)
                  }
                }
                >
                  {this.getAsignaturesNamesOption()}
                </Select>

              </div>
            </Row>
            <Row type="flex" justify="end">
            <Button
            disabled={this.state.disableConditionalStudentButton}
            style={{margin:'20px'}}
            onClick={()=>{
              this.setState({conditionalModal:true})
            }}
            >
              Inscribir alumno condicional
            </Button>
            </Row>
              <MyCourses
                data={this.state.courseToShow}
              />
              <ConditionalModal
              visible={this.state.conditionalModal}
              show={this.setModal}
              data={this.state.conditionalStudents}
              courses={this.getNumerosDeCursos()}
              update = {this.getAsignatureNames}
              updateCourseToShow={this.setCoursesToShow}
            />
            </Content>
          </Layout>
        </Layout>
    )
  }
}

export default TeacherContainer;