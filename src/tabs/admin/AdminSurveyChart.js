import React, { Component } from 'react';
import { Button, Icon, Row, Col, Popover, Radio, Select } from 'antd';
import SurveyGraph from './SurveyGraph';

const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class AdminSurveyChart extends Component {
	state = {
		popOverVisible: true,
		anioSelected: null,
		cuatrimestreSelected: null,
		deptoSelected: null
	}
	
	onAnioSelected = (a) => {
		console.log('Año selected: ', a);
		this.setState({
			anioSelected: a
		});
	}
	
	onCuatrimestreChange = (e) => {
		console.log('Cuatrimestre checked: ', e.target.value);
		this.setState({
			cuatrimestreSelected: e.target.value
		});
	}
	
	onDeptoSelected = (d) => {
		console.log('Depto selected: ', d);
		this.setState({
			deptoSelected: d
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
							onClick={() => { this.setState({ newPeriodModalVisible: true }) }}
						>
							Mostrar estadística
						</Button>

					</div>
				</Col>
			</Row>
			<Row type="flex" justify="end">
			</Row>
			
			<Row type="flex" justify="left">
				<div className={this.state.popOverVisible ? 'content-show' : 'content-hidden'}>
					<Popover
						visible={this.state.popOverVisible}
						content='Seleccione año, cuatrimestre y departamento para visualizar el gráfico'
					>
						<Icon type="bar-chart" width='50em' height='50em' />
					</Popover>
				</div>
				<div className={!this.state.popOverVisible ? 'content-show' : 'content-hidden'}>
					<SurveyGraph anio={this.state.anioSelected} cuatrimestre={this.state.cuatrimestreSelected} depto={this.state.deptoSelected}/>
				</div>

			</Row>
		</div>
		)
	}
}

export default AdminSurveyChart;