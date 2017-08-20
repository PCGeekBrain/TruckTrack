import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { getRoutes } from '../actions/route';
// components
import Route from '../components/routes/Route';
import { Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

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
        <h1 id="title">All Routes</h1>
        <Button className="create-route-btn">
          Create Route <FontAwesome name="plus"/>
        </Button>
        <div id="routes-list">
          {routes}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    routes: state.routes.routes
  }
}

export default connect(mapStateToProps, {getRoutes})(TruckContainer);