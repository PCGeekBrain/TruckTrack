import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router'

const DashboardContainer = (props) => {
  if(props.loggedIn){
    return (
      <h1>Dashboard coming soon</h1>
    )
  } else {
    <Redirect to="/login"/>
  }
}

function mapStateToProps(state, ownProps) {
  return {
    loggedIn: state.login.logged_in,
  }
}

export default connect(mapStateToProps)(DashboardContainer)