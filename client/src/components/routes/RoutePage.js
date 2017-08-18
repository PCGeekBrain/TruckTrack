import React, {Component} from 'react';

import { Modal } from 'react-bootstrap';

import DeliveryContainer from '../../containers/DeliveryContainer';

import '../../styles/routes/route.css';

class RoutePage extends Component{

  render () {
    const last_updated = new Date(this.props.updated_at).toDateString();
    const delivery_list = this.props.deliveries.map((delivery, index) => 
      <DeliveryContainer key={index} route_id={this.props.id} delivery={delivery}/>
    )

    return (
      <div id={`route-${this.props.id}`}>
        <h1>Route -> Log number {this.props.log_number}</h1>
        <ul>
          <li>Status: {this.props.status}</li>
          <li>Driver: {this.props.driver.username}</li>
          <li>Truck: {this.props.truck.name}</li>
          <li>Last Updated: {last_updated}</li>
        </ul>
        <h2>
          Deliveries:
          <button className="btn btn-primary" onClick={this.props.createDelivery}>Add Delivery</button>
        </h2>
        <div className="deliveries">
          {delivery_list}
        </div>
      </div>
    );
  }
}

export default RoutePage;