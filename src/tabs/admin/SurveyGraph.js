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
		puntos: 4.89,
		comentarios: [
			"Excelente curso... Villagra, excelente profesor.",
			"La cursé con Villagra, un curso muy dinámico. Lo recomiendo."
		]
	},
	{
		_id: "5ba708051dabf8854f11de5d",
		codigo: "75.08",
		nombre: "Sistemas Operativos",
		puntos: 4.71,
		comentarios: [
			"La cursé con Mendez porque ya lo conocía y porque el tipo sabe mucho.",
			"Mendez crack!!!."
		]
	},
	{
		_id: "5ba70a2e1dabf8854f11deac",
		codigo: "75.46",
		nombre: "Administración y Control de Proyectos Informáticos II",
		puntos: 4.53,
		comentarios: [
			"Fer es un genio... la materia es interesante y los contenidos son interesantes."
		]
	},
	{
		_id: "5ba70a2e1dabf8854f11dea8",
		codigo: "75.44",
		nombre: "Administración y Control de Proyectos Informáticos I",
		puntos: 4.26,
		comentarios: [
			"Fontela no me para de sorprender.",
			"Fontela está en todos lados. Estaría bueno que esté en algunas materias como Análsis Matemático y Física. Un genio total."
		]
	},
	{
		_id: "5ba708b61dabf8854f11de78",
		codigo: "75.52",
		nombre: "Taller de Programación II",
		puntos: 4.05,
		comentarios: [
			"Esta materia tiene la posta.",
			"Nada que ver con taller I. Acá se aprende posta."
		]
	},
	{
		_id: "5ba70a2e1dabf8854f11deaa",
		codigo: "75.45",
		nombre: "Taller de Desarrollo de Proyectos I",
		puntos: 3.54,
		comentarios: [
			"Excelente materia para aprender a ver un producto"
		]
	},
	{
		_id: "5ba70ab61dabf8854f11dec6",
		codigo: "75.47",
		nombre: "Taller de Desarrollo de Proyectos II",
		puntos: 3.33,
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
		puntos: 3.07,
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
		puntos: 2.78,
		comentarios: [
			"Excelente curso.."
		]
	},
	{
		_id: "5ba7076a1dabf8854f11de48",
		codigo: "75.42",
		nombre: "Taller de Programación I",
		puntos: 2.51,
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
		puntos: 1.77,
		comentarios: [
			"Creo que se le podría sacar más provecho a la materia.",
			"Sólo fui a las fechas de exámenes y la aprobé."
		]
	},
	{
		_id: "5ba6cf168b7931ac3e21de27",
		codigo: "75.40",
		nombre: "Algoritmos y Programación I",
		puntos: 1.52,
		comentarios: [
			"Para alguien que recién empieza con la programación, esto es chino.",
			"Usamos Pascal para programar.....cualquiera"
		]
	},
	{
		_id: "5ba708b61dabf8854f11de74",
		codigo: "75.15",
		nombre: "Base de Datos",
		puntos: 1.28,
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
		puntos: 1.23,
		comentarios: []
	},
	{
		_id: "5ba708b61dabf8854f11de76",
		codigo: "75.61",
		nombre: "Taller de Programación III",
		puntos: 1.06,
		comentarios: [
			"Podrían actualizar los contenidos???."
		]
	},
	{
		_id: "5ba708b61dabf8854f11de77",
		codigo: "75.74",
		nombre: "Sistemas Distribuídos I",
		puntos: 0.76,
		comentarios: [
			"Podrían actualizar los contenidos???."
		]
	},
	{
		_id: "5ba708b61dabf8854f11de76",
		codigo: "75.66",
		nombre: "Manufactura Integrada por Computadora (CIM) II",
		puntos: 0.46,
		comentarios: [
			"Podrían actualizar los contenidos???."
		]
	}
	
]

function SelectColor(points) {

	var color
	if (points >= 9.5) {
		color = "009955"
	} else if (points >= 9.0) {
		color = "229900"
	} else if (points >= 8.5) {
		color = "44B300"
	} else if (points >= 8.0) {
		color = "66CC00"
	} else if (points >= 7.5) {
		color = "88FF00"
	} else if (points >= 7.0) {
		color = "AAFF00"
	} else if (points >= 6.5) {
		color = "FFFF00"
	} else if (points >= 6.0) {
		color = "FFEE00"
	} else if (points >= 5.5) {
		color = "FFDD00"
	} else if (points >= 5.0) {
		color = "FFCC00"
	} else if (points >= 4.5) {
		color = "FFBB00"
	} else if (points >= 4.0) {
		color = "FFAA00"
	} else if (points >= 3.5) {
		color = "FF5500"
	} else if (points >= 3.0) {
		color = "FF4400"
	} else if (points >= 2.5) {
		color = "FF3300"
	} else if (points >= 2.0) {
		color = "FF2200"
	} else if (points >= 1.5) {
		color = "FF1100"
	} else {
		color = "FF0000"
	}
	
	return "#" + color
}

function Abbreviate(name) {
	var newName = name.replace("Administración", "Adm.");
	newName = newName.replace("Introducción", "Intr.");
	newName = newName.replace("Control", "Cont.");
	newName = newName.replace("Proyectos", "Proy.");
	newName = newName.replace("Sistemas", "Sist.");
	newName = newName.replace("Taller", "T.");
	newName = newName.replace("Informáticos", "Inf.");
	newName = newName.replace("Técnicas", "Tcas.");
	
	return newName;
}

class SurveyGraph extends Component {
	
	constructor (props) {
		super(props);
		
		this.state = {
			chartTitle: "",
			chartSubtitle: "",
			anio: null,
			cuatrimestre: null,
			depto: null,
			drawerVisible: false,
			showLoading: true,
			asignatureSelected: "",
			departmentSelected: "",
			datasource: [],
			encuestas: null,
			assignatureData: []
		};
		
		this.updateChart = this.updateChart.bind(this);
	
	}

	setDrawerInvisible = (e) => {
		this.setState({drawerVisible: false});
	}

	componentDidMount() {
		console.log('componentDidMount');
		if (this.state.showLoading) {
			console.log('va a actualizar componentDidMount');
			//this.getDepartmentInformation();
			this.updateDepartmentInformation(this.props);
		}
	}

	componentWillReceiveProps(nextProps) {
		console.log('componentWillReceiveProps: ',nextProps);
		var actualAnio = this.props.anio;
		var actualCuatri = this.props.cuatrimestre;
		var actualDepto = this.props.depto;
		var newAnio = nextProps.anio;
		var newCuatri = nextProps.cuatrimestre;
		var newDepto = nextProps.depto;
		if (newAnio !== actualAnio || newCuatri !== actualCuatri || actualDepto !== newDepto) {
			this.setState({showLoading: true});
			console.log('va a actualizar componentWillReceiveProps');
			
			this.updateDepartmentInformation(nextProps);
		}
	}

	updateDepartmentInformation = (nextProps) => {
		this.setState({
			anio: nextProps.anio,
			cuatrimestre: nextProps.cuatrimestre,
			depto: nextProps.depto
		}, 
		() => {
			console.log('SurveyGraph NEW STATE: ', this.state);
			this.getDepartmentInformation();
		});
	}

	getDepartmentInformation = () => {
		
		var anio = this.state.anio;
		var cuatrimestre = this.state.cuatrimestre;
		var depto = this.state.depto;
		console.log('getDepartmentInformation ', anio, cuatrimestre, depto);
		AdminService.getSurveys(anio, cuatrimestre, depto).then((response) => {
			console.log('Informacion del departamento obtenida', response);
			const encuestasRecibidas = response.data.data.encuestas;
			this.setState({encuestas: encuestasRecibidas});
			console.log('Encuestas: ', encuestasRecibidas);
			if (encuestasRecibidas.materias.length == 0) {
				this.setState({
					chartTitle: "No hay datos para los parámetros seleccionados",
					chartSubtitle: "Seleccione otro año o cuatrimestre"
				});
			} else {
				this.setState({
					chartTitle: "Opinión general de las materias",
					chartSubtitle: "Haga clic sobre la barra de la materia para ver los comentarios de los alumnos."
				});
			}
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
	
	getDataPoints = () => {
		const self = this;
		const datasource = self.state.datasource;
		//const datasource = estadisticas; // => para pruebas mock
		var dataPoints = [];
		
		for (let i = 0; i < datasource.length; ++i) {
			var dataPoint = {};
			
			dataPoint["y"] = datasource[i].puntos * 2;
			dataPoint["name"] = datasource[i].codigo;
			dataPoint["color"] = SelectColor(dataPoint["y"]);
			dataPoint["label"] = datasource[i].nombre;
			// armo el comentario para el mousehover
			var n = datasource[i].comentarios.length;
			var comments = "<strong>" + ((n == 0) ? "Sin comentarios</strong>" : n + " comentarios</strong> <small>Clic para visualizar</small>" ) ;
			var assignature = datasource[i].codigo + " - " + Abbreviate(datasource[i].nombre);
			var points = "Puntos: <strong>" + dataPoint["y"] + "</strong>";
			dataPoint["toolTipContent"] = assignature + "</br>" + points + "</br>" + comments;
			dataPoints.push(dataPoint);
		}
		
		return dataPoints;
	}
	
	getOptions = () => {
		const self = this;
		const datasource = self.state.datasource;
		//const datasource = estadisticas; // => para pruebas mock
		
		var misDataPoints = self.getDataPoints();

		const options = {
			animationEnabled: true,
			theme: "light2",
			//height: 560,
			width: 1200,
			title:{
				text: self.state.chartTitle,
				fontSize: 20
			},
			subtitles: [
				{
					text: self.state.chartSubtitle,
					fontSize: 14
				}
			],
			axisX: {
				//title: "Materia",
				reversed: true,
				height: 13,
				
				labelFontSize: 12,
				interval: 1
			},
			axisY: {
				//title: "Puntajes asignados",
				labelFontSize: 12,
				maximum: 10
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
					self.updateChart();
					
				},
				type: "bar",
				dataPoints: misDataPoints

			}]
		};
		
		return options;
	}
	
	updateChart() {
		const self = this;
		this.chart.options.width = 740;
		this.chart.options.subtitles = [];
		this.chart.options.title.fontSize = 16;
		this.chart.options.axisX.labelFontSize = 11;
		//this.chart.options.axisX.height = 10;
		this.chart.options.dataPointWidth = 18;
		
		var misDataPoints = self.getDataPoints();
		for (let i = 0; i < misDataPoints.length; ++i) {
			var s = Abbreviate(misDataPoints[i].label);
			misDataPoints[i].label = s;
		}
		
		this.chart.options.data[0].dataPoints = misDataPoints;
		this.chart.render();
	}

	render() {
		console.log('refrescando grafico');
		const self = this;
		const options = this.getOptions();
		
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
				onRef={ref => this.chart = ref}
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}

			
			<Drawer
				title= {"Comentarios - " + self.state.asignatureSelected}
				visible={self.state.drawerVisible}
				closable={true}
				onClose={self.setDrawerInvisible}
				width={530}
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