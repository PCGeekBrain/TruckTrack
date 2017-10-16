import React from 'react';
import '../../styles/home/Delivery.css';

const Delivery = ({tracking_number, status}) => {
  return (
    <li className="delivery-li">
      <div className="delivery-card">
        <h3>Status: {status}</h3>
        <h4>Tracking Code: {tracking_number}</h4>
      </div>
    </li>
  );
}

export default Delivery;