import React from 'react';
import { connect } from 'react-redux';
// Components
import { Route, Redirect } from 'react-router';
import { Button, Glyphicon } from 'react-bootstrap';
import DashNav from '../components/dashboard/DashNav'

// actions
import { logOut } from '../actions/login'

const DashboardContainer = (props) => {
  if(props.loggedIn){
    return (
      <div className="dashboard">
        <DashNav />
        <Button onClick={props.logOut}>Log out <Glyphicon glyph="log-out" /></Button>
      </div>
    )
  } else {
    return <Redirect to="/login"/>
  }
}

function mapStateToProps(state, ownProps) {
  return {
    loggedIn: state.login.logged_in,
  }
}

export default connect(mapStateToProps, { logOut })(DashboardContainer)