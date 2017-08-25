import React, { Component } from 'react';
import { connect } from 'react-redux';
// components
import RoutePage from '../../components/routes/RoutePage';
import DeliveryModal from '../../components/deliveries/DeliveryModal';

import { getDeliveries, setShowModal, submitDelivery } from '../../actions/delivery';
import { getRoute } from '../../actions/route';

class RouteContainer extends Component {
  componentWillMount(){
    // get the route from the api
    this.props.getRoute(this.props.id);
    // get the deliveries from the api
    this.props.getDeliveries(this.props.id);
  }

  onUpdateDelivery = (route_id, delivery) => {
    this.props.submitDelivery(route_id, delivery);
    this.props.setShowModal(false);
  }

  hideModal = () => {
    this.props.setShowModal(false);
  }

  showModal = () => {
    this.props.setShowModal(true);
  }

  render() {
    return (
      <div id="page-route">
        {this.props.route ? 
        <RoutePage {...this.props.route} 
            deliveries={this.props.deliveries} 
            editDelivery={this.editDelivery}
            createDelivery={this.showModal} /> :
        <h1>Error: Route not found</h1>}
        {this.props.showModal &&
          <DeliveryModal delivery={this.props.delivery} id={this.props.id} 
            onSave={this.onUpdateDelivery}
            hide={this.hideModal} options={this.props.status_options} />
        }
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const id = parseInt(ownProps.match.params.id, 10); // cast the id to an int. makes life easy :-)
  return {
    id: id,
    route: state.routes.active,
    deliveries: state.deliveries.deliveries,
    showModal: state.deliveries.show_modal,
    delivery: state.deliveries.active_delivery,
  }
}

export default connect(mapStateToProps, {getDeliveries, getRoute, setShowModal, submitDelivery})(RouteContainer);