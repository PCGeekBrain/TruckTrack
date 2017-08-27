import React from 'react';
import { connect } from 'react-redux';
// actions
import { logOut } from '../actions/login';
// Components
import { Route, Redirect, Switch } from 'react-router';
import DashNav from '../components/dashboard/DashNav';
// Styles
import '../styles/dashboard/index.css';

// SubContainers
import TrucksContainer from './dashboard/TrucksContainer';
import RoutesContainer from './dashboard/RoutesContainer';
import RouteContainer from './dashboard/RouteContainer';
import UserContainer from './dashboard/UserContainer';

const DashboardContainer = ({logged_in, logOut, match}) => {
  if(logged_in){
    return (
      <div className="page-dashboard">
        <DashNav logOut={logOut}/>
        <div className="dashboard container">
          <Switch>
            <Route exact path={match.url} component={RoutesContainer}/>
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
  }
}

export default connect(mapStateToProps, { logOut })(DashboardContainer)