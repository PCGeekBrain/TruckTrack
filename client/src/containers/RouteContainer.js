import React, { Component } from 'react';
import { connect } from 'react-redux';
// components
import RoutePage from '../components/routes/RoutePage';
import DeliveryModal from '../components/deliveries/DeliveryModal';

import { getDeliveries } from '../actions/delivery';
import { getRoute } from '../actions/route';

class RouteContainer extends Component {
  componentWillMount(){
    // get the route from the api
    this.props.getRoute(this.props.id)
    // get the deliveries from the api
    this.props.getDeliveries(this.props.id)
    this.state = { showModal: false, delivery: undefined }
  }

  showModal = (delivery_id) => {
    const delivery = this.props.deliveries.filter(delivery => delivery.id === delivery_id)
    this.setState({
      showModal: true,
      delivery: delivery ? delivery : {}
    })
  }

  hideModal = () => {
    this.setState({showModal: false})
  }

  onCreateDelivery = (delivery) => {
    // todo, post delivery to server
    console.log("TODO: post update to server", delivery)
    this.hideModal()
    // get all updates to the list (even from others)
    this.props.getDeliveries(this.props.id)
  }

  render() {
    return (
      <div id="page-route">
        {this.props.route ? 
        <RoutePage {...this.props.route} 
            deliveries={this.props.deliveries} 
            editDelivery={this.editDelivery}
            createDelivery={this.showModal} onCreateDelivery={this.onCreateDelivery} /> :
        <h1>Error: Route not found</h1>}
        {this.state.showModal &&
          <DeliveryModal delivery={this.state.delivery} onSave={this.onCreateDelivery} onCancel={this.hideModal} />
        }
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const id = parseInt(ownProps.match.params.id, 10); // cast the id to an int. makes life easy :-)
  return {
    match: ownProps.match,
    id: id,
    route: state.routes.active_route,
    deliveries: state.deliveries.deliveries
  }
}

export default connect(mapStateToProps, {getDeliveries, getRoute})(RouteContainer);