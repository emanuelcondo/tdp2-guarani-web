import React,{Component} from 'react';
import {Table} from 'antd';

const dataSource = [{
  key: '1',
  name: 'Periodo de finales',
  age: '19-07-2017',
  address: '24-07-2017'
}, {
  key: '2',
  name: 'Periodo inscripcion',
  age: '27-07-2017',
  address: '03-08-2017'
}];

const columns = [{
  title: 'Periodo',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Dia de arranque',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Dia de finalización',
  dataIndex: 'address',
  key: 'address',
}];


class PeriodTable extends Component {
  render(){
    return <Table dataSource={dataSource} columns={columns} />
  }
}


export default PeriodTable;