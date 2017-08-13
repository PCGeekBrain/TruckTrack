import React, { Component } from 'react';
import { connect } from 'react-redux';
// components
import RoutePage from '../components/routes/RoutePage';

import { getDeliveries } from '../actions/delivery';
import { getRoutes } from '../actions/route';

class RouteContainer extends Component {
  componentWillMount(){
    this.props.getRoutes()
    this.props.getDeliveries(this.props.id)
  }
  render() {
    return (
      <div id="page-route">
        {this.props.route ? 
        <RoutePage {...this.props.route} deliveries={this.props.deliveries} /> :
        <h1>404: Route not found</h1>}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const id = parseInt(ownProps.match.params.id);
  return {
    match: ownProps.match,
    id: id,
    route: state.routes.find(route => route.id === id),
    deliveries: state.deliveries
  }
}

export default connect(mapStateToProps, {getDeliveries, getRoutes})(RouteContainer);