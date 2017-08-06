import React from 'react';

const Delivery = ({tracking_number, status}) => {
  return (
    <div className="delivery">
      <h3>{tracking_number}</h3>
      <p>{status}</p>
    </div>
  );
}