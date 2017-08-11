import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getRoutes } from '../actions/route'
// components
import Route from '../components/routes/Route';

class TruckContainer extends Component {
  componentWillMount(){
    this.props.getRoutes();
  }
  render() {
    const routes = this.props.routes.map(route => <Route {...route} />)
    return (
      <div class="page-routes">
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