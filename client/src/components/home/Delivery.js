import React from 'react';
import '../../styles/home/Delivery.css'

const Delivery = ({tracking_number, status}) => {
  return (
    <div className="delivery-card">
      <h3>{tracking_number}</h3>
      <p>{status}</p>
    </div>
  );
}

export default Delivery;