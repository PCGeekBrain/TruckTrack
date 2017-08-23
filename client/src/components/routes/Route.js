import React from 'react';

import { Button } from 'react-bootstrap';

import '../../styles/routes/route.css';

const Route = ({route, onEdit}) => {
  const last_updated = new Date(route.updated_at).toDateString();
  const edit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onEdit(route)
  }
  return (
    <div className="route-card card">
      <h2>Log number: {route.log_number} - {route.delivery_count} Deliveries</h2>
      <h4>Status: {route.status} - Last Updated: {last_updated}</h4>
      <p>
        Driver: {route.driver ? route.driver.username : "N/A"} -
        Truck: {route.truck ? route.truck.name : "N/A"}
      </p>
      <Button onClick={edit}>Edit</Button>
    </div>
  );
}

export default Route;