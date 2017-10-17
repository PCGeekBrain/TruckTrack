import React from 'react';
import '../../styles/home/Delivery.css';

const Delivery = ({tracking_number, status, route_number}) => {
  return (
    <li className="delivery-li">
      <div className="delivery-card">
        <h3>Status: {status}</h3>
        <h4>Tracking: {tracking_number}</h4>
        {route_number && <h4>Route #{route_number}</h4>}
      </div>
    </li>
  );
}

export default Delivery;