import React from 'react';
import { connect } from 'react-redux';
// Components
import { Route, Redirect } from 'react-router';
import DashNav from '../components/dashboard/DashNav';
// Styles
import '../styles/dashboard/index.css';


const DashboardContainer = (props) => {
  if(props.loggedIn){
    return (
      <div className="page-dashboard">
        <DashNav />
        <div className="dashboard">
          
        </div>
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

export default connect(mapStateToProps)(DashboardContainer)