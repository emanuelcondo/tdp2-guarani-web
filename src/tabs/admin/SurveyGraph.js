import React, { Component } from 'react'
import CanvasJSReact from '../../canvasjs.react'
import { Drawer, Table, Row, Col, Modal, Spin, message } from 'antd'
import * as AdminService from './service/AdminService'

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

var divStyle = {
	padding: "20px",
	margin: "20px"
  };

const columns = [{
	title: 'Comentario',
  }];

const estadisticas = [
	{
		_id: "5ba706661dabf8854f11de22",
		codigo: "75.07",
		nombre: "Algoritmos y Programación III",
		puntos: 5,
		comentarios: [
			"Excelente curso..",
			"Fontela CRACK!!!",
			"Excelente, probablemente el mejor curso al que asistí en la facu, junto con el de AM3 de Acero. Algunas clases (pocas) donde no se hacía mucho más que comentar diapositivas y presentar algún ejemplo, quizás no me gustaron tanto y me parecía que se entendía mejor directamente leyendo tranquilo el apunte en mi casa. Otra cosa que por momentos me generó problemas fue que quizás algunos algoritmos que se veían en clase, en el apunte estaban explicados de otra forma, o tenía pequeñas diferencias en algunas formulas o selección de parámetros (ej: tf-idf normalizado) y eso a veces me llevaba a generar resultados erróneos en las guías. A veces los notebooks que se veían en clase tardaban unos cuantos días en estar subidos.			",
			"El horario de las clases me parece pésimo.\
			\nMuy estrictos al corregir los \"parciales\", no me parecio que valoren que entiendas los conceptos de ibm mainframe sino que apliques especificamente lo que ellos pensaban que debias hacer en los ejercicios, y siendo que en el examen se programa en papel no me parece que deban ser tan estrictos y hacer tan complicados ese tipo de ejercicios. \
			\nSobre el resto no me quejo, los tps me parecieron accesibles, pero en los parciales a mi parecer le ponen demasiado enfasis a ibm mainframe y lo complican mas de lo que deberian\
			",
			"El horario de las clases me parece pésimo.\
			\nMuy estrictos al corregir los \"parciales\", no me parecio que valoren que entiendas los conceptos de ibm mainframe sino que apliques especificamente lo que ellos pensaban que debias hacer en los ejercicios, y siendo que en el examen se programa en papel no me parece que deban ser tan estrictos y hacer tan complicados ese tipo de ejercicios. \
			\nSobre el resto no me quejo, los tps me parecieron accesibles, pero en los parciales a mi parecer le ponen demasiado enfasis a ibm mainframe y lo complican mas de lo que deberian\
			",
			"El horario de las clases me parece pésimo.\
			\n\nMuy estrictos al corregir los \"parciales\", no me parecio que valoren que entiendas los conceptos de ibm mainframe sino que apliques especificamente lo que ellos pensaban que debias hacer en los ejercicios, y siendo que en el examen se programa en papel no me parece que deban ser tan estrictos y hacer tan complicados ese tipo de ejercicios. \
			\nSobre el resto no me quejo, los tps me parecieron accesibles, pero en los parciales a mi parecer le ponen demasiado enfasis a ibm mainframe y lo complican mas de lo que deberian\
			",
			"La cursé con Villagra, un curso muy dinámico. Lo recomiendo."
		]
	},
	{
		_id: "5ba7076a1dabf8854f11de46",
		codigo: "75.06",
		nombre: "Organización de Datos",
		puntos: 5,
		comentarios: [
			"Una de las mejores materias que cursé hasta ahora.",
			"Luis es un crack. Se nota que el tipo sabe lo que da."
		]
	},
	{
		_id: "5ba708051dabf8854f11de5f",
		codigo: "75.09",
		nombre: "Análisis de la Información",
		puntos: 4.8,
		comentarios: [
			"Excelente curso... Villagra, excelente profesor.",
			"La cursé con Villagra, un curso muy dinámico. Lo recomiendo."
		]
	},
	{
		_id: "5ba708051dabf8854f11de5d",
		codigo: "75.08",
		nombre: "Sistemas Operativos",
		puntos: 4.6,
		comentarios: [
			"La cursé con Mendez porque ya lo conocía y porque el tipo sabe mucho.",
			"Mendez crack!!!."
		]
	},
	{
		_id: "5ba70a2e1dabf8854f11deac",
		codigo: "75.46",
		nombre: "Administración y Control de Proyectos Informáticos II",
		puntos: 4.6,
		comentarios: [
			"Fer es un genio... la materia es interesante y los contenidos son interesantes."
		]
	},
	{
		_id: "5ba70a2e1dabf8854f11dea8",
		codigo: "75.44",
		nombre: "Administración y Control de Proyectos Informáticos I",
		puntos: 4.6,
		comentarios: [
			"Fontela no me para de sorprender.",
			"Fontela está en todos lados. Estaría bueno que esté en algunas materias como Análsis Matemático y Física. Un genio total."
		]
	},
	{
		_id: "5ba708b61dabf8854f11de78",
		codigo: "75.52",
		nombre: "Taller de Programación II",
		puntos: 4.5,
		comentarios: [
			"Esta materia tiene la posta.",
			"Nada que ver con taller I. Acá se aprende posta."
		]
	},
	{
		_id: "5ba70a2e1dabf8854f11deaa",
		codigo: "75.45",
		nombre: "Taller de Desarrollo de Proyectos I",
		puntos: 4.4,
		comentarios: [
			"Excelente materia para aprender a ver un producto"
		]
	},
	{
		_id: "5ba70ab61dabf8854f11dec6",
		codigo: "75.47",
		nombre: "Taller de Desarrollo de Proyectos II",
		puntos: 4.33,
		comentarios: [
			"Nada para agregar. Excelente curso. Saludos para Fontela.",
			"Deberían coordinar un poco mejor la rotación de grupos para ser equitativos con todos los grupos, siempre, semana por medio, nos tocaba irnos últimos. Más allá de eso, excelente curso.",
			"Fontela está en todas. Excelente materia."
		]
	},
	{
		_id: "5ba708b61dabf8854f11de76",
		codigo: "75.43",
		nombre: "Introducción a los Sistemas Distribuidos",
		puntos: 4.07,
		comentarios: [
			"Los temas son complejos pero interesantes.",
			"Las correcciones de los tps son demasiado exigentes.",
			"Podrían cambiar la fecha de la teórica??? No da hacerla un viernes."
		]
	},
	{
		_id: "5ba705601dabf8854f11ddfd",
		codigo: "75.41",
		nombre: "Algoritmos y Programación II",
		puntos: 4,
		comentarios: [
			"Excelente curso.."
		]
	},
	{
		_id: "5ba7076a1dabf8854f11de48",
		codigo: "75.42",
		nombre: "Taller de Programación I",
		puntos: 3.5,
		comentarios: [
			"El curso de veiga es bastante exigente, pero se aprende.",
			"Querés aprobar? Cursala con Azcurra."
		]
	},
	{
		_id: "5ba706661dabf8854f11de24",
		codigo: "75.12",
		nombre: "Análisis Numérico I",
		puntos: 2.2,
		comentarios: [
			"Las clases de Grillo son para dormirse."
		]
	},
	{
		_id: "5ba708b61dabf8854f11de72",
		codigo: "75.10",
		nombre: "Técnicas de Diseño",
		puntos: 2,
		comentarios: [
			"Creo que se le podría sacar más provecho a la materia.",
			"Sólo fui a las fechas de exámenes y la aprobé."
		]
	},
	{
		_id: "5ba6cf168b7931ac3e21de27",
		codigo: "75.40",
		nombre: "Algoritmos y Programación I",
		puntos: 1.8,
		comentarios: [
			"Para alguien que recién empieza con la programación, esto es chino.",
			"Usamos Pascal para programar.....cualquiera"
		]
	},
	{
		_id: "5ba708b61dabf8854f11de74",
		codigo: "75.15",
		nombre: "Base de Datos",
		puntos: 1.53,
		comentarios: [
			"Los temas que se dan están muy desactualizados.",
			"Se ven cosas del año 1986... viejísimo!!!.",
			"Podrían actualizar los contenidos???."
		]
	},
	{
		_id: "5ba708b61dabf8854f11de75",
		codigo: "75.59",
		nombre: "Técnicas de Programación Concurrente I",
		puntos: 1.52,
		comentarios: []
	},
	{
		_id: "5ba708b61dabf8854f11de76",
		codigo: "75.61",
		nombre: "Taller de Programación III",
		puntos: 1.50,
		comentarios: [
			"Podrían actualizar los contenidos???."
		]
	},
	{
		_id: "5ba708b61dabf8854f11de77",
		codigo: "75.74",
		nombre: "Sistemas Distribuídos I",
		puntos: 1.47,
		comentarios: [
			"Podrían actualizar los contenidos???."
		]
	},
	{
		_id: "5ba708b61dabf8854f11de76",
		codigo: "75.66",
		nombre: "Manufactura Integrada por COmputadora (CIM) II",
		puntos: 1.46,
		comentarios: [
			"Podrían actualizar los contenidos???."
		]
	}
	
]

class SurveyGraph extends Component {
	
	constructor (props) {
		super(props);
	  
		this.state = {
			drawerVisible: false,
			showLoading: true,
			asignatureSelected: "",
			departmentSelected: "",
			datasource: [],
			encuestas: null,
			assignatureData: []
		  };
	  
	}

	setDrawerInvisible = (e) => {
		this.setState({drawerVisible: false});
	}

	componentDidMount() {
		this.getDepartmentInformation()
	}

	getDepartmentInformation = () => {
		console.log('getDepartmentInformation');
		AdminService.getSurveys('2018', '2', '75').then((response) => {
		  console.log('Informacion del departamento obtenida', response);
		  const encuestasRecibidas = response.data.data.encuestas;
		  this.setState({encuestas: encuestasRecibidas});
		  console.log('Encuestas: ', encuestasRecibidas);
		  this.setState({datasource: encuestasRecibidas.materias});
		  this.setState({showLoading: false});
		  //this.setState({departmentSelected: deparmentInformation});

		}).catch((e) => {
		  console.log('DepartmentInformation fetch - failed');
		  console.log('DepartmentInformation fetch - error', e);
		  this.setState({showLoading: false});
		  if (e.response == undefined) {
			message.error('El servidor no responde. Intente más tarde.');
		  } else {
			console.log('DepartmentInformation fetch - response', e.response);
			console.log('Error:', e.response.data.error.message);
	  
			//display error
			message.error(e.response.data.error.message);
		  }
		  
		  
		})
	  }

	render() {
		const self = this;
		const datasource = self.state.datasource;
		//const datasource = estadisticas; // => para pruebas mock
		
		var misDataPoints = [];
		var index;
		for (index = 0; index < datasource.length; ++index) {
			var dataPoint = {};
			dataPoint["y"] = datasource[index].puntos;
			dataPoint["name"] = datasource[index].codigo;
			dataPoint["label"] = datasource[index].nombre;
			//dataPoint["toolTipContent"] = "Clic para ver comentarios de " + datasource[index].nombre;
			misDataPoints.push(dataPoint);
			//console.log(datasource[index]);
		}

		const options = {
			animationEnabled: true,
			theme: "light2",
			height: 560,
			title:{
				text: "Materias más populares de la facultad",
				fontSize: 20
			},
			subtitles: [
				{
					text: "Haga clic sobre la barra de la materia para ver los comentarios de los alumnos.",
					fontSize: 14
				}
			],
			axisX: {
				//title: "Materia",
				reversed: true,
				height: 13,
				width: 500,
				labelFontSize: 12,
				interval: 1
			},
			axisY: {
				//title: "Puntajes asignados",
				labelFontSize: 12,
				maximum: 5
			},
			data: [{
				click: function(e){
					//alert(  e.dataSeries.type+ ", dataPoint { x:" + e.dataPoint.x + ", y: "+ e.dataPoint.y + " }" );
					//message.error('Hola este vale ' + e.dataPoint.x);
					self.setState({drawerVisible: true});
					var subject = e.dataPoint.label;
					var code = e.dataPoint.name;
					self.setState({asignatureSelected: code + ' - ' + subject});
					self.setState({assignatureData: datasource[e.dataPoint.x].comentarios});
					
				},
				type: "bar",
				dataPoints: misDataPoints

			}]
		}
		
		return (
		<div style={divStyle} >

			<div>
				<Modal
				visible={this.state.showLoading}
				title={<h2>Cargando estadísticas</h2>}
				footer={[]}
				>
				<div>
				Esta operación puede demorar varios segundos<br /><br />
				<center><Spin size="large" /></center>
				</div>
				</Modal>
			</div>

			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}

			
			<Drawer
				title= {"Comentarios - " + self.state.asignatureSelected}
				visible={self.state.drawerVisible}
				closable={true}
				onClose={self.setDrawerInvisible}
				width={550}
			>
				<Row>
      				<Col span={24}>
						<Table
							style={{ 'table-layout': 'fixed', width: 500, 'white-space': 'pre-line'}}
							dataSource={this.state.assignatureData}
							columns={columns}
							pagination={{pageSize: 5}}
							showHeader={false}
							locale={{ emptyText: "Nadie ha hecho comentarios aún en esta materia" }}
						/>
					</Col>
				</Row>
			</Drawer>
		</div>
		);
	}

}

export default SurveyGraph;