import React from 'react';
// Components
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomeContainer from '../containers/HomeContainer';
import LoginContainer from '../containers/LoginContainer';
import DashboardContainer from '../containers/DashboardContainer';
// Styles
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={HomeContainer} />
        <Route path="/login" component={LoginContainer} /> 
        <Route path="/dashboard" component={DashboardContainer} />
      </div>
    </Router>
  );
}

export default App;
