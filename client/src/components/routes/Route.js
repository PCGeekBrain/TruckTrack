import React from 'react';

import '../../styles/routes/route.css';

const Route = ({
  id, log_number, status, delivery_count, 
  updated_at, driver, truck
}) => {
  const last_updated = new Date(updated_at).toDateString();
  return (
    <div className="route-card card">
      <h2>Log number: {log_number} - {delivery_count} Deliveries</h2>
      <h4>Status: {status} - Last Updated: {last_updated}</h4>
      <p>Driver: {driver.username} - Truck: {truck.name}</p>
    </div>
  );
}

export default Route;