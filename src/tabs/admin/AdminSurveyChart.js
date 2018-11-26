import React, { Component } from 'react';
import { Button, Icon, Row, Col, Popover, Radio, Select } from 'antd';
import SurveyGraph from './SurveyGraph';

const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class AdminSurveyChartRender extends Component {

	getRender = () => {
		console.log('Anio {}, cuatri {}, depto {}', this.props.anio, this.props.cuatrimestre, this.props.depto)
		if (this.props.anio !== null && this.props.cuatrimestre !== null && this.props.depto !== null  ) {
			console.log('Renderizando SurveyGraph');
			return (
				<SurveyGraph 
					anio={this.props.anio}
					cuatrimestre={this.props.cuatrimestre}
					depto={this.props.depto}
				/>
			)
		}
		console.log('Renderizando Popover');
		return (
			
			<div style={{ width: '25px', height: '25px', backgroundColor: 'white', position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, margin: 'auto'}}>
				{/*<Popover
					visible={true}
					content='Seleccione año, cuatrimestre y departamento para visualizar el gráfico'
				>
					<Icon type="bar-chart" width='150em' height='150em' />
				</Popover>*/}
				<h1>Seleccione año, cuatrimestre y departamento para visualizar el gráfico</h1>
			</div>
		)
	}

	render() {
		return this.getRender();
	}
}

class AdminSurveyChart extends Component {
	state = {
		popOverVisible: true,
		anioSelected: null,
		anioToSend: null,
		cuatrimestreSelected: null,
		cuatrimestreToSend: null,
		deptoSelected: null,
		deptoToSend: null
	}
	
	onAnioSelected = (a) => {
		console.log('Año selected: ', a);
		this.setState({
			anioSelected: a,
		//	anioToSend: null
		});
	}
	
	onCuatrimestreChange = (e) => {
		console.log('Cuatrimestre checked: ', e.target.value);
		this.setState({
			cuatrimestreSelected: e.target.value,
		//	cuatrimestreToSend: null
		});
	}
	
	onDeptoSelected = (d) => {
		console.log('Depto selected: ', d);
		this.setState({
			deptoSelected: d,
		//	deptoToSend: null
		});
	}

	onUpdateChart = () => {
		this.setState({
			anioToSend: this.state.anioSelected,
			cuatrimestreToSend: this.state.cuatrimestreSelected,
			deptoToSend: this.state.deptoSelected
		});
	}
	
	render() {
		return (
		<div>
			<Row type="flex" justify="space-around" align="middle">
				<Col span={6}>
					<div style={{ margin: '25px' }}>
						<Select
							placeholder="Selecciona el año"
							style={{ width: '300px' }}
							onSelect={ this.onAnioSelected }
						>
							<Option value='2011'>2011</Option>
							<Option value='2012'>2012</Option>
							<Option value='2013'>2013</Option>
							<Option value='2014'>2014</Option>
							<Option value='2015'>2015</Option>
							<Option value='2016'>2016</Option>
							<Option value='2017'>2017</Option>
							<Option value='2018'>2018</Option>
						</Select>

					</div>
				</Col>
				<Col span={6}>
					<div style={{ margin: '25px' }}>
						<RadioGroup size="large" onChange={this.onCuatrimestreChange} value={this.state.cuatrimestreSelected}>
							<RadioButton value={1}>1° </RadioButton>
							<RadioButton value={2}>2° </RadioButton>
							<RadioButton value={0}>Verano</RadioButton>
						</RadioGroup>
					</div>
				</Col>
				<Col span={6}>
					<div style={{ margin: '25px' }}>
						<Select
							placeholder="Selecciona el departamento"
							style={{ width: '300px' }}
							onSelect={ this.onDeptoSelected }
						>
							<Option value='61'>Matemática</Option>
							<Option value='62'>Física</Option>
							<Option value='63'>Química</Option>
							<Option value='66'>Electrónica</Option>
							<Option value='70'>Agrimensura</Option>
							<Option value='71'>Gestión</Option>
							<Option value='75'>Computación</Option>
						</Select>

					</div>
				</Col>
				<Col span={6}>
					<div style={{ margin: '25px' }}>
						<Button
							type='primary'
							icon='bar-chart'
							style={{ marginRight: '25px', marginTop: '25px' }}
							onClick={this.onUpdateChart }
						>
							Mostrar estadística
						</Button>

					</div>
				</Col>
			</Row>
			<Row type="flex" justify="end">
			</Row>
			
			<Row type="flex" justify="left">
				{/*<div className={this.state.popOverVisible ? 'content-show' : 'content-hidden'}>
					<Popover
						visible={this.state.popOverVisible}
						content='Seleccione año, cuatrimestre y departamento para visualizar el gráfico'
					>
						<Icon type="bar-chart" width='50em' height='50em' />
					</Popover>
				</div>
				<div className={!this.state.popOverVisible ? 'content-show' : 'content-hidden'}>*/}
					<AdminSurveyChartRender anio={this.state.anioToSend} cuatrimestre={this.state.cuatrimestreToSend} depto={this.state.deptoToSend}/>
				{/*</div>*/}

			</Row>
		</div>
		)
	}
}

export default AdminSurveyChart;