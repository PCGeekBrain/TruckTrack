import React from 'react';
// Components
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomeContainer from '../containers/HomeContainer';
import LoginContainer from '../containers/LoginContainer';
import DashboardContainer from '../containers/DashboardContainer';
import NotFound from './NotFound';
// Styles
import './App.css';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomeContainer} />
        <Route path="/login" component={LoginContainer} /> 
        <Route path="/dashboard" component={DashboardContainer} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
