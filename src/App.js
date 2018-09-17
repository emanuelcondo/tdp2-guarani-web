import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import AdminContainer from './tabs/admin/AdminContainer'
import TeacherContainer from './tabs/teacher/TeacherContainer';
import HomeContainer from './tabs/home/HomeContainer';
import NotFound from '../src/common/NotFound'
import AdminDepContainer from '../src/tabs/admin-dep/AdminDepContainer'

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={HomeContainer} />
      <Route path="/admin" component={AdminContainer} />
      <Route path="/teacher" component={TeacherContainer} />
      <Route path="/admin-dep" component={AdminDepContainer} />
      <Route component={NotFound}/>
    </Switch>
  </Router>
);

export default App;
