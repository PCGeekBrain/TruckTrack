import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { getRoutes, setShowModal, setActiveRoute } from '../actions/route';
// components
import Route from '../components/routes/Route';
import RouteModal from '../components/routes/RouteModal';
import { Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

class TruckContainer extends Component {
  componentWillMount(){
    this.props.getRoutes();
  }

  showModal = (route = {}) => {
    this.props.setActiveRoute(route);
    this.props.setShowModal(true);
  }

  render() {
    const routes = this.props.routes.map((route, index) => <NavLink key={index} to={`/dashboard/routes/${route.id}`}>
        <Route route={route} onEdit={this.showModal} />
      </NavLink>)
    return (
      <div className="page-routes">
        <h1 id="title">All Routes</h1>
        <Button className="create-route-btn" onClick={this.showModal} >
          Create Route <FontAwesome name="plus"/>
        </Button>
        <div id="routes-list">
          {routes}
        </div>
        {this.props.showRouteModal && <RouteModal />}
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    routes: state.routes.routes,
    showRouteModal: state.routes.showModal
  }
}

export default connect(mapStateToProps, { getRoutes, setShowModal, setActiveRoute })(TruckContainer);