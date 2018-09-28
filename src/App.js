import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route,Switch,Redirect } from "react-router-dom";
import AdminContainer from './tabs/admin/AdminContainer'
import TeacherContainer from './tabs/teacher/TeacherContainer';
import NotFound from '../src/common/NotFound'
import AdminDepContainer from '../src/tabs/admin-dep/AdminDepContainer'
import LoginContainer from './tabs/login/LoginContainer'

const App = () => (
  <Router basename="siu-guarani-web">
    <Switch>
      <Route path="/login" component={LoginContainer}/>
      <Route path="/" render={() => <Redirect to="/login" />}/>
      <Route path="/admin" component={AdminContainer} />
      <Route path="/teacher" component={TeacherContainer} />
      <Route path="/admin-dep" component={AdminDepContainer} />
      <Route component={NotFound}/>
    </Switch>  
  </Router>
);

export default App;
