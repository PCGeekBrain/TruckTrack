import React from 'react';

import DeliveryContainer from '../../containers/DeliveryContainer';

import { Button, Row, Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import '../../styles/routes/route.css';

const RoutePage = (props) => {

  const last_updated = new Date(props.updated_at).toLocaleString();
  const delivery_list = props.deliveries.map((delivery, index) => 
    <DeliveryContainer key={index} route_id={props.id} delivery={delivery}/>
  )

  return (
    <div id={`route-${props.id}`} className="page-routes">
      <h1 id="title">Route #{props.log_number}</h1>
      <Row>
        <Col md={3}>
          <div className="route-stat">{props.status}</div>
        </Col>
        <Col md={3}>
          <div className="route-stat">{props.driver ? props.driver.username : "N/A"}</div>
        </Col>
        <Col md={3}>
          <div className="route-stat">{props.truck ? props.truck.name : "N/A"}</div>
        </Col>
        <Col md={3}>
          <div className="route-stat">{last_updated}</div>
        </Col>
      </Row>
      <h2>Deliveries:
        <Button className="create-delivery-btn" onClick={props.createDelivery}>
          Create <FontAwesome name="plus"/>
        </Button>
      </h2>
      <div className="deliveries">
        {delivery_list}
      </div>
    </div>
  );
}

export default RoutePage;