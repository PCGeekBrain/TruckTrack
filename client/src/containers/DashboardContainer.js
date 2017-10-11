import React from 'react';
import { connect } from 'react-redux';
// actions
import { logOut } from '../actions/login';
import { clearError } from '../actions/error';
// Components
import { Route, Redirect, Switch } from 'react-router';
import DashNav from '../components/dashboard/DashNav';
import Error from '../components/dashboard/Error';
// Styles
import '../styles/dashboard/index.css';

// SubContainers
import HomeContainer from './HomeContainer';
import TrucksContainer from './dashboard/TrucksContainer';
import RoutesContainer from './dashboard/RoutesContainer';
import RouteContainer from './dashboard/RouteContainer';
import UserContainer from './dashboard/UserContainer';

const DashboardContainer = ({logged_in, logOut, match, clearError, errors}) => {
  if(logged_in){
    const errors_alerts = errors.map((error, index) => <Error key={index} error={error} onDismiss={clearError}/>)
    return (
      <div className="page-dashboard">
        <DashNav logOut={logOut}/>
        <div className="dashboard container">
          {errors_alerts}
          <Switch>
            <Route exact path={match.url} component={RoutesContainer}/>
            <Route path={match.url + "/track"} component={HomeContainer}/>
            <Route path={match.url + "/trucks"} component={TrucksContainer}/>
            <Route exact path={match.url + "/routes"} component={RoutesContainer}/>
            <Route path={match.url + "/routes/:id"} component={RouteContainer}/>
            <Route path={match.url + "/users"} component={UserContainer}/>
          </Switch>
        </div>
      </div>
    )
  } else {
    return <Redirect to="/login"/>
  }
}

function mapStateToProps(state, ownProps) {
  return {
    logged_in: state.login.logged_in,
    errors: state.errors
  }
}

export default connect(mapStateToProps, { logOut, clearError })(DashboardContainer)