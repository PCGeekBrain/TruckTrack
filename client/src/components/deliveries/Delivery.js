import React from 'react';

import { Button, ButtonGroup } from 'react-bootstrap';

const Delivery = (props) => {
  const delivered_at = props.delivered_at ? "Delivered at: " + new Date(props.delivered_at).toLocaleString() : "Not Delivered Yet";
  return (
    <div id={`delivery-${props.id}`} className={props.delivered ? "delivered" : "undelivered"}>
      <h2>Invoice number: {props.invoice_number}</h2>
      <h3>COD: ${props.cod}</h3>
      <h3>{delivered_at}</h3>

      <h4>Tracking number: {props.tracking_number}</h4>
      {props.phone_number && <h4>Phone number: <a href={`tel:props.phone_number`}>{props.phone_number}</a></h4>}
      {props.address && <h4>Address: {props.address}</h4>}


      <ButtonGroup>
        {!props.delivered && <Button bsStyle="success" bsSize="lg" onClick={props.onDelivered}>Mark Delivered</Button>}
        <Button bsStyle="primary" bsSize="lg" onClick={props.onEdit}>Edit</Button>
        <Button bsStyle="danger" bsSize="lg" onClick={props.onDelete}>Delete</Button>
      </ButtonGroup>
    </div>
  )
}

export default Delivery;