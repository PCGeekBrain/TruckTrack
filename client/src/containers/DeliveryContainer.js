import React from 'react';
import { connect } from 'react-redux';

import Delivery from '../components/deliveries/Delivery';
import { markDelivered, setShowModal, setActiveDelivery } from '../actions/delivery'

const DeliveryContainer = (props) => {

  const onDelivered = () => {
    props.markDelivered(props.route_id, props.delivery.id)
  }

  const editDelivery = () => {
    props.setActiveDelivery(props.delivery);
    props.setShowModal(true);
  }

  return (
    <div className="card card-delivery container-delivery">
      <Delivery {...props.delivery} onDelivered={onDelivered} onEdit={editDelivery} />
    </div>
  )
}

export default connect(null, { markDelivered, setShowModal, setActiveDelivery })(DeliveryContainer)