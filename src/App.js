import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import HomeContainer from '../src/tabs/home/HomeContainer'
import NotFound from '../src/common/NotFound'
import TeacherContainer from '../src/tabs/teacher/TeacherContainer'

class App extends Component {
  render() {
    return (
      <Router>
      <div>
        <Switch>
          <Route exact path="/" component={HomeContainer} />
          <Route exact path="/teacher" component={TeacherContainer} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
    );
  }
}

export default App;
