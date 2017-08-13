import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { getRoutes } from '../actions/route';
// components
import Route from '../components/routes/Route';

class TruckContainer extends Component {
  componentWillMount(){
    this.props.getRoutes();
  }
  render() {
    const routes = this.props.routes.map((route, index) => <NavLink key={index} to={`/dashboard/routes/${route.id}`}>
        <Route {...route} />
      </NavLink>)
    return (
      <div className="page-routes">
        <h1 id="title">Routes Page</h1>
        {routes}
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    routes: state.routes
  }
}

export default connect(mapStateToProps, {getRoutes})(TruckContainer);