import React from 'react';

import DeliveryContainer from '../../containers/DeliveryContainer';

import '../../styles/routes/route.css';

const RoutePage = (props) => {

  const last_updated = new Date(props.updated_at).toDateString();
  const delivery_list = props.deliveries.map((delivery, index) => 
    <DeliveryContainer key={index} route_id={props.id} delivery={delivery}/>
  )

  return (
    <div id={`route-${props.id}`}>
      <h1>Route -> Log number {props.log_number}</h1>
      <ul>
        <li>Status: {props.status}</li>
        <li>Driver: {props.driver.username}</li>
        <li>Truck: {props.truck.name}</li>
        <li>Last Updated: {last_updated}</li>
      </ul>
      <h2>
        Deliveries:
        <button className="btn btn-primary" onClick={props.createDelivery}>Add Delivery</button>
      </h2>
      <div className="deliveries">
        {delivery_list}
      </div>
    </div>
  );
}

export default RoutePage;