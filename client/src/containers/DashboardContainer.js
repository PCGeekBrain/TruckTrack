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
import TrucksContainer from './TrucksContainer';

const TmpComponent = () => <h1>Coming Soon</h1>

const DashboardContainer = ({logged_in, match}) => {
  if(logged_in){
    return (
      <div className="page-dashboard">
        <DashNav logOut={logOut}/>
        <div className="dashboard container">
          <Switch>
            <Route path={match.url + "/trucks"} component={TrucksContainer}/>
            <Route path={match.url + "/routes"} component={TmpComponent}/>
            <Route path={match.url + "/drivers"} component={TmpComponent}/>
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