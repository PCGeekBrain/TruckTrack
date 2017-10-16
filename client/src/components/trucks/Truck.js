import React from 'react';

import { Button, ButtonGroup } from 'react-bootstrap';

const Truck = ({truck, onEdit, onDelete}) => {
  const edit = (event) => {
    onEdit(event, truck);
  }

  const deleteItem = (event) => {
    onDelete(truck.id)
  }
  return (
    <div className="truck-card card">
      <h2 className="truck_name">{truck.name}</h2>
      <h3 className="truck_licence">Licence Plate: {truck.licence ? truck.licence : "N/A"}</h3>
      <ButtonGroup>
        <Button bsStyle="primary" onClick={edit}>Edit</Button>
        <Button bsStyle="danger" onClick={deleteItem}>Delete</Button>
      </ButtonGroup>
    </div>
  )
}

// default blank functions to avoid fatal errors
Truck.defaultProps = {
  onEdit: () => {},
  onDelete: () => {}
}

export default Truck;
