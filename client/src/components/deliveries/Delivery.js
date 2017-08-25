import React from 'react';

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

      {!props.delivered && <button className="btn-delivery btn btn-success btn-lg" onClick={props.onDelivered}>Mark Delivered</button>}
      <button className="btn-delivery btn btn-primary btn-lg" onClick={props.onEdit}>Edit</button>
      <button className="btn-delivery btn btn-danger btn-lg" onClick={props.onDelete}>Delete</button>
    </div>
  )
}

export default Delivery;