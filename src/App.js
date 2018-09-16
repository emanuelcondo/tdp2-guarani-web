import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import AdminContainer from './tabs/admin/AdminContainer'
import TeacherContainer from './tabs/teacher/TeacherContainer';
import HomeContainer from './tabs/home/HomeContainer'

const App = () => (
  <Router>
    <Switch>
      <Route path="/" component={HomeContainer} />
      <Route path="/admin" component={AdminContainer} />
      <Route path="/teacher" component={TeacherContainer} />
    </Switch>
  </Router>
);

export default App;
