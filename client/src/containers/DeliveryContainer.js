import React from 'react';
import { connect } from 'react-redux';

import Delivery from '../components/deliveries/Delivery';
import { markDelivered } from '../actions/delivery'

const DeliveryContainer = (props) => {

  const onDelivered = () => {
    props.markDelivered(props.route_id, props.delivery.id)
  }
  
  return (
    <div className="card card-delivery container-delivery">
      <Delivery {...props.delivery} onDelivered={onDelivered} />
    </div>
  )
}

export default connect(null, { markDelivered })(DeliveryContainer)