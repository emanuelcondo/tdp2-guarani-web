import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import AdminContainer from './tabs/admin/AdminContainer'
import TeacherContainer from './tabs/teacher/TeacherContainer';
import NotFound from '../src/common/NotFound'
import AdminDepContainer from '../src/tabs/admin-dep/AdminDepContainer'
import LoginContainer from './tabs/login/LoginContainer'
import server from './Server'



class App extends Component {
  state = {
    childrens: {
      docente: <TeacherContainer update={this.update} />,
      admin: <AdminContainer update={this.update} />,
      departamento: <AdminDepContainer update={this.update} />
    }
  }




  update = () => {
    this.forceUpdate();
  }

  getContainer = (rol) => {
    if (rol === 'docente') {
      return <TeacherContainer update={this.update} />
    } else if (rol === 'departamento') {
      return <AdminDepContainer update={this.update} />
    } return <AdminContainer update={this.update} />
  }



  render() {
    return <Router basename="siu-guarani-web">
      <Switch>
        <Route path="/login" component={LoginContainer} />
        <Route path="/" render={
          () => {
            if (localStorage.getItem('rol') === null) {
              console.log('App - redirect to login');
              return <Redirect to="/login" />
            }
            console.log('App - Set axios header');
            server.defaults.headers.common['token'] = localStorage.getItem('token')
            console.log('App - Redirect to to teacher');
            return this.getContainer(localStorage.getItem('rol'))
          }
        } />
        <Route path="/admin" component={AdminContainer} />
        <Route path="/teacher" component={TeacherContainer} />
        <Route path="/admin-dep" component={AdminDepContainer} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  }
}

export default App;
