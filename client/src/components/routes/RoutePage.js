import React from 'react';

import '../../styles/routes/route.css';

const RoutePage = ({
  id, log_number, status, delivery_count, 
  updated_at, driver, truck, deliveries
}) => {
  const last_updated = new Date(updated_at).toDateString();
  const delivery_list = deliveries.map(delivery => <p>{delivery.invoice_number}</p>)
  return (
    <div id={`route-${id}`}>
      <h1>Route -> Log number {log_number}</h1>
      <ul>
        <li>Status: {status}</li>
        <li>Driver: {driver.username}</li>
        <li>Truck: {truck.name}</li>
        <li>Last Updated: {last_updated}</li>
      </ul>
      <h2>Deliveries:</h2>
      <div className="deliveries">
        {delivery_list}
      </div>
    </div>
  );
}

export default RoutePage;