import React, { Component } from 'react'
import CanvasJSReact from '../../canvasjs.react'
import { Button, Modal, Row, Col, message } from 'antd'

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

var divStyle = {
	padding: "20px",
	margin: "20px"
  };

const estadisticas = [
	{
		_id: "5ba706661dabf8854f11de22",
		codigo: "75.07",
		nombre: "Algoritmos y Programación III",
		puntos: 5,
		comentarios: [
			"Excelente curso..",
			"Fontela CRACK!!!"
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
	}
]

class SurveyGraph extends Component {
	
	constructor (props){
		super(props);
	  
		this.state = {
			modalVisible: false,
		  };
	  
	  }

	  setModalInvisible = (e) => {
		this.setState({modalVisible: false});
	  }

	render() {
		
		var misDataPoints = [];
		var index;
		for (index = 0; index < estadisticas.length; ++index) {
			var dataPoint = {};
			dataPoint["y"] = estadisticas[index].puntos;
			dataPoint["label"] = estadisticas[index].nombre;
			misDataPoints.push(dataPoint);
			//console.log(estadisticas[index]);
		}

		const self = this
		const options = {
			animationEnabled: true,
			theme: "light2",
			height: 560,
			title:{
				text: "Materias más populares de la facultad"
			},
			axisX: {
				//title: "Materia",
				reversed: true,
				height: 15,
				labelFontSize: 15,
				interval: 1
			},
			axisY: {
				//title: "Puntajes asignados",
				//labelFormatter: this.addSymbols
			},
			data: [{
				click: function(e){
					//alert(  e.dataSeries.type+ ", dataPoint { x:" + e.dataPoint.x + ", y: "+ e.dataPoint.y + " }" );
					//message.error('Hola este vale ' + e.dataPoint.y);
					self.setState({modalVisible: true});
				},
				type: "bar",
				dataPoints: misDataPoints
				/*dataPoints: [
					{ y:  98.6, label: "Psicología general" },
					{ y:  94.2, label: "Taller de programación I" },
					{ y:  89.1, label: "Taller de desarrollo de proyectos II" },
					{ y:  60.4, label: "Análisis numérico" },
					{ y:  46.0, label: "Algoritmos y programación II" },
					{ y:  45.3, label: "Física III" },
					{ y:  32.8, label: "Física II" },
					{ y:  30.0, label: "Física I" },
					{ y:  28.0, label: "Química" },
					{ y:  25.3, label: "Física III" },
					{ y:  25.3, label: "Física IIIh" },
					{ y:  25.2, label: "Física IIIsfdg" },
					{ y:  22.3, label: "Física IIIsdf" },
					{ y:  22.3, label: "Física IIIsfg" },
					{ y:  22.3, label: "Física IIIsdfsdf" },
					{ y:  20.7, label: "Base de datos" }
				]*/
			}]
		}
		
		return (
		<div style={divStyle} >

			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}

			<Modal
			visible={self.state.modalVisible}
			onOk={self.setModalInvisible}
			onCancel={self.setModalInvisible}
			>
				<div>
					<p>Some contents...</p>
					<p>Some contents...</p>
					<p>Some contents...</p>
				</div>
			</Modal>
		</div>
		);
	}

	addSymbols(e){
		var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
		//if(order > suffixes.length - 1)
		//	order = suffixes.length - 1;
		var suffix = "%";
		return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
	}
}

export default SurveyGraph;